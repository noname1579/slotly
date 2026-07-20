// app/(client)/contacts/page.tsx
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactsPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши <span className="gradient-text">контакты</span>
          </h1>
          <p className="text-gray-500">Свяжитесь с нами удобным способом</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Адрес</p>
                <p className="text-gray-500">Москва, ул. Тверская, 15</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Телефон</p>
                <a href="tel:+74951234567" className="text-gray-500 hover:text-purple-600 transition-colors">
                  +7 (495) 123-45-67
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <a href="mailto:info@luxestyle.ru" className="text-gray-500 hover:text-purple-600 transition-colors">
                  info@luxestyle.ru
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Часы работы</p>
                <p className="text-gray-500">Пн-Пт: 09:00 — 21:00</p>
                <p className="text-gray-500">Сб-Вс: 10:00 — 19:00</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-center justify-center h-64">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-purple-300 mx-auto mb-3" />
              <p className="text-gray-500">Мы находимся здесь</p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-purple-600 hover:underline"
              >
                Открыть в Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}