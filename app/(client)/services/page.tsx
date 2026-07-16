// app/(client)/services/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Scissors, 
  Paintbrush, 
  Hand, 
  Flower2,
  Sparkles,
  ArrowRight,
  Clock,
  Coins
} from 'lucide-react';

const servicesData = [
  {
    id: 'hair',
    category: 'Стрижки и укладки',
    icon: Scissors,
    color: 'purple',
    items: [
      { name: 'Женская стрижка', duration: 60, price: 2500, popular: true },
      { name: 'Мужская стрижка', duration: 45, price: 1800 },
      { name: 'Детская стрижка', duration: 30, price: 1200 },
      { name: 'Укладка (фен)', duration: 40, price: 1500 },
      { name: 'Укладка (плойка/утюжок)', duration: 50, price: 1800 },
      { name: 'Вечерняя прическа', duration: 90, price: 3500 },
    ]
  },
  {
    id: 'color',
    category: 'Окрашивание',
    icon: Paintbrush,
    color: 'pink',
    items: [
      { name: 'Окрашивание (корни)', duration: 60, price: 3000 },
      { name: 'Полное окрашивание', duration: 120, price: 4500, popular: true },
      { name: 'Мелирование', duration: 90, price: 4000 },
      { name: 'Тонирование', duration: 45, price: 2500 },
      { name: 'Балаяж', duration: 120, price: 5000 },
      { name: 'Смывка пигмента', duration: 60, price: 3500 },
    ]
  },
  {
    id: 'nails',
    category: 'Маникюр и педикюр',
    icon: Hand,
    color: 'rose',
    items: [
      { name: 'Маникюр (классический)', duration: 90, price: 2000 },
      { name: 'Маникюр (аппаратный)', duration: 75, price: 2200, popular: true },
      { name: 'Маникюр+покрытие гель-лак', duration: 105, price: 2800 },
      { name: 'Педикюр (классический)', duration: 75, price: 2500 },
      { name: 'Педикюр (аппаратный)', duration: 60, price: 2700 },
      { name: 'SPA-уход за руками', duration: 60, price: 1800 },
    ]
  },
  {
    id: 'face',
    category: 'Косметология',
    icon: Flower2,
    color: 'violet',
    items: [
      { name: 'Чистка лица (ультразвук)', duration: 60, price: 3000 },
      { name: 'Чистка лица (механическая)', duration: 90, price: 3500, popular: true },
      { name: 'Биоревитализация', duration: 45, price: 8000 },
      { name: 'Контурная пластика', duration: 60, price: 12000 },
      { name: 'Мезотерапия', duration: 50, price: 6000 },
      { name: 'Пилинг (срединный)', duration: 40, price: 4500 },
    ]
  },
];

const colorMap = {
  purple: 'from-purple-500 to-purple-400',
  pink: 'from-pink-500 to-pink-400',
  rose: 'from-rose-500 to-rose-400',
  violet: 'from-violet-500 to-violet-400',
};

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...servicesData.map(s => s.id)];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши <span className="gradient-text">услуги и цены</span>
          </h1>
          <p className="text-gray-500">
            Профессиональный уход от лучших мастеров города
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const label = cat === 'all' ? 'Все услуги' : servicesData.find(s => s.id === cat)?.category || cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-6 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${selectedCategory === cat 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }
                `}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="space-y-12">
          {servicesData
            .filter(s => selectedCategory === 'all' || s.id === selectedCategory)
            .map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className={`bg-gradient-to-r ${colorMap[category.color as keyof typeof colorMap]} px-6 py-4 flex items-center gap-3`}>
                    <Icon className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-bold text-white">{category.category}</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Услуга</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Время
                          </th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">
                            <Coins className="w-4 h-4 inline mr-1" />
                            Цена
                          </th>
                          <th className="px-6 py-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.items.map((item, index) => (
                          <tr key={index} className="border-b border-gray-50 hover:bg-purple-50/30 transition-colors">
                            <td className="px-6 py-4">
                              <span className="font-medium text-gray-900">{item.name}</span>
                              {item.popular && (
                                <span className="ml-2 inline-block px-2 py-0.5 text-[10px] font-semibold text-purple-600 bg-purple-100 rounded-full uppercase">
                                  Популярно
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-gray-600">{item.duration} мин</td>
                            <td className="px-6 py-4 font-semibold text-purple-600">{item.price.toLocaleString('ru-RU')} ₽</td>
                            <td className="px-6 py-4">
                              <Link
                                href={`/booking?service=${encodeURIComponent(item.name)}`}
                                className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                              >
                                Записаться
                                <ArrowRight className="w-4 h-4" />
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

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-purple-200 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Записаться онлайн
          </Link>
        </div>
      </div>
    </div>
  );
}