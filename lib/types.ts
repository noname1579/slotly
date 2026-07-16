// lib/types.ts

export interface Master {
  id: string;
  name: string;
  photo?: string;
  specialty: string;
  rating?: number;
  reviews?: number;
  experience?: number;
  schedule?: {
    [key: string]: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number; // в минутах
  price: number;
  category?: string;
  popular?: boolean;
  image?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  startTime: string;
  endTime: string;
  masterId: string;
  master?: Master;
  serviceId: string;
  service?: Service;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFormData {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  notes?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Статусы бронирования с цветами
export const BOOKING_STATUSES = {
  PENDING: { label: 'Ожидание', color: 'bg-yellow-500' },
  CONFIRMED: { label: 'Подтверждено', color: 'bg-blue-500' },
  COMPLETED: { label: 'Выполнено', color: 'bg-green-500' },
  CANCELLED: { label: 'Отменено', color: 'bg-red-500' },
} as const;

export type BookingStatus = keyof typeof BOOKING_STATUSES;