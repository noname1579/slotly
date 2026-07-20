// app/api/telegram/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await sendTelegramNotification(body);
    return NextResponse.json({ 
      success: true, 
      message: 'Уведомление отправлено' 
    });
  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json(
      { error: 'Ошибка отправки уведомления' },
      { status: 500 }
    );
  }
}