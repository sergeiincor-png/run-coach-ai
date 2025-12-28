
'use client';

import React, { useEffect, useState } from 'react';
import { getMe, logout } from '@/lib/api';
import { LogOut, User as UserIcon, Activity, Trophy, Calendar } from 'lucide-react';

interface User {
  id: string;
  first_name: string;
  username?: string;
  photo_url?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getMe();
      if (data) {
        setUser(data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl mb-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {user.photo_url ? (
            <img src={user.photo_url} alt={user.first_name} className="w-24 h-24 rounded-full border-4 border-white/20" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
              <UserIcon size={40} />
            </div>
          )}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold">Привет, {user.first_name}! 👋</h1>
            <p className="opacity-80">Добро пожаловать в ИИ-тренер подготовки к забегам</p>
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span>Выйти</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
            <Activity />
          </div>
          <h3 className="font-bold text-lg">Тренировки</h3>
          <p className="text-slate-500 text-sm mb-4">Ваш план на сегодня еще не составлен.</p>
          <button className="text-indigo-600 font-semibold text-sm hover:underline">Создать план →</button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center text-amber-600 mb-4">
            <Trophy />
          </div>
          <h3 className="font-bold text-lg">Достижения</h3>
          <p className="text-slate-500 text-sm mb-4">У вас пока нет активных наград.</p>
          <button className="text-amber-600 font-semibold text-sm hover:underline">Просмотреть все →</button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
            <Calendar />
          </div>
          <h3 className="font-bold text-lg">Календарь</h3>
          <p className="text-slate-500 text-sm mb-4">Следующий забег: не запланирован.</p>
          <button className="text-emerald-600 font-semibold text-sm hover:underline">Добавить цель →</button>
        </div>
      </div>
    </div>
  );
}
