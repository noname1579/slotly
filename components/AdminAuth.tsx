// components/AdminAuth.tsx
'use client';

import { useState, useEffect } from 'react';
import { Lock, Sparkles, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface AdminAuthProps {
  children: React.ReactNode;
}

export function AdminAuth({ children }: AdminAuthProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Проверяем сессию только на клиенте
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('adminAuth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (password === 'admin123') {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
        toast.success('✅ Добро пожаловать в админ-панель!');
      } else {
        toast.error('❌ Неверный пароль');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  // Пока не смонтировался — ничего не рендерим
  if (!isMounted) {
    return null;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-purple-100/50 shadow-2xl shadow-purple-200/20 p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-200/50">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Вход в админ-панель</h2>
          <p className="text-sm text-gray-500 mt-1">Введите пароль для доступа</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full px-5 py-3.5 pr-12 rounded-xl border-2 border-purple-100/50 bg-white/50 focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all outline-none"
              autoFocus
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Вход...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Войти
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}