import { useEffect, useState } from 'react';
import { HeroCtas } from './parts/hero-ctas';
import { OpenBadge } from './parts/open-badge';
import { useInView } from '@shared/hooks/use-in-view';
import { useCountUp } from '@shared/hooks/use-count-up';

function StatItem({ num, suffix = '', label, active, delayMs }: {
  readonly num: number;
  readonly suffix?: string;
  readonly label: string;
  readonly active: boolean;
  readonly delayMs: number;
}) {
  const count = useCountUp(num, 1800, active);
  return (
    <div
      className="flex flex-col gap-1 transition-all duration-700"
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <span className="font-mono font-bold text-[clamp(26px,3vw,44px)] text-volt leading-none tabular-nums">
        {count}{suffix}
      </span>
      <span className="font-body text-[11px] text-white/40 uppercase tracking-[0.15em]">{label}</span>
    </div>
  );
}

export function HeroScreen() {
  const [mounted, setMounted] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  function anim(delay: number): React.CSSProperties {
    return {
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    };
  }

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">

      {/* ── Full-bleed background photo ── */}
      <div className="absolute inset-0">
        <img
          src="/images/shop/hero.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Dark ink overlay — heavier at top and bottom, lighter in middle so photo shows */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(26,15,15,0.82) 0%, rgba(26,15,15,0.55) 40%, rgba(26,15,15,0.65) 70%, rgba(26,15,15,0.95) 100%)',
          }}
        />
        {/* Burgundy tint wash */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: 'rgba(124,45,62,0.18)' }}
        />
      </div>

      {/* Fallback bg when no photo */}
      <div className="absolute inset-0 -z-10 bg-ink" />

      {/* ── Left volt bar ── */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-volt"
        style={{
          transform: mounted ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'transform 1s cubic-bezier(0.22,1,0.36,1) 100ms',
        }}
      />

      {/* ── Giant S watermark ── */}
      <div
        aria-hidden="true"
        className="absolute right-[-4%] bottom-[-8%] font-display font-extrabold leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(280px,42vw,620px)',
          color: 'var(--volt)',
          opacity: mounted ? 0.07 : 0,
          transition: 'opacity 1.6s ease 300ms',
          lineHeight: 1,
        }}
      >
        S
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 sm:px-10 pt-28 pb-10">

        {/* Open badge */}
        <div style={anim(0)} className="mb-8 sm:mb-10">
          <OpenBadge />
        </div>

        {/* Headline block */}
        <div className="flex flex-col gap-5 max-w-3xl">

          {/* Eyebrow */}
          <div style={anim(80)} className="flex items-center gap-3">
            <div className="w-8 h-[2px] bg-volt shrink-0" />
            <span className="font-mono text-[11px] text-volt uppercase tracking-[0.22em]">
              Sam's Clipperhz · Since 2015 · Ibadan
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-display font-extrabold leading-[0.88] tracking-tight">
            {[
              { text: "Ibadan's", color: 'text-white'  },
              { text: 'finest',   color: 'text-volt'   },
              { text: 'cut.',     color: 'text-white'  },
            ].map(({ text, color }, i) => (
              <span
                key={text}
                className={`block ${color}`}
                style={{
                  fontSize: 'clamp(56px, 9.5vw, 130px)',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(36px)',
                  transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${140 + i * 130}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${140 + i * 130}ms`,
                }}
              >
                {text}
              </span>
            ))}
          </h1>

          {/* Tagline */}
          <p
            className="font-display font-semibold text-white/60 tracking-tight"
            style={{ fontSize: 'clamp(17px, 2vw, 22px)', ...anim(530) }}
          >
            Every cut, a signature.
          </p>

          {/* Body — hidden on small mobile, shown from sm up */}
          <p
            className="hidden sm:block font-body text-[16px] text-white/40 leading-relaxed max-w-md"
            style={anim(620)}
          >
            Owner-operated on Orisunbare Street. Sam handles every cut himself — walk in or book ahead on WhatsApp.
          </p>

          {/* CTAs */}
          <div style={anim(700)} className="mt-2">
            <HeroCtas />
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className="mt-14 sm:mt-20 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10"
        >
          <StatItem num={10}  suffix="+" label="Years running" active={statsInView} delayMs={0}   />
          <StatItem num={8}   suffix=""  label="Services"      active={statsInView} delayMs={100} />
          <StatItem num={5}   suffix=""  label="Products"      active={statsInView} delayMs={200} />
          <StatItem num={10}  suffix="pm" label="Open till"    active={statsInView} delayMs={300} />
        </div>

      </div>
    </section>
  );
}
