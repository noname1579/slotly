// components/Toaster.tsx
'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        style: {
          background: 'white',
          color: '#1A1A2E',
          border: '1px solid #F0E7FF',
          borderRadius: '16px',
          padding: '16px 20px',
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.12)',
          fontSize: '14px',
        },
        className: 'font-sans',
        duration: 4000,
      }}
      closeButton
      richColors
    />
  );
}