import type { Config } from '@shared/config';

type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

const DAY_KEYS: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function parseTime(timeStr: string): { h: number; m: number } {
  const parts = timeStr.split(':');
  return {
    h: parseInt(parts[0] ?? '0', 10),
    m: parseInt(parts[1] ?? '0', 10),
  };
}

function toMinutes(h: number, m: number): number {
  return h * 60 + m;
}

export function generateTimeSlots(
  date: Date,
  hours: Config['hours'],
  timezone: string,
): string[] {
  const jsDay = date.getDay();
  const dayKey = DAY_KEYS[jsDay];
  if (dayKey === undefined) return [];

  const dayHours = hours[dayKey];
  if (dayHours === null) return [];

  const openTime = parseTime(dayHours[0]);
  const closeTime = parseTime(dayHours[1]);

  const openMinutes = toMinutes(openTime.h, openTime.m);
  const closeMinutes = toMinutes(closeTime.h, closeTime.m);

  // Determine current time cutoff for today
  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  let currentMinutesInTz = 0;
  if (isToday) {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const h = parseInt(parts.find(p => p.type === 'hour')?.value ?? '0', 10);
    const m = parseInt(parts.find(p => p.type === 'minute')?.value ?? '0', 10);
    currentMinutesInTz = toMinutes(h, m);
  }

  const slots: string[] = [];
  for (let minutes = openMinutes; minutes < closeMinutes; minutes += 30) {
    if (isToday && minutes <= currentMinutesInTz) continue;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  }

  return slots;
}

export function formatSlotDisplay(slot: string): string {
  const parts = slot.split(':');
  const h = parseInt(parts[0] ?? '0', 10);
  const m = parseInt(parts[1] ?? '0', 10);
  const period = h < 12 ? 'AM' : 'PM';
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const displayM = m === 0 ? '' : `:${String(m).padStart(2, '0')}`;
  return `${displayH}${displayM} ${period}`;
}
