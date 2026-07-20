// app/not-found.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, Search, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="max-w-lg w-full text-center">
        {/* Иконка */}
        <div className="relative w-32 h-32 md:w-38 md:h-38 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
            <span className="text-5xl md:text-6xl font-bold gradient-text">404</span>
          </div>
        </div>

        {/* Заголовок */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Страница не найдена
        </h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Извините, страница, которую вы ищете, не существует или была перемещена.
        </p>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-200/50 transition-all hover:scale-[1.02]"
          >
            <Home className="w-4 h-4" />
            На главную
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-purple-300 hover:bg-purple-50/50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться назад
          </button>
        </div>

        {/* Поиск */}
        <div className="mt-8 pt-8 border-t border-gray-200/50">
          <p className="text-sm text-gray-400 mb-3">Или перейдите на главную страницу</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors font-medium"
          >
            <Sparkles className="w-4 h-4" />
            SLOTLY — Салон красоты
          </Link>
        </div>
      </div>
    </div>
  );
}