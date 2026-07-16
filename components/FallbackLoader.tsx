// components/FallbackLoader.tsx
'use client';

import { Sparkles } from 'lucide-react';

export function FallbackLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse" />
          <div className="absolute inset-1 rounded-xl bg-white/90 dark:bg-gray-900/90 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-purple-500 animate-spin-slow" />
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Загрузка...</p>
      </div>
    </div>
  );
}