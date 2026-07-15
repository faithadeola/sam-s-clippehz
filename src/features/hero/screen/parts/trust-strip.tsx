import { CONFIG } from '@shared/config';
import { OpenBadge } from './open-badge';

export function TrustStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] text-steel uppercase tracking-widest">
      <span>Since {CONFIG.brand.since}</span>
      <span aria-hidden="true">·</span>
      <span>Orisunbare St, Ibadan</span>
      <span aria-hidden="true">·</span>
      <OpenBadge />
    </div>
  );
}
