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
  Clock,
  Calendar,
  CheckCircle,
  Play
} from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* ===== HERO СЕКЦИЯ ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Фоновые градиенты */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
        
        {/* Декоративные круги */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-100/20 rounded-full blur-3xl" />
        
        {/* Сетка узор */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#7C3AED_1px,transparent_1px),linear-gradient(to_bottom,#7C3AED_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Левая часть */}
            <div className="fade-up">
              {/* Бейдж с анимацией */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-purple-100/50 shadow-lg shadow-purple-100/20 text-sm font-medium text-purple-600 mb-8 hover:shadow-purple-200/40 transition-all">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
                Салон красоты премиум-класса
                <Sparkles className="w-4 h-4 ml-1" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
                Создайте свой
                <br />
                <span className="gradient-text relative">
                  идеальный образ
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 10" fill="none">
                    <path d="M0 5 Q50 10 100 5 Q150 0 200 5" stroke="url(#gradient)" strokeWidth="2" strokeDasharray="4 4"/>
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                Ведущие мастера, премиальные средства и атмосфера заботы. 
                Запишитесь на процедуру и подарите себе сияние.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/booking" 
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-2xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Записаться онлайн
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                
                <Link 
                  href="/services" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-purple-300 hover:bg-purple-50/50 transition-all hover:scale-[1.02]"
                >
                  Наши услуги
                </Link>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200/60">
                {[
                  { value: '50+', label: 'Мастеров', icon: Users },
                  { value: '4.9', label: 'Средний рейтинг', icon: Star },
                  { value: '1000+', label: 'Клиентов', icon: CheckCircle },
                ].map((stat) => (
                  <div key={stat.label} className="group">
                    <div className="flex items-center gap-2">
                      <stat.icon className="w-5 h-5 text-purple-400 group-hover:text-purple-600 transition-colors" />
                      <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Правая часть */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Основное изображение */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-200/30">
                  <div className="aspect-[4/3] bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-200/50">
                        <Sparkles className="w-16 h-16 text-purple-500" />
                      </div>
                      <p className="text-gray-700 font-medium text-lg">Фото салона</p>
                      <p className="text-gray-500 text-sm">Интерьер премиум-класса</p>
                    </div>
                  </div>
                  
                  {/* Бейдж поверх */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-white/50">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {['⭐', '⭐', '⭐', '⭐', '⭐'].map((star, i) => (
                          <span key={i} className="text-sm">{star}</span>
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">4.9</span>
                    </div>
                  </div>
                </div>

                {/* Плавающая карточка 1 */}
                <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '-1s' }}>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {['А', 'Е', 'М', 'О'].map((letter, i) => (
                        <div 
                          key={i} 
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-md"
                        >
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

                {/* Плавающая карточка 2 */}
                <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '-2s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Работаем</p>
                      <p className="text-xs text-gray-500">09:00 — 21:00</p>
                    </div>
                  </div>
                </div>

                {/* Плавающая карточка 3 */}
                <div className="absolute bottom-20 -right-8 glass rounded-2xl p-3 shadow-xl animate-float" style={{ animationDelay: '-0.5s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-800">Гарантия качества</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Градиент для текста */}
        <svg className="absolute" style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Кнопка скролла вниз */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2 text-gray-400 animate-float">
            <span className="text-xs uppercase tracking-wider text-gray-400">Листайте вниз</span>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-purple-500 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Остальные секции остаются без изменений */}
      
      {/* ===== УСЛУГИ ===== */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-4">
              Наши услуги
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Премиальный <span className="gradient-text">уход для вас</span>
            </h2>
            <p className="text-gray-500">Профессиональный уход от лучших мастеров</p>
          </div>

          <div className="grid-4">
            {[
              { icon: Scissors, name: 'Стрижки', desc: 'Авторские техники' },
              { icon: Paintbrush, name: 'Окрашивание', desc: 'Модные оттенки' },
              { icon: Hand, name: 'Маникюр', desc: 'Современный дизайн' },
              { icon: Flower2, name: 'Косметология', desc: 'Уход за кожей' },
            ].map((item) => (
              <div key={item.name} className="card text-center group">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 group-hover:bg-purple-200 transition-colors flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="btn btn-secondary">
              Все услуги
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ПРЕИМУЩЕСТВА ===== */}
      <section className="section-padding bg-gray-50/50">
        <div className="container">
          <div className="grid-3">
            {[
              { icon: Users, title: 'Топ-мастера', desc: 'Опыт от 5 лет' },
              { icon: Award, title: 'Премиум-средства', desc: 'Лучшие бренды' },
              { icon: Star, title: 'Гарантия', desc: '100% результат' },
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
      <section className="section-padding relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="container relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Специальное предложение
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Готовы <span className="underline decoration-white/30 decoration-4">преобразиться</span>?
            </h2>
            <p className="text-white/90 mb-8 max-w-md mx-auto text-lg">
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