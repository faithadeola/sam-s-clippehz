import { useState } from 'react';
import { Show } from 'meemaw';
import { MessageCircle, AlertCircle } from '@icons';
import { cn } from '@shared/utils/cn';
import { buildReminderUrl } from '../helpers/build-reminder-url';

interface FormErrors {
  readonly name?: string;
  readonly phone?: string;
  readonly lastCut?: string;
}

const INTERVAL_OPTIONS = [2, 3, 4] as const;
type IntervalWeeks = typeof INTERVAL_OPTIONS[number];

export function RemindersScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [lastCut, setLastCut] = useState('');
  const [intervalWeeks, setIntervalWeeks] = useState<IntervalWeeks>(2);
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const errs: Record<string, string> = {};
    if (name.trim() === '') errs['name'] = 'Enter your name.';
    if (phone.trim() === '') errs['phone'] = 'Enter your WhatsApp number.';
    if (lastCut === '') errs['lastCut'] = 'Pick the date of your last cut.';
    return errs;
  }

  function handleSend() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const formatted = new Date(lastCut).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const url = buildReminderUrl({ name, phone, lastCut: formatted, intervalWeeks });
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="reminders" className="py-20 px-4 sm:px-6 border-t border-hairline bg-paper">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">

        <div className="flex flex-col gap-3">
          <h2 className="font-display font-extrabold text-ink text-[clamp(28px,4vw,40px)] leading-tight tracking-tight">
            Stay sharp.
          </h2>
          <p className="font-body text-[17px] text-steel">
            We'll nudge you before the line-up goes soft.
          </p>
        </div>

        <div className="flex flex-col gap-5">

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reminder-name" className="font-mono text-[13px] text-steel uppercase tracking-wider">
              Your name
            </label>
            <input
              id="reminder-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tunde"
              aria-describedby={errors.name !== undefined ? 'reminder-name-error' : undefined}
              aria-invalid={errors.name !== undefined}
              className={cn(
                'font-body text-[15px] text-ink bg-paper border rounded-[6px] px-3 py-2.5 placeholder:text-steel focus:outline-none transition-colors duration-100',
                errors.name !== undefined ? 'border-[#dc2626]' : 'border-hairline focus:border-volt',
              )}
            />
            <Show when={errors.name !== undefined}>
              <p id="reminder-name-error" role="alert" className="inline-flex items-center gap-1 font-body text-[13px] text-[#dc2626]">
                <AlertCircle size={12} aria-hidden="true" />
                {errors.name}
              </p>
            </Show>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reminder-phone" className="font-mono text-[13px] text-steel uppercase tracking-wider">
              WhatsApp number
            </label>
            <input
              id="reminder-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0803 000 0000"
              aria-describedby={errors.phone !== undefined ? 'reminder-phone-error' : undefined}
              aria-invalid={errors.phone !== undefined}
              className={cn(
                'font-body text-[15px] text-ink bg-paper border rounded-[6px] px-3 py-2.5 placeholder:text-steel focus:outline-none transition-colors duration-100',
                errors.phone !== undefined ? 'border-[#dc2626]' : 'border-hairline focus:border-volt',
              )}
            />
            <Show when={errors.phone !== undefined}>
              <p id="reminder-phone-error" role="alert" className="inline-flex items-center gap-1 font-body text-[13px] text-[#dc2626]">
                <AlertCircle size={12} aria-hidden="true" />
                {errors.phone}
              </p>
            </Show>
          </div>

          {/* Last cut date */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reminder-last-cut" className="font-mono text-[13px] text-steel uppercase tracking-wider">
              Date of last cut
            </label>
            <input
              id="reminder-last-cut"
              type="date"
              value={lastCut}
              onChange={(e) => setLastCut(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              aria-describedby={errors.lastCut !== undefined ? 'reminder-last-cut-error' : undefined}
              aria-invalid={errors.lastCut !== undefined}
              className={cn(
                'font-body text-[15px] text-ink bg-paper border rounded-[6px] px-3 py-2.5 focus:outline-none transition-colors duration-100',
                errors.lastCut !== undefined ? 'border-[#dc2626]' : 'border-hairline focus:border-volt',
              )}
            />
            <Show when={errors.lastCut !== undefined}>
              <p id="reminder-last-cut-error" role="alert" className="inline-flex items-center gap-1 font-body text-[13px] text-[#dc2626]">
                <AlertCircle size={12} aria-hidden="true" />
                {errors.lastCut}
              </p>
            </Show>
          </div>

          {/* Interval */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[13px] text-steel uppercase tracking-wider">
              Remind me every
            </span>
            <div className="flex gap-2">
              {INTERVAL_OPTIONS.map((weeks) => (
                <button
                  key={weeks}
                  type="button"
                  onClick={() => setIntervalWeeks(weeks)}
                  className={cn(
                    'font-body text-[15px] px-4 py-2 rounded-[6px] border transition-colors duration-100',
                    intervalWeeks === weeks
                      ? 'bg-volt border-volt text-white'
                      : 'bg-paper border-hairline text-ink hover:border-steel',
                  )}
                >
                  {weeks} weeks
                </button>
              ))}
            </div>
          </div>

          {/* Send */}
          <button
            type="button"
            onClick={handleSend}
            className="inline-flex items-center justify-center gap-2 bg-volt hover:bg-volt-ink text-white font-body font-semibold text-[17px] px-6 py-4 rounded-[6px] transition-colors duration-150"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Sign me up on WhatsApp
          </button>

        </div>
      </div>
    </section>
  );
}
