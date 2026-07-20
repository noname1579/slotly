// app/(client)/page.tsx
'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { 
  Sparkles, 
  Scissors, 
  Paintbrush, 
  Hand, 
  Flower2, 
  ArrowRight, 
  Star, 
  Users, 
  Award,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function HomePage() {
  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success('Добро пожаловать в SLOTLY! 🎉', {
      description: 'Запишитесь на первую процедуру со скидкой 10%',
      duration: 5000,
    });
    // Переход на страницу записи после показа уведомления
    setTimeout(() => {
      window.location.href = '/booking';
    }, 500);
  };

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-purple-100 text-sm font-medium text-purple-600 mb-6">
                <Sparkles className="w-4 h-4" />
                Салон красоты премиум-класса
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Создайте свой
                <br />
                <span className="gradient-text">идеальный образ</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Ведущие мастера, премиальные средства и атмосфера заботы.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  onClick={handleBookingClick}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-purple-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Записаться онлайн
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-100 text-gray-700 font-semibold rounded-2xl hover:bg-purple-50 transition-all"
                >
                  Наши услуги
                </Link>
              </div>

              <div className="flex gap-8 mt-12 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-2xl font-bold gradient-text">50+</p>
                  <p className="text-sm text-gray-500">Мастеров</p>
                </div>
                <div>
                  <p className="text-2xl font-bold gradient-text">4.9</p>
                  <p className="text-sm text-gray-500">Средний рейтинг</p>
                </div>
                <div>
                  <p className="text-2xl font-bold gradient-text">1000+</p>
                  <p className="text-sm text-gray-500">Клиентов</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl p-12 text-center shadow-xl">
                <div className="w-32 h-32 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Sparkles className="w-16 h-16 text-purple-500" />
                </div>
                <p className="text-gray-700 font-medium">Фото салона</p>
                <p className="text-gray-500 text-sm">Интерьер премиум-класса</p>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* ===== УСЛУГИ ===== */}
<section className="section-padding bg-white">
  <div className="container">
    <div className="text-center max-w-2xl mx-auto mb-12">
      <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-4">
        Наши услуги
      </span>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Премиальный <span className="gradient-text">уход для вас</span>
      </h2>
      <p className="text-gray-500">Профессиональный уход от лучших мастеров</p>
    </div>

    <div className="grid md:grid-cols-4 gap-6">
      {/* Стрижки - Фиолетовый */}
      <div className="card text-center group hover:border-purple-300">
        <div className="w-14 h-14 rounded-2xl bg-purple-100 group-hover:bg-purple-200 transition-colors flex items-center justify-center mx-auto mb-4">
          <Scissors className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Стрижки</h3>
        <p className="text-sm text-gray-500">Авторские техники</p>
        <div className="mt-3 inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-medium">
          от 1200 ₽
        </div>
      </div>

      {/* Окрашивание - Розовый */}
      <div className="card text-center group hover:border-pink-300">
        <div className="w-14 h-14 rounded-2xl bg-pink-100 group-hover:bg-pink-200 transition-colors flex items-center justify-center mx-auto mb-4">
          <Paintbrush className="w-6 h-6 text-pink-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Окрашивание</h3>
        <p className="text-sm text-gray-500">Модные оттенки</p>
        <div className="mt-3 inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-medium">
          от 2500 ₽
        </div>
      </div>

      {/* Маникюр - Бирюзовый/Мятный */}
      <div className="card text-center group hover:border-teal-300">
        <div className="w-14 h-14 rounded-2xl bg-teal-100 group-hover:bg-teal-200 transition-colors flex items-center justify-center mx-auto mb-4">
          <Hand className="w-6 h-6 text-teal-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Маникюр</h3>
        <p className="text-sm text-gray-500">Современный дизайн</p>
        <div className="mt-3 inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-600 text-xs font-medium">
          от 1500 ₽
        </div>
      </div>

      {/* Косметология - Янтарный/Оранжевый */}
      <div className="card text-center group hover:border-amber-300">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 group-hover:bg-amber-200 transition-colors flex items-center justify-center mx-auto mb-4">
          <Flower2 className="w-6 h-6 text-amber-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Косметология</h3>
        <p className="text-sm text-gray-500">Уход за кожей</p>
        <div className="mt-3 inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-600 text-xs font-medium">
          от 3000 ₽
        </div>
      </div>
    </div>

    <div className="text-center mt-10">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all"
      >
        Все услуги и цены
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </div>
</section>

      {/* ===== ПРЕИМУЩЕСТВА ===== */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-medium mb-4">
              Почему мы
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Выбирают <span className="gradient-text">нас</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: Users, 
                title: 'Топ-мастера', 
                desc: 'Специалисты с опытом от 5 лет и международными сертификатами' 
              },
              { 
                icon: Award, 
                title: 'Премиальные средства', 
                desc: 'Работаем с брендами Oribe, Kerastase, Dior и другими' 
              },
              { 
                icon: Star, 
                title: 'Гарантия результата', 
                desc: '100% удовлетворение или возврат средств' 
              },
            ].map((item) => (
              <div key={item.title} className="card text-center group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200 transition-all flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-padding bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Специальное предложение
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Готовы <span className="underline decoration-white/30 decoration-4">преобразиться</span>?
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Запишитесь на первую консультацию — она абсолютно бесплатна
            </p>
            <Link 
              href="/booking" 
              onClick={(e) => {
                e.preventDefault();
                toast.info('🕐 Первая консультация бесплатна!', {
                  description: 'Запишитесь сейчас и получите скидку 10%',
                  duration: 5000,
                });
                setTimeout(() => {
                  window.location.href = '/booking';
                }, 500);
              }}
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-900/30 transition-all hover:scale-[1.02]"
            >
              Записаться
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}