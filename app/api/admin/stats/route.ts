// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [total, pending, confirmed, completed, cancelled, masters, services] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.booking.count({ where: { status: 'CONFIRMED' } }),
      prisma.booking.count({ where: { status: 'COMPLETED' } }),
      prisma.booking.count({ where: { status: 'CANCELLED' } }),
      prisma.master.count(),
      prisma.service.count(),
    ]);

    const completedBookings = await prisma.booking.findMany({
      where: { status: 'COMPLETED' },
      include: { service: true },
    });
    const revenue = completedBookings.reduce((sum, b) => sum + (b.service?.price || 0), 0);

    const mastersWithBookings = await prisma.master.findMany({
      include: {
        bookings: { where: { status: { in: ['PENDING', 'CONFIRMED'] } } },
      },
    });
    const masterLoad = mastersWithBookings.map((m) => ({
      name: m.name,
      bookings: m.bookings.length,
    }));

    return NextResponse.json({
      total,
      pending,
      confirmed,
      completed,
      cancelled,
      revenue,
      masters,
      services,
      masterLoad,
    });
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}