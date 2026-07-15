export interface DayOption {
  readonly date: Date;
  readonly label: string;
}

export function getNextDays(count: number = 7): DayOption[] {
  const days: DayOption[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    let label: string;
    if (i === 0) {
      label = 'Today';
    } else if (i === 1) {
      label = 'Tomorrow';
    } else {
      label = date.toLocaleDateString('en-NG', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });
    }

    days.push({ date, label });
  }

  return days;
}
