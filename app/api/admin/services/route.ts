// app/api/admin/services/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(services);
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, duration, price, category, popular } = await request.json();
    const service = await prisma.service.create({
      data: { name, duration, price, category, popular },
    });
    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, duration, price, category, popular } = await request.json();
    const service = await prisma.service.update({
      where: { id },
      data: { name, duration, price, category, popular },
    });
    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}