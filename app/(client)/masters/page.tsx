// app/(client)/masters/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Master {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: number;
  photo?: string;
}

export default function MastersPage() {
  const [masters, setMasters] = useState<Master[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMasters();
  }, []);

  const loadMasters = async () => {
    try {
      const res = await fetch('/api/admin/masters');
      const data = await res.json();
      setMasters(data);
    } catch (error) {
      toast.error('Ошибка загрузки мастеров');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Загрузка мастеров...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши <span className="gradient-text">мастера</span>
          </h1>
          <p className="text-gray-500">Команда профессионалов с опытом от 5 лет</p>
        </div>

        {masters.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Мастера не найдены</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {masters.map((master) => (
              <div key={master.id} className="bg-white rounded-3xl border border-gray-100 p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 mx-auto mb-4 flex items-center justify-center text-6xl">
                  {master.photo ? (
                    <img src={master.photo} alt={master.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    '👩'
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{master.name}</h3>
                <p className="text-sm text-purple-600 font-medium">{master.specialty}</p>
                <div className="flex items-center justify-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{master.rating || 0}</span>
                  </div>
                  <div className="text-gray-400">•</div>
                  <div className="text-gray-600">{master.experience || 0} лет</div>
                </div>
                <Link
                  href={`/booking?master=${encodeURIComponent(master.id)}`}
                  className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium text-sm rounded-xl hover:shadow-lg transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Записаться
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}