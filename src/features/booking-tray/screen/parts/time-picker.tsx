import { Repeat } from 'meemaw';
import { Show } from 'meemaw';
import { cn } from '@shared/utils/cn';
import { generateTimeSlots, formatSlotDisplay } from '@shared/helpers/generate-time-slots';
import { CONFIG } from '@shared/config';

interface TimePickerProps {
  readonly selectedDay: Date | null;
  readonly selectedTime: string | null;
  readonly onSelect: (time: string) => void;
}

export function TimePicker({ selectedDay, selectedTime, onSelect }: TimePickerProps) {
  const slots = selectedDay !== null
    ? generateTimeSlots(selectedDay, CONFIG.hours, CONFIG.timezone)
    : [];

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[13px] text-steel uppercase tracking-wider">Time</span>

      <Show when={selectedDay === null}>
        <p className="font-body text-[13px] text-steel">Pick a day first.</p>
      </Show>

      <Show when={selectedDay !== null && slots.length === 0}>
        <p className="font-body text-[13px] text-steel">No slots left today — try tomorrow.</p>
      </Show>

      <Show when={slots.length > 0}>
        <div className="flex gap-2 flex-wrap">
          <Repeat each={slots}>
            {(slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => onSelect(slot)}
                className={cn(
                  'font-mono text-[13px] px-3 py-1.5 rounded-[6px] border transition-colors duration-100',
                  selectedTime === slot
                    ? 'bg-volt border-volt text-white'
                    : 'bg-paper border-hairline text-ink hover:border-steel',
                )}
              >
                {formatSlotDisplay(slot)}
              </button>
            )}
          </Repeat>
        </div>
      </Show>
    </div>
  );
}
