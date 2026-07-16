// app/(client)/masters/page.tsx
import Link from 'next/link';
import { Star, Sparkles, Clock, Award } from 'lucide-react';

const masters = [
  {
    id: 1,
    name: 'Анна Смирнова',
    photo: '👩',
    specialty: 'Парикмахер-стилист',
    rating: 4.9,
    reviews: 127,
    experience: 8,
    education: 'Академия Hair',
    certifications: ['Oribe Expert', 'L\'Oréal Certified'],
    bio: 'Специалист по созданию индивидуальных образов. Владеет всеми современными техниками стрижек и окрашивания.',
  },
  {
    id: 2,
    name: 'Екатерина Иванова',
    photo: '👩‍🦰',
    specialty: 'Мастер маникюра',
    rating: 4.8,
    reviews: 98,
    experience: 6,
    education: 'School of Nail Art',
    certifications: ['CND Expert', 'BIOSculpture'],
    bio: 'Создаёт уникальный дизайн ногтей. Специалист по наращиванию и лечению проблемных ногтей.',
  },
  {
    id: 3,
    name: 'Мария Петрова',
    photo: '👩‍🦱',
    specialty: 'Косметолог',
    rating: 4.7,
    reviews: 85,
    experience: 5,
    education: 'Медицинская академия',
    certifications: ['Dermalogica', 'DMK'],
    bio: 'Проводит полный спектр косметологических процедур. Подбирает индивидуальный уход за кожей.',
  },
];

export default function MastersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Наши <span className="gradient-text">мастера</span>
          </h1>
          <p className="text-gray-500">
            Команда профессионалов с опытом работы от 5 лет
          </p>
        </div>

        {/* Masters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {masters.map((master) => (
            <div key={master.id} className="glass rounded-3xl p-6 hover:shadow-xl transition-all hover:-translate-y-1">
              {/* Photo */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 mx-auto mb-4 flex items-center justify-center text-6xl">
                {master.photo}
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">{master.name}</h3>
                <p className="text-sm text-purple-600 font-medium">{master.specialty}</p>
                
                <div className="flex items-center justify-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{master.rating}</span>
                    <span className="text-gray-400">({master.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{master.experience} лет</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-3">{master.bio}</p>

                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {master.certifications.map((cert, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-lg">
                      {cert}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/booking?master=${encodeURIComponent(master.name)}`}
                  className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium text-sm rounded-xl hover:shadow-lg transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Записаться
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}