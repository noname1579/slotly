// app/(client)/contacts/page.tsx
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Heart } from 'lucide-react';

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши <span className="gradient-text">контакты</span>
          </h1>
          <p className="text-gray-500">
            Мы всегда рады ответить на ваши вопросы
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Свяжитесь с нами</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 glass rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Адрес</p>
                  <p className="text-gray-500">Москва, ул. Тверская, 15</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 glass rounded-2xl">
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

              <div className="flex items-start gap-4 p-4 glass rounded-2xl">
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

              <div className="flex items-start gap-4 p-4 glass rounded-2xl">
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

            {/* Социальные сети */}
            <div className="pt-4">
              <p className="font-medium text-gray-900 mb-3">Мы в соцсетях</p>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="px-4 py-2 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-all text-sm font-medium flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
                <a href="#" className="px-4 py-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-all text-sm font-medium flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a href="#" className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all text-sm font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  ВКонтакте
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="glass rounded-3xl overflow-hidden h-[400px]">
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-purple-500 mx-auto mb-3" />
                <p className="text-gray-700 font-medium">Мы здесь</p>
                <p className="text-sm text-gray-500">Москва, ул. Тверская, 15</p>
                <a 
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Открыть в картах
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}