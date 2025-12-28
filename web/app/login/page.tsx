
'use client';

import React, { useState } from 'react';
import TelegramLoginButton from '@/components/TelegramLoginButton';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const botName = process.env.NEXT_PUBLIC_BOT_USERNAME || 'MyRunTrainerBot';

  const handleTelegramAuth = async (user: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        setError(data.detail || 'Ошибка авторизации. Попробуйте еще раз.');
      }
    } catch (err) {
      setError('Произошла ошибка при соединении с сервером.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="text-4xl mb-4">🏆</div>
        <h2 className="text-2xl font-bold mb-2">Вход в систему</h2>
        <p className="text-slate-500 mb-8">
          Авторизуйтесь через Telegram, чтобы начать подготовку к вашему лучшему забегу.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          {loading ? (
            <div className="animate-pulse text-indigo-600 font-medium">Загрузка...</div>
          ) : (
            <TelegramLoginButton botName={botName} onAuth={handleTelegramAuth} />
          )}
        </div>

        <p className="text-xs text-slate-400 mt-10">
          Нажимая кнопку, вы соглашаетесь с правилами использования сервиса.
        </p>
      </div>
    </div>
  );
}
