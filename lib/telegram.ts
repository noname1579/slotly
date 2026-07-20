// lib/telegram.ts
import axios from 'axios';

// Твои данные из .env.local
const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '8929189763:AAEdSiNJi2glhDHOsumXIWQIRoPcbiUR7Rw';
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '1267233972';

interface BookingData {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  service: string;
  master: string;
  date: string;
  time: string;
  notes?: string;
}

export async function sendTelegramNotification(booking: BookingData) {
  const message = `
📋 *НОВАЯ ЗАПИСЬ!*

👤 *Клиент:* ${booking.clientName}
📞 *Телефон:* ${booking.clientPhone}
📧 *Email:* ${booking.clientEmail || 'не указан'}

💇 *Услуга:* ${booking.service}
👨‍💼 *Мастер:* ${booking.master}
📅 *Дата:* ${booking.date}
🕐 *Время:* ${booking.time}

${booking.notes ? `📝 *Примечания:* ${booking.notes}` : ''}

---
🕐 Запись создана: ${new Date().toLocaleString('ru-RU')}
  `;

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    });
    console.log('✅ Уведомление в Telegram отправлено');
  } catch (error) {
    console.error('❌ Ошибка отправки в Telegram:', error);
  }
}