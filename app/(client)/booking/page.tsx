// app/(client)/booking/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Clock, User, Phone, Mail, Calendar, Scissors } from 'lucide-react';

// Временные демо-данные (потом заменим на реальные)
const services = [
  { id: 1, name: 'Женская стрижка', duration: 60, price: 2500 },
  { id: 2, name: 'Окрашивание', duration: 120, price: 4500 },
  { id: 3, name: 'Маникюр', duration: 90, price: 2000 },
  { id: 4, name: 'Педикюр', duration: 60, price: 2500 },
  { id: 5, name: 'Чистка лица', duration: 60, price: 3000 },
];

const masters = [
  { id: 1, name: 'Анна Смирнова', specialty: 'Парикмахер' },
  { id: 2, name: 'Екатерина Иванова', specialty: 'Маникюр' },
  { id: 3, name: 'Мария Петрова', specialty: 'Косметолог' },
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00',
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    master: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('✅ Запись создана! Мы ждём вас ❤️');
    console.log('Данные записи:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Назад */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>

        {/* Заголовок */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Запись в салон</h1>
              <p className="text-sm text-gray-500">Заполните форму, и мы ждём вас!</p>
            </div>
          </div>

          {/* Шаги */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${s === step ? 'bg-purple-600 text-white' : s < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}
                `}>
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && <div className={`w-8 h-0.5 ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Шаг 1: Выбор услуги и мастера */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Выберите услугу *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all"
                    required
                  >
                    <option value="">Выберите услугу</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} — {s.price}₽ ({s.duration} мин)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Выберите мастера *
                  </label>
                  <select
                    name="master"
                    value={formData.master}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all"
                    required
                  >
                    <option value="">Выберите мастера</option>
                    {masters.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} — {m.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-200 transition-all"
                >
                  Далее
                </button>
              </div>
            )}

            {/* Шаг 2: Дата и время */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Выберите дату *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Выберите время *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all"
                    required
                  >
                    <option value="">Выберите время</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Назад
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-200 transition-all"
                  >
                    Далее
                  </button>
                </div>
              </div>
            )}

            {/* Шаг 3: Контактные данные */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 mb-4">
                  <div className="flex items-center gap-2 text-sm text-purple-700">
                    <Scissors className="w-4 h-4" />
                    <span>
                      {formData.service} · {formData.master} · {formData.date && new Date(formData.date).toLocaleDateString('ru-RU')} в {formData.time}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Ваше имя *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Анна"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Телефон *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (999) 123-45-67"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email (необязательно)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="anna@example.com"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Примечания (необязательно)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Дополнительная информация..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Записаться
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Инфо */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Нажимая «Записаться», вы соглашаетесь с условиями обработки данных</p>
        </div>
      </div>
    </div>
  );
}