import { useOpenStatus } from '../../helpers/use-open-status';

export function OpenBadge() {
  const status = useOpenStatus();

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[13px] text-white/40 uppercase tracking-widest">
      <span
        className={[
          'w-1.5 h-1.5 rounded-full',
          status.open ? 'bg-[#22c55e]' : 'bg-white/20',
        ].join(' ')}
        aria-hidden="true"
      />
      {status.open
        ? `Open · closes ${status.closesAt}`
        : status.opensAt !== null
          ? `Closed · opens ${status.opensAt}`
          : 'Closed'}
    </span>
  );
}
