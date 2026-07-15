import { Repeat } from 'meemaw';
import { cn } from '@shared/utils/cn';
import { getNextDays, type DayOption } from '@shared/helpers/get-next-days';

interface DayPickerProps {
  readonly selected: Date | null;
  readonly onSelect: (date: Date) => void;
}

export function DayPicker({ selected, onSelect }: DayPickerProps) {
  const days = getNextDays(7);

  function isSameDay(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function isSelected(day: DayOption): boolean {
    return selected !== null && isSameDay(selected, day.date);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[13px] text-steel uppercase tracking-wider">Day</span>
      <div className="flex gap-2 flex-wrap">
        <Repeat each={days}>
          {(day) => (
            <button
              key={day.label}
              type="button"
              onClick={() => onSelect(day.date)}
              className={cn(
                'font-body text-[13px] px-3 py-1.5 rounded-[6px] border transition-colors duration-100',
                isSelected(day)
                  ? 'bg-volt border-volt text-white'
                  : 'bg-paper border-hairline text-ink hover:border-steel',
              )}
            >
              {day.label}
            </button>
          )}
        </Repeat>
      </div>
    </div>
  );
}
