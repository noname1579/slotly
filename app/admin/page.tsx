// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Calendar, Clock, CheckCircle, XCircle, TrendingUp, Users, Scissors } from 'lucide-react';

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  revenue: number;
  masters: number;
  services: number;
  masterLoad: { name: string; bookings: number }[];
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  const cards = [
    { label: 'Всего записей', value: stats?.total || 0, icon: Calendar, color: 'bg-purple-100 text-purple-600' },
    { label: 'Ожидают', value: stats?.pending || 0, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Подтверждено', value: stats?.confirmed || 0, icon: CheckCircle, color: 'bg-blue-100 text-blue-600' },
    { label: 'Выполнено', value: stats?.completed || 0, icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { label: 'Отменено', value: stats?.cancelled || 0, icon: XCircle, color: 'bg-red-100 text-red-600' },
    { label: 'Выручка', value: `${stats?.revenue?.toLocaleString() || 0} ₽`, icon: TrendingUp, color: 'bg-green-100 text-green-600' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">📊 Панель управления</h1>
        <button onClick={loadStats} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
          Обновить
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Активность мастеров</h3>
        <div className="space-y-3">
          {stats?.masterLoad?.map((m) => (
            <div key={m.name} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 w-32">{m.name}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" 
                  style={{ width: `${Math.min(m.bookings * 10, 100)}%` }} 
                />
              </div>
              <span className="text-sm text-gray-500 w-12 text-right">{m.bookings} зап.</span>
            </div>
          ))}
          {(!stats?.masterLoad || stats.masterLoad.length === 0) && (
            <p className="text-gray-400 text-sm">Нет данных о загруженности мастеров</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Мастеров</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.masters || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Scissors className="w-8 h-8 text-pink-500" />
            <div>
              <p className="text-sm text-gray-500">Услуг</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.services || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}