import { X } from '@icons';
import type { ServiceConfig } from '@shared/config';

interface ServiceChipProps {
  readonly service: ServiceConfig;
  readonly onRemove: (id: string) => void;
}

export function ServiceChip({ service, onRemove }: ServiceChipProps) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-bone border border-hairline rounded-full px-3 py-1">
      <span className="font-mono text-[13px] text-volt font-bold">{service.guard}</span>
      <span className="font-body text-[13px] text-ink">{service.name}</span>
      <button
        type="button"
        aria-label={`Remove ${service.name}`}
        onClick={() => onRemove(service.id)}
        className="text-steel hover:text-ink transition-colors duration-100 ml-0.5"
      >
        <X size={12} aria-hidden="true" />
      </button>
    </div>
  );
}
