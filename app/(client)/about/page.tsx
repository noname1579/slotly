// app/(client)/about/page.tsx
import { Sparkles, Users, Award, Heart, Clock, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            О <span className="gradient-text">салоне</span>
          </h1>
          <p className="text-gray-500 text-center mb-12 text-lg">
            SLOTLY — это пространство, где создаются идеальные образы
          </p>

          <div className="glass rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Наша философия</h2>
            <p className="text-gray-600 leading-relaxed">
              Мы верим, что красота — это не просто внешность, а состояние души. 
              Наша команда профессионалов помогает каждому клиенту раскрыть свою 
              индивидуальность и почувствовать себя увереннее.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Users, title: '50+ мастеров', desc: 'Лучшие специалисты города' },
              { icon: Award, title: 'Премиум-средства', desc: 'Только проверенные бренды' },
              { icon: Heart, title: 'Индивидуальный подход', desc: 'Учитываем все пожелания' },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl p-6 text-center">
                <item.icon className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Наши ценности</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Пунктуальность</h4>
                  <p className="text-gray-500 text-sm">Мы ценим ваше время и всегда соблюдаем расписание</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Качество</h4>
                  <p className="text-gray-500 text-sm">Используем только профессиональные материалы</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}