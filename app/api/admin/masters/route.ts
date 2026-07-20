// app/api/admin/masters/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const masters = await prisma.master.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(masters);
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, specialty, rating, reviews, experience } = await request.json();
    const master = await prisma.master.create({
      data: { name, specialty, rating, reviews, experience },
    });
    return NextResponse.json(master);
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, specialty, rating, reviews, experience } = await request.json();
    const master = await prisma.master.update({
      where: { id },
      data: { name, specialty, rating, reviews, experience },
    });
    return NextResponse.json(master);
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await prisma.master.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}