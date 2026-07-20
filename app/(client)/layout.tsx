// app/(client)/layout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Sparkles, 
  Phone, 
  MapPin,
  Send,
  Mail,
  Heart,
  ArrowUpRight
} from 'lucide-react';
import { PageLoader } from '@/components/PageLoader';
import { Toaster } from '@/components/Toaster';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/services', label: 'Услуги' },
    { href: '/masters', label: 'Мастера' },
    { href: '/booking', label: 'Запись', highlight: true },
    { href: '/contacts', label: 'Контакты' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ===== TOASTER ===== */}
      <Toaster />

      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#F0E7FF] shadow-sm shadow-black/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-200/50 transition-transform group-hover:scale-105">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div>
                <span className="text-lg md:text-xl font-bold tracking-tight text-gray-900">
                  SLOTLY
                </span>
                <span className="hidden md:block text-[10px] font-medium tracking-[0.15em] uppercase text-gray-400">
                  Beauty Studio
                </span>
              </div>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${pathname === item.href 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
                    }
                    ${item.highlight 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-200/50 hover:scale-[1.02]' 
                      : ''
                    }
                  `}
                >
                  {item.label}
                  {pathname === item.href && !item.highlight && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-purple-500" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-9 h-9 md:w-10 md:h-10 rounded-xl hover:bg-gray-50/50 transition-colors flex items-center justify-center text-gray-900"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 border-t border-[#F0E7FF] shadow-xl">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${pathname === item.href 
                        ? 'bg-purple-50 text-purple-600' 
                        : 'text-gray-600 hover:bg-gray-50/50'
                      }
                      ${item.highlight ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center' : ''}
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* ===== MAIN ===== */}
      <main className="flex-1 pt-16 md:pt-20">
        <PageLoader>{children}</PageLoader>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-gray-400">
        {/* Newsletter */}
        <div className="border-b border-gray-800/50 py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-3">
                <Send className="w-3 h-3" />
                Рассылка
              </div>
              <h4 className="text-white text-xl md:text-2xl font-bold mb-1.5">
                Будьте в курсе новостей
              </h4>
              <p className="text-sm text-gray-400 mb-5">
                Подпишитесь на рассылку и получайте специальные предложения
              </p>
              <form className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                />
                <button className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-purple-900/30 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                  <Send className="w-4 h-4" />
                  Подписаться
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Main */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-5 md:pt-10 md:pb-2">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">SLOTLY</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                Салон красоты премиум-класса. Создаём идеальные образы с 2015 года.
              </p>
              <div className="flex items-center gap-3 mt-4">
                {/* Telegram */}
                <a href="#" className="text-gray-500 hover:text-[#0088cc] transition-colors" aria-label="Telegram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
                {/* WhatsApp */}
                <a href="#" className="text-gray-500 hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                {/* ВКонтакте */}
                <a href="#" className="text-gray-500 hover:text-[#0077FF] transition-colors" aria-label="ВКонтакте">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.063 17.285c-.77.057-1.527-.008-2.213-.218-.764-.234-1.411-.721-1.962-1.278-1.092-1.106-1.875-2.49-2.697-3.807-1.413-2.265-2.697-4.625-4.065-6.934-.064-.108-.166-.189-.27-.254-.528-.331-1.084-.096-1.423.395-.251.363-.264.833-.109 1.242.572 1.512 1.271 2.967 1.949 4.434 1.681 3.646 3.628 7.178 5.727 10.55.86 1.383 1.963 2.439 3.455 2.98 1.486.541 2.928.341 4.12-.877.849-.866 1.226-2.004 1.156-3.19-.05-.854-.857-1.288-1.546-1.472-.297-.079-.602-.167-.904-.226.053-.059.109-.115.169-.167 2.154-1.888 3.167-4.399 3.644-7.089.1-.556-.288-1.073-.84-1.161-.504-.084-.975.197-1.199.633-.386.747-.717 1.526-1.079 2.286-.64 1.343-1.349 2.653-2.171 3.889-1.377 2.07-2.746 4.141-4.715 5.709.037-.068.081-.134.123-.202 1.166-1.89 2.14-3.884 3.039-5.929.464-1.055.891-2.131 1.339-3.19.221-.523-.002-1.149-.577-1.344-1.014-.347-1.833.414-2.236 1.218-.334.667-.613 1.365-.912 2.049-.689 1.573-1.439 3.117-2.208 4.65-.297.594-.6 1.188-.942 1.755-.105.174-.248.326-.417.436.036-.27.071-.54.104-.811.416-3.38.596-6.813-.021-10.156-.061-.335-.202-.658-.456-.886-.316-.286-.733-.378-1.151-.362-.236.009-.468.091-.657.239-.787.619-1.247 1.611-1.122 2.612.066.525.356 1.597.832 3.17-.135.3-.276.597-.422.892-.636 1.282-1.297 2.552-2.008 3.789-.832 1.447-1.72 2.862-2.835 4.117-.247-.848-.285-1.771-.079-2.635.235-.989.735-1.86 1.162-2.737.57-1.17 1.088-2.371 1.58-3.578.33-.811.636-1.635.969-2.443.146-.353.329-.712.39-1.105.141-.918-.112-1.889-.759-2.537-.965-.969-2.508-.627-3.208.41-.31.457-.506.993-.576 1.547-.148 1.159-.092 2.343.058 3.506.197 1.51.679 2.954 1.081 4.419.698 2.544 1.557 5.04 3.137 7.08.693.895 1.548 1.603 2.514 2.049.542.25 1.133.363 1.724.332.673-.035 1.347-.269 1.933-.63.625-.385 1.131-.924 1.544-1.536.258-.383.481-.789.722-1.181.767-.45 1.622-.83 2.354-1.454 1.204-1.026 2.133-2.312 2.949-3.667.247-.41.489-.824.749-1.225.593-.911 1.337-1.715 1.958-2.605.853-1.224 1.608-2.522 2.352-3.824.225-.393.491-.773.702-1.18.132-.254.179-.562.028-.805-.115-.185-.329-.3-.548-.299z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5 opacity-80">
                Услуги
              </h5>
              <ul className="space-y-2.5 text-sm">
                <li><a href="/services#hair" className="text-gray-400 hover:text-white transition-colors">Стрижки</a></li>
                <li><a href="/services#color" className="text-gray-400 hover:text-white transition-colors">Окрашивание</a></li>
                <li><a href="/services#nails" className="text-gray-400 hover:text-white transition-colors">Маникюр</a></li>
                <li><a href="/services#face" className="text-gray-400 hover:text-white transition-colors">Косметология</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5 opacity-80">
                Информация
              </h5>
              <ul className="space-y-2.5 text-sm">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Главная</a></li>
                <li><a href="/masters" className="text-gray-400 hover:text-white transition-colors">Наши мастера</a></li>
                <li><a href="/contacts" className="text-gray-400 hover:text-white transition-colors">Контакты</a></li>
                <li><a href="/booking" className="text-gray-400 hover:text-white transition-colors">Онлайн-запись</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5 opacity-80">
                Контакты
              </h5>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />
                  <a href="tel:+74951234567" className="text-gray-400 hover:text-white transition-colors">
                    +7 (495) 123-45-67
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />
                  <span className="text-gray-400">Москва, ул. Тверская, 15</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />
                  <a href="mailto:info@luxestyle.ru" className="text-gray-400 hover:text-white transition-colors">
                    info@luxestyle.ru
                  </a>
                </li>
                <li className="pt-3 mt-1 border-t border-gray-800/50 text-xs text-gray-500">
                  <div>Пн-Пт: 09:00 — 21:00</div>
                  <div>Сб-Вс: 10:00 — 19:00</div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800/50 mt-12 pt-8 pb-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} SLOTLY Beauty Studio. Все права защищены.
            </p>
            <div className="flex items-center gap-1 text-purple-400">
              <span className="text-gray-500">Сделано для вашей красоты</span>
              <Heart className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}