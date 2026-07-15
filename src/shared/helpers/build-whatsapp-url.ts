import type { ServiceConfig } from '@shared/config';

interface BookingMessageParams {
  readonly whatsappNumber: string;
  readonly services: readonly ServiceConfig[];
  readonly day: Date;
  readonly time: string;
  readonly isHomeService: boolean;
  readonly homeAddress: string;
  readonly name: string;
}

function formatDay(date: Date): string {
  return date.toLocaleDateString('en-NG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Africa/Lagos',
  });
}

function formatTime(time: string): string {
  const [hourStr, minuteStr] = time.split(':');
  const h = parseInt(hourStr ?? '0', 10);
  const m = parseInt(minuteStr ?? '0', 10);
  const period = h < 12 ? 'AM' : 'PM';
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const displayM = m === 0 ? '' : `:${String(m).padStart(2, '0')}`;
  return `${displayH}${displayM} ${period}`;
}

export function buildWhatsAppUrl(params: BookingMessageParams): string {
  const { whatsappNumber, services, day, time, isHomeService, homeAddress, name } = params;

  const serviceLines = services
    .map(s => `• ${s.name} (Guard ${s.guard})`)
    .join('\n');

  const lines: string[] = [
    `Hello Sam's Clipperhz 👋`,
    '',
    `I'd like to book:`,
    serviceLines,
    '',
    `Day: ${formatDay(day)}`,
    `Time: ${formatTime(time)}`,
  ];

  if (isHomeService && homeAddress.trim() !== '') {
    lines.push(`Where: Home service – ${homeAddress.trim()}`);
  }

  if (name.trim() !== '') {
    lines.push(`Name: ${name.trim()}`);
  }

  lines.push('');
  lines.push('Please confirm the time and the price.');
  lines.push('');
  lines.push('Sent from samsclipperhz.com');

  const message = lines.join('\n');
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
