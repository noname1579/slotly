// components/PageLoader.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Loader } from './Loader';

export function PageLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Если загрузка идёт — показываем только лоадер
  if (loading) {
    return <Loader />;
  }

  // Если загрузка завершена — показываем контент
  return <>{children}</>;
}