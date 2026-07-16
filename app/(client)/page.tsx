// app/(client)/page.tsx
import Link from 'next/link';
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
  Clock,
  Calendar
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Левая часть */}
            <div>
              {/* Бейдж */}
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
                Запишитесь на процедуру и подарите себе сияние.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/booking" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-purple-200 transition-all hover:scale-[1.02]"
                >
                  Записаться онлайн
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/services" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-purple-300 hover:bg-purple-50/50 transition-all"
                >
                  Наши услуги
                </Link>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
                {[
                  { value: '50+', label: 'Мастеров' },
                  { value: '4.9', label: 'Средний рейтинг' },
                  { value: '1000+', label: 'Клиентов' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Правая часть */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl p-12 text-center shadow-xl">
                  <div className="w-32 h-32 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Sparkles className="w-16 h-16 text-purple-500" />
                  </div>
                  <p className="text-gray-700 font-medium">Фото салона</p>
                  <p className="text-gray-500 text-sm">Интерьер премиум-класса</p>
                </div>

                {/* Плавающие карточки */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['А', 'Е', 'М', 'О'].map((letter, i) => (
                        <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                          {letter}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">+3 мастера</p>
                      <p className="text-xs text-gray-500">в сети сегодня</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Работаем</p>
                      <p className="text-xs text-gray-500">09:00 — 21:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== УСЛУГИ ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-4">
              Наши услуги
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Премиальный <span className="gradient-text">уход для вас</span>
            </h2>
            <p className="text-gray-500">
              Используем только профессиональные средства и авторские техники
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Scissors, 
                name: 'Стрижки', 
                desc: 'Авторские техники от топ-стилистов',
                color: 'from-purple-500 to-purple-400',
                href: '/services#hair'
              },
              { 
                icon: Paintbrush, 
                name: 'Окрашивание', 
                desc: 'Модные оттенки и бережные формулы',
                color: 'from-pink-500 to-pink-400',
                href: '/services#color'
              },
              { 
                icon: Hand, 
                name: 'Маникюр', 
                desc: 'Современный дизайн и SPA-уход',
                color: 'from-rose-500 to-rose-400',
                href: '/services#nails'
              },
              { 
                icon: Flower2, 
                name: 'Косметология', 
                desc: 'Уходовые процедуры для сияния кожи',
                color: 'from-violet-500 to-violet-400',
                href: '/services#face'
              },
            ].map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="group bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg hover:shadow-purple-50 transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.desc}</p>
              </Link>
            ))}
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-medium mb-4">
              Почему мы
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-8 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container mx-auto px-4 text-center">
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