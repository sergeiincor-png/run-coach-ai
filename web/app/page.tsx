
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TelegramLoginButton from '@/components/TelegramLoginButton';
import { Rocket, ShieldCheck, Zap, ChevronRight, BarChart3, Target } from 'lucide-react';

export default function HomePage() {
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
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6">
                <Zap size={16} />
                <span>Будущее беговых тренировок уже здесь</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                ИИ-Тренер для подготовки к <span className="text-indigo-600">забегам</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                Персональные планы тренировок, генерируемые искусственным интеллектом на основе ваших данных, целей и физического состояния.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <div className="p-1 bg-slate-100 rounded-xl">
                  {loading ? (
                    <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow-sm border text-indigo-600 font-medium">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-indigo-600"></div>
                      Авторизация...
                    </div>
                  ) : (
                    <TelegramLoginButton botName={botName} onAuth={handleTelegramAuth} />
                  )}
                </div>
                {error && (
                  <p className="text-red-500 text-sm font-medium animate-pulse">{error}</p>
                )}
              </div>
              
              <p className="mt-4 text-slate-400 text-sm flex items-center justify-center lg:justify-start gap-2">
                <ShieldCheck size={14} />
                Безопасный вход через официальный виджет Telegram
              </p>
            </div>
            
            <div className="flex-1 relative">
              <div className="w-full aspect-square max-w-[500px] mx-auto bg-gradient-to-tr from-indigo-100 to-violet-50 rounded-[40px] flex items-center justify-center relative overflow-hidden border shadow-2xl">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
                <div className="text-[120px] relative z-10 animate-bounce-slow">🏃‍♂️</div>
                {/* Float Elements */}
                <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-lg border animate-float">
                  <BarChart3 className="text-indigo-600 mb-1" />
                  <div className="text-xs font-bold text-slate-400 uppercase">Темп</div>
                  <div className="text-lg font-bold">4:45 мин/км</div>
                </div>
                <div className="absolute bottom-10 left-10 bg-white p-4 rounded-2xl shadow-lg border animate-float-delayed">
                  <Target className="text-emerald-500 mb-1" />
                  <div className="text-xs font-bold text-slate-400 uppercase">Цель</div>
                  <div className="text-lg font-bold">Марафон 42к</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Почему выбирают нашего ИИ-тренера?</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Мы объединили спортивную науку и передовые технологии, чтобы сделать профессиональную подготовку доступной каждому.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Rocket className="text-indigo-600" />,
              title: "Адаптивные планы",
              desc: "План подстраивается под ваш прогресс и самочувствие в реальном времени."
            },
            {
              icon: <BarChart3 className="text-indigo-600" />,
              title: "Глубокая аналитика",
              desc: "Анализируем каждый километр, чтобы найти ваши точки роста и предотвратить травмы."
            },
            {
              icon: <Zap className="text-indigo-600" />,
              title: "Мгновенная связь",
              desc: "Задавайте вопросы своему тренеру в Telegram 24/7 и получайте советы по питанию и экипировке."
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-slate-900 rounded-[40px] p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrophyIcon size={200} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Готовы пробежать свой лучший забег?</h2>
          <p className="text-slate-400 mb-10 text-lg relative z-10 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам атлетов, которые уже доверили свою подготовку нашему искусственному интеллекту.
          </p>
          <div className="inline-block p-1 bg-white/10 rounded-xl relative z-10 backdrop-blur-sm">
            <TelegramLoginButton botName={botName} onAuth={handleTelegramAuth} />
          </div>
        </div>
      </section>
    </div>
  );
}

function TrophyIcon({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
