// app/(client)/services/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Scissors,
  Paintbrush,
  Hand,
  Flower2,
  Waves,
  Gem,
  Feather,
  Sparkles,
  ArrowRight,
  Clock,
  Coins
} from 'lucide-react';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: string;
  popular: boolean;
  description?: string;
}

// МЯГКИЕ ПАСТЕЛЬНЫЕ ЦВЕТА
const categoryColors: Record<string, { 
  header: string; 
  icon: string; 
  light: string;
  badge: string;
  border: string;
  hover: string;
}> = {
  'Стрижки': {
    header: 'bg-gradient-to-r from-purple-400/90 to-purple-500/90',
    icon: 'text-purple-500',
    light: 'bg-purple-50/60',
    badge: 'bg-purple-100 text-purple-600',
    border: 'border-purple-200/50',
    hover: 'hover:bg-purple-50/40'
  },
  'Окрашивание': {
    header: 'bg-gradient-to-r from-pink-400/90 to-rose-400/90',
    icon: 'text-pink-500',
    light: 'bg-pink-50/60',
    badge: 'bg-pink-100 text-pink-600',
    border: 'border-pink-200/50',
    hover: 'hover:bg-pink-50/40'
  },
  'Маникюр': {
    header: 'bg-gradient-to-r from-teal-400/90 to-emerald-400/90',
    icon: 'text-teal-500',
    light: 'bg-teal-50/60',
    badge: 'bg-teal-100 text-teal-600',
    border: 'border-teal-200/50',
    hover: 'hover:bg-teal-50/40'
  },
  'Педикюр': {
    header: 'bg-gradient-to-r from-cyan-400/90 to-blue-400/90',
    icon: 'text-cyan-500',
    light: 'bg-cyan-50/60',
    badge: 'bg-cyan-100 text-cyan-600',
    border: 'border-cyan-200/50',
    hover: 'hover:bg-cyan-50/40'
  },
  'Косметология': {
    header: 'bg-gradient-to-r from-violet-400/90 to-indigo-400/90',
    icon: 'text-violet-500',
    light: 'bg-violet-50/60',
    badge: 'bg-violet-100 text-violet-600',
    border: 'border-violet-200/50',
    hover: 'hover:bg-violet-50/40'
  },
  'Массаж': {
    header: 'bg-gradient-to-r from-amber-400/90 to-orange-400/90',
    icon: 'text-amber-500',
    light: 'bg-amber-50/60',
    badge: 'bg-amber-100 text-amber-600',
    border: 'border-amber-200/50',
    hover: 'hover:bg-amber-50/40'
  },
  'Брови': {
    header: 'bg-gradient-to-r from-amber-500/90 to-yellow-500/90',
    icon: 'text-amber-600',
    light: 'bg-amber-50/60',
    badge: 'bg-amber-100 text-amber-600',
    border: 'border-amber-200/50',
    hover: 'hover:bg-amber-50/40'
  },
  'Спецпредложения': {
    header: 'bg-gradient-to-r from-rose-400/90 to-red-400/90',
    icon: 'text-rose-500',
    light: 'bg-rose-50/60',
    badge: 'bg-rose-100 text-rose-600',
    border: 'border-rose-200/50',
    hover: 'hover:bg-rose-50/40'
  },
};

// ИКОНКИ ДЛЯ КАТЕГОРИЙ
const categoryIcons: Record<string, any> = {
  'Стрижки': Scissors,
  'Окрашивание': Paintbrush,
  'Маникюр': Hand,
  'Педикюр': Waves,
  'Косметология': Flower2,
  'Массаж': Gem,
  'Брови': Feather,
  'Спецпредложения': Sparkles,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(data);
    } catch (error) {
      toast.error('Ошибка загрузки услуг');
    }
    setLoading(false);
  };

  const categories = ['all', ...new Set(services.map(s => s.category).filter(Boolean))];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const groupedServices = filteredServices.reduce((acc, service) => {
    const key = service.category || 'Другое';
    if (!acc[key]) acc[key] = [];
    acc[key].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Загрузка услуг...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши <span className="gradient-text">услуги и цены</span>
          </h1>
          <p className="text-gray-500">
            Профессиональный уход от лучших мастеров города
          </p>
        </div>

        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => {
              const label = cat === 'all' ? 'Все услуги' : cat;
              const colors = categoryColors[cat];
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-5 py-2 rounded-xl text-sm font-medium transition-all border
                    ${isActive 
                      ? `${colors?.header || 'bg-purple-500'} text-white border-transparent shadow-md` 
                      : 'bg-white/80 text-gray-600 hover:bg-gray-50 border-gray-200/60'
                    }
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {Object.keys(groupedServices).length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Услуги не найдены</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedServices).map(([category, items]) => {
              const colors = categoryColors[category] || categoryColors['Стрижки'];
              const Icon = categoryIcons[category] || Scissors;

              return (
                <div key={category} className={`bg-white/80 backdrop-blur-sm rounded-2xl border ${colors.border} shadow-sm overflow-hidden`}>
                  <div className={`${colors.header} px-6 py-3.5 flex items-center gap-3`}>
                    <Icon className="w-5 h-5 text-white/90" />
                    <h2 className="text-lg font-semibold text-white">{category}</h2>
                    <span className="ml-auto text-white/70 text-xs bg-white/20 px-2.5 py-0.5 rounded-full">
                      {items.length}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100/60">
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Услуга</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            <Clock className="w-3.5 h-3.5 inline mr-1" />
                            Время
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            <Coins className="w-3.5 h-3.5 inline mr-1" />
                            Цена
                          </th>
                          <th className="px-6 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id} className={`border-b border-gray-50/60 ${colors.hover} transition-colors`}>
                            <td className="px-6 py-3.5">
                              <span className="font-medium text-gray-800">{item.name}</span>
                              {item.popular && (
                                <span className={`ml-2 inline-block px-2 py-0.5 text-[9px] font-semibold ${colors.badge} rounded-full uppercase tracking-wider`}>
                                  Популярно
                                </span>
                              )}
                              {item.description && (
                                <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                              )}
                            </td>
                            <td className="px-6 py-3.5 text-sm text-gray-500">{item.duration} мин</td>
                            <td className="px-6 py-3.5 font-semibold text-gray-800">{item.price.toLocaleString('ru-RU')} ₽</td>
                            <td className="px-6 py-3.5">
                              <Link
                                href={`/booking?service=${encodeURIComponent(item.id)}`}
                                className={`inline-flex items-center gap-1 text-sm font-medium ${colors.icon} hover:opacity-70 transition-opacity`}
                              >
                                Записаться
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-200/50 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4" />
            Записаться онлайн
          </Link>
        </div>
      </div>
    </div>
  );
}