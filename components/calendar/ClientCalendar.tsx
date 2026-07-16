'use client';

import { useState, useEffect, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';
import { X, Sparkles, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Master, Service, Booking, BookingFormData } from '@/lib/types';
import { formatPrice, formatDateTime, addMinutesToDate } from '@/lib/utils';

interface ClientCalendarProps {
  masters: Master[];
  services: Service[];
  bookings: Booking[];
  onBookingCreate: (data: BookingFormData & { masterId: string; serviceId: string; startTime: string; endTime: string }) => Promise<void>;
}

export function ClientCalendar({ masters, services, bookings, onBookingCreate }: ClientCalendarProps) {
  const [selectedMaster, setSelectedMaster] = useState<string>(masters[0]?.id || '');
  const [selectedService, setSelectedService] = useState<string>(services[0]?.id || '');
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const events = useMemo(() => {
    return bookings
      .filter(b => b.masterId === selectedMaster && b.status !== 'CANCELLED')
      .map(b => ({
        id: b.id,
        title: `${b.clientName} — ${b.service?.name || 'Услуга'}`,
        start: b.startTime,
        end: b.endTime,
        backgroundColor: b.status === 'CONFIRMED' ? '#8B5CF6' : '#F472B6',
        borderColor: b.status === 'CONFIRMED' ? '#8B5CF6' : '#F472B6',
        textColor: '#ffffff',
        extendedProps: { ...b },
      }));
  }, [bookings, selectedMaster]);

  const handleDateSelect = (selectInfo: any) => {
    const start = selectInfo.start;
    const end = selectInfo.end;

    const isBooked = bookings.some(b => {
      const bStart = new Date(b.startTime);
      const bEnd = new Date(b.endTime);
      return (
        b.masterId === selectedMaster &&
        b.status !== 'CANCELLED' &&
        ((start >= bStart && start < bEnd) || (end > bStart && end <= bEnd))
      );
    });

    if (isBooked) {
      alert('😕 Это время уже занято! Выберите другой слот.');
      return;
    }

    const service = services.find(s => s.id === selectedService);
    if (!service) return;

    setSelectedSlot({
      start,
      end: addMinutesToDate(start, service.duration),
    });
    setFormData({ clientName: '', clientPhone: '', clientEmail: '', notes: '' });
    setErrors({});
    setShowBookingForm(true);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.clientName.trim()) newErrors.clientName = 'Введите имя';
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
    if (!selectedSlot || !selectedMaster || !selectedService) return;

    setIsLoading(true);
    try {
      await onBookingCreate({
        ...formData,
        masterId: selectedMaster,
        serviceId: selectedService,
        startTime: selectedSlot.start.toISOString(),
        endTime: selectedSlot.end.toISOString(),
      });
      setShowBookingForm(false);
      setSelectedSlot(null);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedMasterData = masters.find(m => m.id === selectedMaster);

  return (
    <div className="space-y-6">
      {/* Фильтры */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Выберите услугу
          </label>
          <select
            className="select-modern w-full h-12 px-4 rounded-xl border-2 border-purple-100/50 bg-white/70 backdrop-blur-sm text-gray-800 font-medium transition-all duration-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none hover:border-purple-200"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            {services.map(s => (
              <option key={s.id} value={s.id} className="py-2">
                {s.name} — {formatPrice(s.price)} ({s.duration} мин)
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-pink-500" />
            Выберите мастера
          </label>
          <select
            className="select-modern w-full h-12 px-4 rounded-xl border-2 border-pink-100/50 bg-white/70 backdrop-blur-sm text-gray-800 font-medium transition-all duration-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none hover:border-pink-200"
            value={selectedMaster}
            onChange={(e) => setSelectedMaster(e.target.value)}
          >
            {masters.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} — {m.specialty} {m.rating && `⭐ ${m.rating}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Информация о выбранном */}
      {selectedServiceData && selectedMasterData && (
        <div className="glass rounded-2xl p-4 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
              {selectedServiceData.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{selectedServiceData.name}</p>
              <p className="text-sm text-gray-500">
                {selectedMasterData.name} · {formatPrice(selectedServiceData.price)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{selectedServiceData.duration} мин</span>
          </div>
        </div>
      )}

      {/* Календарь */}
      <Card className="border-0 glass rounded-3xl overflow-hidden">
        <CardContent className="p-4 md:p-6">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            locale={ruLocale}
            events={events}
            selectable={true}
            select={handleDateSelect}
            slotMinTime="08:00"
            slotMaxTime="22:00"
            height="auto"
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5, 6],
              startTime: '09:00',
              endTime: '20:00',
            }}
            firstDay={1}
            allDaySlot={false}
            slotDuration="00:30"
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }}
            themeSystem="standard"
          />
        </CardContent>
      </Card>

      {/* Модалка формы */}
      {showBookingForm && selectedSlot && selectedServiceData && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up">
          <div className="glass rounded-3xl max-w-md w-full p-6 modal-animate relative">
            <button
              onClick={() => setShowBookingForm(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl hover:bg-white/50 transition-all flex items-center justify-center"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-bold gradient-text">Новая запись</h3>
              <p className="text-gray-500 text-sm mt-1">Заполните данные для бронирования</p>
            </div>

            <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/50">
              <div className="space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-500">Услуга</span>
                  <span className="font-medium text-gray-800">{selectedServiceData.name}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Дата и время</span>
                  <span className="font-medium text-gray-800">{formatDateTime(selectedSlot.start)}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Мастер</span>
                  <span className="font-medium text-gray-800">{selectedMasterData?.name}</span>
                </p>
                <p className="flex justify-between border-t border-purple-100/50 pt-2 mt-2">
                  <span className="text-gray-500">Стоимость</span>
                  <span className="font-bold text-purple-600">{formatPrice(selectedServiceData.price)}</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Ваше имя"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className={`pl-11 ${errors.clientName ? 'border-red-400 ring-red-100' : ''}`}
                  disabled={isLoading}
                />
                {errors.clientName && (
                  <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>
                )}
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="+7 (999) 123-45-67"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  className={`pl-11 ${errors.clientPhone ? 'border-red-400 ring-red-100' : ''}`}
                  disabled={isLoading}
                />
                {errors.clientPhone && (
                  <p className="text-red-500 text-xs mt-1">{errors.clientPhone}</p>
                )}
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email (необязательно)"
                  value={formData.clientEmail || ''}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  className="pl-11"
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                <textarea
                  className="w-full h-20 rounded-xl border-2 border-purple-100/50 bg-white/70 backdrop-blur-sm px-4 pl-11 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus-visible:outline-none focus-visible:border-purple-400 focus-visible:ring-4 focus-visible:ring-purple-100 disabled:opacity-50 hover:border-purple-200 resize-none"
                  placeholder="Примечания (необязательно)"
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Создание...' : 'Подтвердить запись'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowBookingForm(false)}
                  disabled={isLoading}
                >
                  Отмена
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}