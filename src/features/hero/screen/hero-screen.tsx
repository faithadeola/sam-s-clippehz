import { useEffect, useState } from 'react';
import { TrustStrip } from './parts/trust-strip';
import { HeroCtas } from './parts/hero-ctas';
import { OpenBadge } from './parts/open-badge';
import { useInView } from '@shared/hooks/use-in-view';
import { useCountUp } from '@shared/hooks/use-count-up';

function StatItem({ num, suffix = '', label, active }: {
  readonly num: number;
  readonly suffix?: string;
  readonly label: string;
  readonly active: boolean;
}) {
  const count = useCountUp(num, 1600, active);
  return (
    <div className="flex flex-col gap-1 px-6 first:pl-0 last:pr-0">
      <span className="font-mono font-bold text-[32px] text-volt leading-none tabular-nums">
        {count}{suffix}
      </span>
      <span className="font-body text-[13px] text-steel uppercase tracking-wider">{label}</span>
    </div>
  );
}

export function HeroScreen() {
  const [mounted, setMounted] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative bg-paper overflow-hidden">

      {/* Volt top rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-volt" aria-hidden="true" />

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025] pointer-events-none select-none"
        style={{
          backgroundImage: 'linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Giant decorative S */}
      <div
        aria-hidden="true"
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-display font-extrabold leading-none text-volt select-none pointer-events-none transition-opacity duration-1000"
        style={{
          fontSize: 'clamp(300px, 38vw, 560px)',
          opacity: mounted ? 0.04 : 0,
        }}
      >
        S
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-36 pb-20 w-full">

        {/* Trust strip */}
        <div
          className="mb-8 transition-all duration-500"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)' }}
        >
          <TrustStrip />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">

          {/* Left — headline */}
          <div className="flex flex-col gap-8">
            <h1 className="font-display font-extrabold text-ink leading-[0.92] tracking-tight">
              {(['Ibadan\'s', 'finest', 'cut.'] as const).map((line, i) => (
                <span
                  key={line}
                  className="block transition-all duration-700"
                  style={{
                    fontSize: 'clamp(52px, 7.5vw, 104px)',
                    color: line === 'finest' ? 'var(--volt)' : 'var(--ink)',
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(28px)',
                    transitionDelay: `${100 + i * 120}ms`,
                  }}
                >
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="font-display font-bold tracking-tight text-ink/80 transition-all duration-700"
              style={{
                fontSize: 'clamp(20px, 2.5vw, 26px)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '460ms',
              }}
            >
              Every cut, a signature.
            </p>

            <p
              className="font-body text-[17px] text-steel leading-relaxed max-w-md transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: '560ms',
              }}
            >
              Owner-operated barbershop on Orisunbare Street, Ibadan.
              Walk in or book ahead on WhatsApp — every cut done right.
              Clippers and hair products available in-store too.
            </p>

            <div
              className="transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: '660ms',
              }}
            >
              <HeroCtas />
            </div>
          </div>

          {/* Right — info card */}
          <div
            className="flex flex-col gap-3 lg:pt-4 transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: '300ms',
            }}
          >
            <div className="bg-bone rounded-[12px] border border-hairline overflow-hidden divide-y divide-hairline">
              {[
                { label: 'Location', value: 'Orisunbare St, Ibadan' },
                { label: 'Hours', value: 'Mon–Sat 8 am – 10 pm · Sun 1–10 pm' },
                { label: 'Booking', value: 'WhatsApp only' },
                { label: 'Also sells', value: 'Clippers · Hair products' },
              ].map(({ label, value }) => (
                <div key={label} className="px-5 py-4 flex flex-col gap-0.5 hover:bg-volt-soft transition-colors duration-150">
                  <span className="font-mono text-[11px] text-volt uppercase tracking-widest">{label}</span>
                  <span className="font-body text-[14px] text-ink">{value}</span>
                </div>
              ))}
            </div>
            <div className="px-1">
              <OpenBadge />
            </div>
          </div>

        </div>

        {/* Stat row with count-up */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className="mt-16 pt-8 border-t border-hairline grid grid-cols-2 sm:grid-cols-4 gap-y-8 divide-x divide-hairline"
        >
          <StatItem num={10}  suffix="+" label="Years running" active={statsInView} />
          <StatItem num={8}   suffix=""  label="Services"      active={statsInView} />
          <StatItem num={5}   suffix=""  label="Products sold" active={statsInView} />
          <StatItem num={10}  suffix="pm" label="Open till"    active={statsInView} />
        </div>

      </div>
    </section>
  );
}
