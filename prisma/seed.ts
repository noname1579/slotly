// prisma/seed.ts
import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...');

  // Очистка старых данных
  await prisma.booking.deleteMany({});
  await prisma.master.deleteMany({});
  await prisma.service.deleteMany({});

  console.log('🗑️ Старые данные удалены');

  // ===== СОЗДАЁМ МАСТЕРОВ =====
  const masters = await prisma.master.createMany({
    data: [
      {
        name: 'Анна Смирнова',
        specialty: 'Парикмахер-стилист',
        rating: 4.9,
        reviews: 127,
        experience: 8,
      },
      {
        name: 'Екатерина Иванова',
        specialty: 'Мастер маникюра',
        rating: 4.8,
        reviews: 98,
        experience: 6,
      },
      {
        name: 'Мария Петрова',
        specialty: 'Косметолог',
        rating: 4.7,
        reviews: 85,
        experience: 5,
      },
      {
        name: 'Ольга Соколова',
        specialty: 'Визажист',
        rating: 4.9,
        reviews: 112,
        experience: 7,
      },
      {
        name: 'Дмитрий Козлов',
        specialty: 'Барбер',
        rating: 4.8,
        reviews: 76,
        experience: 4,
      },
      {
        name: 'Наталья Морозова',
        specialty: 'Массажист',
        rating: 4.6,
        reviews: 54,
        experience: 3,
      },
    ],
  });

  console.log(`✅ Добавлено мастеров: ${masters.count}`);

  // ===== СОЗДАЁМ УСЛУГИ =====
  const services = await prisma.service.createMany({
    data: [
      // Стрижки
      {
        name: 'Женская стрижка',
        duration: 60,
        price: 2500,
        category: 'Стрижки',
        popular: true,
        description: 'Стрижка с учётом структуры волос и пожеланий клиента',
      },
      {
        name: 'Мужская стрижка',
        duration: 45,
        price: 1800,
        category: 'Стрижки',
        popular: true,
        description: 'Классическая или модельная мужская стрижка',
      },
      {
        name: 'Детская стрижка',
        duration: 30,
        price: 1200,
        category: 'Стрижки',
        popular: false,
        description: 'Стрижка для детей до 12 лет',
      },
      {
        name: 'Укладка (фен)',
        duration: 40,
        price: 1500,
        category: 'Стрижки',
        popular: false,
        description: 'Укладка феном с использованием профессиональных средств',
      },
      {
        name: 'Вечерняя прическа',
        duration: 90,
        price: 3500,
        category: 'Стрижки',
        popular: false,
        description: 'Свадебная, выпускная или праздничная прическа',
      },

      // Окрашивание
      {
        name: 'Полное окрашивание',
        duration: 120,
        price: 4500,
        category: 'Окрашивание',
        popular: true,
        description: 'Окрашивание всех волос профессиональными красителями',
      },
      {
        name: 'Мелирование',
        duration: 90,
        price: 4000,
        category: 'Окрашивание',
        popular: false,
        description: 'Классическое или французское мелирование',
      },
      {
        name: 'Тонирование',
        duration: 45,
        price: 2500,
        category: 'Окрашивание',
        popular: false,
        description: 'Бережное тонирование волос',
      },
      {
        name: 'Балаяж',
        duration: 120,
        price: 5000,
        category: 'Окрашивание',
        popular: true,
        description: 'Модная техника окрашивания с эффектом выгоревших прядей',
      },
      {
        name: 'Смывка пигмента',
        duration: 60,
        price: 3500,
        category: 'Окрашивание',
        popular: false,
        description: 'Профессиональная смывка тёмного пигмента',
      },

      // Маникюр
      {
        name: 'Маникюр (классический)',
        duration: 90,
        price: 2000,
        category: 'Маникюр',
        popular: false,
        description: 'Классический обрезной маникюр',
      },
      {
        name: 'Маникюр (аппаратный)',
        duration: 75,
        price: 2200,
        category: 'Маникюр',
        popular: true,
        description: 'Современный аппаратный маникюр',
      },
      {
        name: 'Маникюр + покрытие гель-лак',
        duration: 105,
        price: 2800,
        category: 'Маникюр',
        popular: true,
        description: 'Маникюр с покрытием гель-лаком любого цвета',
      },
      {
        name: 'SPA-уход за руками',
        duration: 60,
        price: 1800,
        category: 'Маникюр',
        popular: false,
        description: 'Пилинг, маска и парафинотерапия для рук',
      },

      // Педикюр
      {
        name: 'Педикюр (классический)',
        duration: 75,
        price: 2500,
        category: 'Педикюр',
        popular: false,
        description: 'Классический педикюр',
      },
      {
        name: 'Педикюр (аппаратный)',
        duration: 60,
        price: 2700,
        category: 'Педикюр',
        popular: true,
        description: 'Аппаратный педикюр с уходом за стопами',
      },

      // Косметология
      {
        name: 'Чистка лица (ультразвук)',
        duration: 60,
        price: 3000,
        category: 'Косметология',
        popular: false,
        description: 'Безболезненная ультразвуковая чистка лица',
      },
      {
        name: 'Чистка лица (механическая)',
        duration: 90,
        price: 3500,
        category: 'Косметология',
        popular: true,
        description: 'Глубокая ручная чистка лица',
      },
      {
        name: 'Биоревитализация',
        duration: 45,
        price: 8000,
        category: 'Косметология',
        popular: false,
        description: 'Увлажнение и омоложение кожи инъекциями гиалуроновой кислоты',
      },
      {
        name: 'Пилинг (срединный)',
        duration: 40,
        price: 4500,
        category: 'Косметология',
        popular: false,
        description: 'Срединный химический пилинг для обновления кожи',
      },

      // Массаж
      {
        name: 'Массаж спины',
        duration: 60,
        price: 3500,
        category: 'Массаж',
        popular: false,
        description: 'Лечебно-расслабляющий массаж спины',
      },
      {
        name: 'Общий массаж',
        duration: 90,
        price: 5000,
        category: 'Массаж',
        popular: false,
        description: 'Полноценный массаж всего тела',
      },

      // Брови и ресницы
      {
        name: 'Коррекция бровей',
        duration: 30,
        price: 1000,
        category: 'Брови',
        popular: true,
        description: 'Коррекция формы бровей воском или пинцетом',
      },
      {
        name: 'Окрашивание бровей',
        duration: 30,
        price: 1200,
        category: 'Брови',
        popular: false,
        description: 'Окрашивание бровей профессиональной краской',
      },
      {
        name: 'Брови + ресницы',
        duration: 45,
        price: 1500,
        category: 'Брови',
        popular: true,
        description: 'Коррекция бровей и окрашивание ресниц',
      },

      // Спецпредложения
      {
        name: 'Свадебный образ',
        duration: 180,
        price: 8000,
        category: 'Спецпредложения',
        popular: false,
        description: 'Полный образ: прическа, макияж, брови',
      },
      {
        name: 'Экспресс-уход',
        duration: 30,
        price: 1500,
        category: 'Спецпредложения',
        popular: false,
        description: 'Быстрая процедура для поддержания красоты',
      },
    ],
  });

  console.log(`✅ Добавлено услуг: ${services.count}`);

  // ===== СОЗДАЁМ ТЕСТОВЫЕ ЗАПИСИ =====
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allMasters = await prisma.master.findMany();
  const allServices = await prisma.service.findMany();

  // Массив статусов с правильным типом
  const statuses: Status[] = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
  const clientNames = ['Анна', 'Екатерина', 'Мария', 'Ольга', 'Ирина', 'Дмитрий', 'Сергей', 'Алексей', 'Наталья', 'Татьяна'];

  const testBookings = [];

  for (let i = 0; i < 15; i++) {
    const master = allMasters[Math.floor(Math.random() * allMasters.length)];
    const service = allServices[Math.floor(Math.random() * allServices.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const date = new Date(today);
    date.setDate(date.getDate() + Math.floor(Math.random() * 14) + 1);
    const hour = 10 + Math.floor(Math.random() * 10);
    const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    date.setHours(hour, minute, 0, 0);

    const end = new Date(date);
    end.setMinutes(end.getMinutes() + service.duration);

    testBookings.push({
      clientName: clientNames[Math.floor(Math.random() * clientNames.length)],
      clientPhone: `+7 9${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(10 + Math.random() * 90)}`,
      clientEmail: Math.random() > 0.3 ? `client${i}@example.com` : undefined,
      startTime: date,
      endTime: end,
      masterId: master.id,
      serviceId: service.id,
      status: status,
      notes: Math.random() > 0.7 ? 'Просьба позвонить за час до записи' : undefined,
    });
  }

  if (testBookings.length > 0) {
    await prisma.booking.createMany({
      data: testBookings,
    });
    console.log(`✅ Добавлено тестовых записей: ${testBookings.length}`);
  }

  console.log('');
  console.log('🎉 База данных успешно заполнена!');
  console.log(`📊 Итог:`);
  console.log(`   👨‍💼 Мастеров: ${masters.count}`);
  console.log(`   💇 Услуг: ${services.count}`);
  console.log(`   📋 Записей: ${testBookings.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });