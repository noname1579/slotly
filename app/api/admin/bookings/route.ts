// app/api/admin/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { master: true, service: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { clientName, clientPhone, clientEmail, startTime, masterId, serviceId, notes } = await request.json();
    
    // Вычисляем endTime (startTime + длительность услуги)
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      return NextResponse.json({ error: 'Услуга не найдена' }, { status: 404 });
    }

    const start = new Date(startTime);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + service.duration);

    const booking = await prisma.booking.create({
      data: {
        clientName,
        clientPhone,
        clientEmail,
        startTime: start,
        endTime: end,
        masterId,
        serviceId,
        notes,
        status: 'PENDING',
      },
      include: {
        master: true,
        service: true,
      },
    });

    // Отправка уведомления в Telegram (если настроено)
    try {
      const { sendTelegramNotification } = await import('@/lib/telegram');
      await sendTelegramNotification({
        clientName,
        clientPhone,
        clientEmail,
        service: service.name,
        master: booking.master?.name || 'Неизвестно',
        date: start.toLocaleDateString('ru-RU'),
        time: start.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        notes,
      });
    } catch {
      // Игнорируем ошибки Telegram
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ошибка создания записи' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: { master: true, service: true },
    });
    return NextResponse.json(booking);
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await prisma.booking.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}