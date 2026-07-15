import type { HoursEntry, Config } from '@shared/config';

export type OpenStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string | null };

type DayKey = keyof HoursEntry;

const DAY_KEYS: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function parseTime(timeStr: string): { h: number; m: number } {
  const parts = timeStr.split(':');
  const h = parseInt(parts[0] ?? '0', 10);
  const m = parseInt(parts[1] ?? '0', 10);
  return { h, m };
}

function toMinutes(h: number, m: number): number {
  return h * 60 + m;
}

function formatDisplay(timeStr: string): string {
  const { h, m } = parseTime(timeStr);
  const period = h < 12 ? 'AM' : 'PM';
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const displayM = m === 0 ? '' : `:${String(m).padStart(2, '0')}`;
  return `${displayH}${displayM} ${period}`;
}

export function getOpenStatus(hours: Config['hours'], timezone: string): OpenStatus {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'short',
  });

  const parts = formatter.formatToParts(now);
  const weekdayPart = parts.find(p => p.type === 'weekday')?.value ?? '';
  const hourPart = parts.find(p => p.type === 'hour')?.value ?? '0';
  const minutePart = parts.find(p => p.type === 'minute')?.value ?? '0';

  const jsDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekdayPart);
  const dayKey = jsDay !== -1 ? DAY_KEYS[jsDay] : 'mon';

  const currentH = parseInt(hourPart, 10);
  const currentM = parseInt(minutePart, 10);
  const currentMinutes = toMinutes(currentH, currentM);

  const todayHours = dayKey !== undefined ? hours[dayKey] : null;

  if (todayHours !== null && todayHours !== undefined) {
    const openMinutes = toMinutes(...(() => { const t = parseTime(todayHours[0]); return [t.h, t.m] as [number, number]; })());
    const closeMinutes = toMinutes(...(() => { const t = parseTime(todayHours[1]); return [t.h, t.m] as [number, number]; })());

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      return { open: true, closesAt: formatDisplay(todayHours[1]) };
    }
  }

  // Find next opening
  for (let offset = 0; offset < 7; offset++) {
    const checkDayIndex = (jsDay + offset) % 7;
    const checkKey = DAY_KEYS[checkDayIndex];
    if (checkKey === undefined) continue;
    const checkHours = hours[checkKey];
    if (checkHours === null) continue;

    const openMinutes = toMinutes(...(() => { const t = parseTime(checkHours[0]); return [t.h, t.m] as [number, number]; })());

    if (offset === 0 && currentMinutes < openMinutes) {
      return { open: false, opensAt: formatDisplay(checkHours[0]) };
    }
    if (offset > 0) {
      return { open: false, opensAt: formatDisplay(checkHours[0]) };
    }
  }

  return { open: false, opensAt: null };
}
