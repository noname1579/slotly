'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { BookingFormData } from '@/lib/types';

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function BookingForm({ onSubmit, onCancel, isLoading = false }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Введите имя';
    }
    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'Введите телефон';
    } else if (!/^\+?[0-9\s\-()]{10,15}$/.test(formData.clientPhone)) {
      newErrors.clientPhone = 'Введите корректный телефон';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Имя <span className="text-red-500">*</span>
        </label>
        <Input
          value={formData.clientName}
          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          placeholder="Введите ваше имя"
          className={errors.clientName ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.clientName && (
          <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Телефон <span className="text-red-500">*</span>
        </label>
        <Input
          value={formData.clientPhone}
          onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
          placeholder="+7 (999) 123-45-67"
          className={errors.clientPhone ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.clientPhone && (
          <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Email <span className="text-gray-400">(необязательно)</span>
        </label>
        <Input
          type="email"
          value={formData.clientEmail || ''}
          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
          placeholder="email@example.com"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Примечания <span className="text-gray-400">(необязательно)</span>
        </label>
        <textarea
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
          rows={2}
          value={formData.notes || ''}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Дополнительная информация..."
          disabled={isLoading}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? 'Создание...' : 'Подтвердить запись'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Отмена
        </Button>
      </div>
    </form>
  );
}