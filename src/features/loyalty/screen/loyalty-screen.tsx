import { CONFIG } from '@shared/config';
import { useInView } from '@shared/hooks/use-in-view';
import { cn } from '@shared/utils/cn';

const STAMPS = Array.from({ length: CONFIG.loyalty.stampsRequired }, (_, i) => i);

export function LoyaltyScreen() {
  const { ref, inView } = useInView();
  const isFree = (index: number) => index === CONFIG.loyalty.stampsRequired - 1;

  return (
    <section id="loyalty" className="py-24 px-4 sm:px-6 bg-bone border-t border-hairline">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div className={cn('flex flex-col gap-6 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <div className="w-12 h-[3px] bg-volt" aria-hidden="true" />
          <h2 className="font-display font-extrabold text-ink text-[clamp(32px,5vw,52px)] leading-[0.95] tracking-tight">
            Keep coming<br />back.
          </h2>
          <p className="font-body text-[17px] text-steel leading-relaxed max-w-sm">
            {CONFIG.loyalty.reward} Every visit gets you closer. Sam's Clipperhz stamps your card at the shop — no app needed.
          </p>
        </div>

        {/* Right — stamp card */}
        <div className={cn('transition-all duration-700 delay-200', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <div className="bg-paper border border-hairline rounded-[12px] p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-volt uppercase tracking-widest">Loyalty card</span>
              <span className="font-mono text-[11px] text-steel uppercase tracking-widest">Sam's Clipperhz</span>
            </div>

            <div className="flex gap-3 flex-wrap">
              {STAMPS.map((i) => (
                <div
                  key={i}
                  className={cn(
                    'w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono font-bold text-[14px] transition-all duration-300',
                    isFree(i)
                      ? 'border-volt bg-volt text-white shadow-[0_0_16px_rgba(31,77,46,0.3)]'
                      : 'border-hairline bg-bone text-steel',
                  )}
                  aria-label={isFree(i) ? 'Free cut' : `Stamp ${i + 1}`}
                >
                  {isFree(i) ? '✦' : i + 1}
                </div>
              ))}
            </div>

            <p className="font-body text-[13px] text-steel border-t border-hairline pt-4">
              Sam's Clipperhz stamps your physical card at the shop after every cut.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
