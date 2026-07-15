import { CONFIG } from '@shared/config';

interface ReminderParams {
  readonly name: string;
  readonly phone: string;
  readonly lastCut: string;
  readonly intervalWeeks: number;
}

export function buildReminderUrl(params: ReminderParams): string {
  const { name, phone, lastCut, intervalWeeks } = params;

  const lines: string[] = [
    `Hi Sam's Clipperhz – add me to touch-up reminders.`,
    `Name: ${name.trim()}`,
    `Number: ${phone.trim()}`,
    `Last cut: ${lastCut}`,
    `Remind me every: ${intervalWeeks} week${intervalWeeks === 1 ? '' : 's'}`,
  ];

  const message = lines.join('\n');
  return `https://wa.me/${CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
