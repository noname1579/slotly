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
  Heart
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 header-glass">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-200 dark:shadow-purple-900/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-primary">SLOTLY</span>
                <span className="block text-[10px] text-secondary font-medium tracking-wider uppercase">
                  Beauty Studio
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-5 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${pathname === item.href 
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
                      : 'text-secondary hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary'
                    }
                    ${item.highlight ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-200 dark:hover:shadow-purple-900/30 hover:scale-[1.02]' : ''}
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center text-primary"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-card border-t border-theme absolute top-20 left-0 right-0 shadow-lg animate-fade-in-up">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      px-5 py-3 rounded-xl text-sm font-medium transition-all
                      ${pathname === item.href 
                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
                        : 'text-secondary hover:bg-gray-50 dark:hover:bg-white/5'
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

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400">
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-white text-xl font-bold mb-2">
                Будьте в курсе новостей
              </h4>
              <p className="text-sm text-gray-400 mb-6">
                Подпишитесь на рассылку и получайте специальные предложения
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-900/30 transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Подписаться
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold text-white">SLOTLY</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                Салон красоты премиум-класса. Создаём идеальные образы с 2015 года.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Telegram
                </a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  WhatsApp
                </a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  VK
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Услуги</h5>
              <ul className="space-y-3 text-sm">
                <li><a href="/services" className="hover:text-white transition-colors">Стрижки и укладки</a></li>
                <li><a href="/services" className="hover:text-white transition-colors">Окрашивание</a></li>
                <li><a href="/services" className="hover:text-white transition-colors">Маникюр и педикюр</a></li>
                <li><a href="/services" className="hover:text-white transition-colors">Косметология</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Информация</h5>
              <ul className="space-y-3 text-sm">
                <li><a href="/" className="hover:text-white transition-colors">Главная</a></li>
                <li><a href="/masters" className="hover:text-white transition-colors">Наши мастера</a></li>
                <li><a href="/contacts" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="/booking" className="hover:text-white transition-colors">Онлайн-запись</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Контакты</h5>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-purple-400" />
                  <a href="tel:+74951234567" className="hover:text-white transition-colors">
                    +7 (495) 123-45-67
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-purple-400" />
                  <span>Москва, ул. Тверская, 15</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-purple-400" />
                  <a href="mailto:info@luxestyle.ru" className="hover:text-white transition-colors">
                    info@luxestyle.ru
                  </a>
                </li>
                <li className="text-sm text-gray-500 pt-2 border-t border-gray-800">
                  <div>Пн-Пт: 09:00 — 21:00</div>
                  <div>Сб-Вс: 10:00 — 19:00</div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="flex items-center gap-1">
              © 2026 SLOTLY Beauty Studio. Все права защищены.
            </p>
            <div className="flex items-center gap-1 text-purple-400">
              <Heart className="w-4 h-4" />
              <span className="text-gray-400">Сделано с любовью</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}