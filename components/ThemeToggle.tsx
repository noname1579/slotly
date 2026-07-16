// components/ThemeToggle.tsx
'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  // Не рендерим на сервере
  if (!mounted) {
    return (
      <button className="theme-toggle" aria-label="Переключить тему">
        <div className="toggle-icons">
          <Sun className="sun-icon w-3.5 h-3.5" />
          <Moon className="moon-icon w-3.5 h-3.5" />
        </div>
        <div className="toggle-thumb" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Переключить тему"
    >
      <div className="toggle-icons">
        <Sun className="sun-icon w-3.5 h-3.5" />
        <Moon className="moon-icon w-3.5 h-3.5" />
      </div>
      <div className="toggle-thumb" />
    </button>
  );
}