import { Check } from '@icons';
import { cn } from '@shared/utils/cn';
import type { ServiceConfig } from '@shared/config';

interface CutCardProps {
  readonly service: ServiceConfig;
  readonly selected: boolean;
  readonly onToggle: (service: ServiceConfig) => void;
}

export function CutCard({ service, selected, onToggle }: CutCardProps) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(service);
    }
  }

  return (
    <div
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onClick={() => onToggle(service)}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative group cursor-pointer rounded-[10px] overflow-hidden transition-all duration-200 border',
        'focus-visible:outline-2 focus-visible:outline-volt focus-visible:outline-offset-2',
        selected
          ? 'bg-volt-soft border-volt shadow-[0_0_0_2px_var(--volt)]'
          : 'bg-paper border-hairline hover:border-volt/40 hover:shadow-[0_4px_20px_rgba(21,82,240,0.08)]',
      )}
    >
      {/* Guard watermark */}
      <div
        aria-hidden="true"
        className="absolute top-3 right-4 font-mono font-bold text-[80px] leading-none text-volt opacity-[0.06] select-none pointer-events-none"
      >
        {service.guard}
      </div>

      {/* Selected check */}
      <div
        className={cn(
          'absolute top-4 right-4 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-150',
          selected
            ? 'bg-volt border-volt'
            : 'bg-white border-hairline group-hover:border-volt/40',
        )}
        aria-hidden="true"
      >
        {selected && <Check size={12} strokeWidth={3} className="text-white" />}
      </div>

      {/* Photo area */}
      <div className="relative aspect-[4/3] bg-bone overflow-hidden">
        <div
          className={cn(
            'absolute top-0 left-0 right-0 h-[2px] z-10 transition-opacity duration-200',
            selected ? 'bg-volt opacity-100' : 'bg-volt opacity-0 group-hover:opacity-60',
          )}
          aria-hidden="true"
        />
        {service.photo != null ? (
          <img
            src={service.photo}
            alt={service.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[12px] text-steel/40">photo</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="relative z-10 p-5 flex flex-col gap-1.5">
        <span className="font-mono font-bold text-[10px] text-volt uppercase tracking-widest">
          Guard {service.guard}
        </span>
        <span className="font-display font-bold text-[18px] text-ink leading-tight">
          {service.name}
        </span>
        <span className="font-body text-[13px] text-steel leading-snug">
          {service.blurb}
        </span>
        <span className="font-mono text-[12px] text-steel/50 mt-1">
          ~{service.mins} min
        </span>
      </div>
    </div>
  );
}
