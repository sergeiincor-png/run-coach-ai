
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "ИИ-Тренер | Твой путь к финишу",
  description: "Персональный ИИ-ассистент для подготовки к забегам и марафонам",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={clsx(
        inter.className,
        "bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col"
      )}>
        <header className="bg-white/80 backdrop-blur-md border-b px-4 py-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏃‍♂️</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                ИИ-Тренер
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="/dashboard" className="hover:text-indigo-600 transition-colors">Дашборд</a>
              <a href="/plans" className="hover:text-indigo-600 transition-colors">Планы</a>
              <a href="/community" className="hover:text-indigo-600 transition-colors">Сообщество</a>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="border-t py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold mb-4 text-slate-800 text-lg">ИИ-Тренер</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Мы объединяем экспертизу профессиональных бегунов и мощь искусственного интеллекта для достижения ваших спортивных целей.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-slate-800">Полезные ссылки</h4>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li><a href="#" className="hover:text-indigo-600">База знаний</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Калькулятор темпа</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Поддержка</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-slate-800">Контакты</h4>
                <p className="text-sm text-slate-500">
                  Присоединяйтесь к нашему сообществу в Telegram для обмена опытом.
                </p>
              </div>
            </div>
            <div className="pt-8 border-t text-center text-slate-400 text-xs">
              © {new Date().getFullYear()} ИИ-Тренер для забегов. Сделано инженерами для атлетов.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
