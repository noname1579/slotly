// app/admin/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Scissors,
  Home,
  Menu,
  X,
  Sparkles,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const menu = [
    { href: '/admin', label: 'Главная', icon: LayoutDashboard },
    { href: '/admin/bookings', label: 'Записи', icon: Calendar },
    { href: '/admin/masters', label: 'Мастера', icon: Users },
    { href: '/admin/services', label: 'Услуги', icon: Scissors },
  ];

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminAuth');
    }
    toast.success('👋 Выход выполнен');
    router.push('/admin');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 transition-transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex items-center gap-2.5 p-4 border-b">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">SLOTLY</span>
          <span className="text-xs text-gray-400 ml-auto">Админ</span>
        </div>

        <nav className="p-3 space-y-1">
          {menu.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 w-full"
          >
            <Home className="w-5 h-5" />
            На сайт
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-64">
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sm text-gray-500">Администратор</span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                А
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}