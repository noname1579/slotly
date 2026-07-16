// components/ThemeToggle.tsx
'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Проверяем сохранённую тему
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Не рендерим на сервере (избегаем гидратации)
  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <span className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-7 rounded-full transition-all duration-300 flex items-center flex-shrink-0"
      style={{
        background: theme === 'dark' ? '#7C3AED' : '#E5E7EB',
      }}
      aria-label="Переключить тему"
    >
      {/* Иконки */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 z-10">
        <Sun className="w-3.5 h-3.5 text-white/70" />
        <Moon className="w-3.5 h-3.5 text-white/70" />
      </div>
      
      {/* Круглый ползунок */}
      <div
        className="w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 z-20"
        style={{
          transform: theme === 'dark' ? 'translateX(20px)' : 'translateX(2px)',
        }}
      />
    </button>
  );
}