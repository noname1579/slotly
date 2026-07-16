// app/(client)/layout.tsx
'use client';

import { useState, useEffect } from 'react';
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
import { ThemeToggle } from '@/components/ThemeToggle';
import { PageLoader } from '@/components/PageLoader';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Отслеживаем тему
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    const observer = new MutationObserver(() => {
      checkTheme();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/services', label: 'Услуги' },
    { href: '/masters', label: 'Мастера' },
    { href: '/booking', label: 'Запись', highlight: true },
    { href: '/contacts', label: 'Контакты' },
  ];

  const headerClass = isDark 
    ? 'bg-[#0F0A1A]/95 backdrop-blur-xl border-[#2A1A3E] shadow-lg shadow-black/20' 
    : 'bg-white/95 backdrop-blur-xl border-[#F0E7FF] shadow-sm shadow-black/5';

  return (
    <div className="min-h-screen flex flex-col bg-body">
      {/* ===== HEADER ===== */}
      <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${headerClass}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-200/50 dark:shadow-purple-900/30 transition-transform group-hover:scale-105">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div>
                <span className={`text-lg md:text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  SLOTLY
                </span>
                <span className="hidden md:block text-[10px] font-medium tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500">
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
                      ? isDark 
                        ? 'bg-purple-900/30 text-purple-400' 
                        : 'bg-purple-50 text-purple-600'
                      : isDark
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
                    }
                    ${item.highlight 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 hover:scale-[1.02]' 
                      : ''
                    }
                  `}
                >
                  {item.label}
                  {pathname === item.href && !item.highlight && (
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`} />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2 md:gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden w-9 h-9 md:w-10 md:h-10 rounded-xl transition-colors flex items-center justify-center ${
                  isDark 
                    ? 'hover:bg-white/5 text-white' 
                    : 'hover:bg-gray-50/50 text-gray-900'
                }`}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden border-t ${isDark ? 'bg-[#0F0A1A]/95 border-[#2A1A3E]' : 'bg-white/95 border-[#F0E7FF]'} shadow-xl`}>
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
                        ? isDark
                          ? 'bg-purple-900/30 text-purple-400'
                          : 'bg-purple-50 text-purple-600'
                        : isDark
                          ? 'text-gray-400 hover:bg-white/5'
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
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400">
        {/* Newsletter */}
        <div className="border-b border-gray-800/50 md:py-18 py-8">
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
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 md:py-16">
            {/* Бренд */}
            <div className="col-span-2 md:col-span-1 py-4 md:py-0">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">SLOTLY</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                Салон красоты премиум-класса. Создаём идеальные образы с 2015 года.
              </p>
              <div className="flex items-center gap-3 mt-4">
                {/* Instagram */}
                <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="YouTube">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" className="text-gray-500 hover:text-[#1877F2] transition-colors" aria-label="Facebook">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Услуги */}
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

            {/* Информация */}
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

            {/* Контакты */}
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

          {/* Bottom Bar */}
          <div className="py-8 border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} SLOTLY Beauty Studio. Все права защищены.
            </p>
            <div className="flex items-center gap-1 text-purple-400">
              <Heart className="w-3.5 h-3.5" />
              <span className="text-gray-500">Сделано с ❤️ для вашей красоты</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}