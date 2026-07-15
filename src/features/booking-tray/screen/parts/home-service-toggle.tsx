import { Show } from 'meemaw';
import { Home } from '@icons';

interface HomeServiceToggleProps {
  readonly enabled: boolean;
  readonly address: string;
  readonly onToggle: () => void;
  readonly onAddressChange: (value: string) => void;
}

export function HomeServiceToggle({
  enabled,
  address,
  onToggle,
  onAddressChange,
}: HomeServiceToggleProps) {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-3 group"
        aria-pressed={enabled}
      >
        {/* Toggle switch */}
        <span
          className={[
            'relative inline-flex w-10 h-6 rounded-full border-2 transition-colors duration-150',
            enabled ? 'bg-volt border-volt' : 'bg-paper border-hairline',
          ].join(' ')}
          aria-hidden="true"
        >
          <span
            className={[
              'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-150',
              enabled ? 'translate-x-4' : 'translate-x-0',
            ].join(' ')}
          />
        </span>
        <span className="inline-flex items-center gap-1.5 font-body text-[15px] text-ink group-hover:text-volt transition-colors duration-100">
          <Home size={14} aria-hidden="true" />
          Come to me (home service)
        </span>
      </button>

      <Show when={enabled}>
        <div className="flex flex-col gap-2 pl-[52px]">
          <input
            type="text"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="Your address in Ibadan"
            aria-label="Home service address"
            className="w-full font-body text-[15px] text-ink bg-paper border border-hairline rounded-[6px] px-3 py-2.5 placeholder:text-steel focus:outline-none focus:border-volt transition-colors duration-100"
          />
          <p className="font-body text-[13px] text-steel">
            Sam will confirm the home-service fee on WhatsApp.
          </p>
        </div>
      </Show>
    </div>
  );
}
