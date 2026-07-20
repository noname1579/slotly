// components/Loader.tsx
'use client';

import { Sparkles } from 'lucide-react';

export function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-colors">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-purple-100 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-spin-slow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="text-sm text-gray-400 font-medium">Загрузка...</p>
      </div>
    </div>
  );
}