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
      <span className="font-mono font-bold text-[clamp(28px,3.5vw,48px)] text-volt leading-none tabular-nums">
        {count}{suffix}
      </span>
      <span className="font-body text-[12px] text-white/40 uppercase tracking-[0.15em]">{label}</span>
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
      transform: mounted ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    };
  }

  return (
    <section className="relative min-h-screen bg-ink overflow-hidden flex flex-col">

      {/* ── Textured noise overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />

      {/* ── Volt accent — left vertical bar ── */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-volt transition-all duration-1000"
        style={{ transform: mounted ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'top' }}
      />

      {/* ── Giant barber pole diagonal stripe ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          className="absolute"
          style={{
            width: '120%',
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, var(--volt) 40%, transparent 100%)',
            top: '28%',
            left: '-10%',
            transform: 'rotate(-8deg)',
            opacity: 0.12,
          }}
        />
        <div
          className="absolute"
          style={{
            width: '120%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, var(--volt) 40%, transparent 100%)',
            top: '32%',
            left: '-10%',
            transform: 'rotate(-8deg)',
            opacity: 0.06,
          }}
        />
      </div>

      {/* ── Giant S watermark ── */}
      <div
        aria-hidden="true"
        className="absolute right-[-5%] bottom-[-5%] font-display font-extrabold leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(320px, 45vw, 640px)',
          color: 'var(--volt)',
          opacity: mounted ? 0.045 : 0,
          transition: 'opacity 1.4s ease',
          lineHeight: 1,
        }}
      >
        S
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 sm:px-10 pt-28 pb-16">

        {/* Open badge */}
        <div style={anim(0)} className="mb-10">
          <OpenBadge />
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center">

          {/* Left — headline */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow */}
            <div style={anim(80)} className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-volt" />
              <span className="font-mono text-[11px] text-volt uppercase tracking-[0.25em]">
                Sam's Clipperhz · Since 2015 · Ibadan
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-display font-extrabold leading-[0.88] tracking-tight">
              {[
                { text: "Ibadan's", color: 'text-white' },
                { text: 'finest',   color: 'text-volt'  },
                { text: 'cut.',     color: 'text-white' },
              ].map(({ text, color }, i) => (
                <span
                  key={text}
                  className={`block ${color}`}
                  style={{
                    fontSize: 'clamp(60px, 9vw, 128px)',
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0) skewX(0deg)' : 'translateY(40px) skewX(-2deg)',
                    transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${120 + i * 140}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${120 + i * 140}ms`,
                  }}
                >
                  {text}
                </span>
              ))}
            </h1>

            {/* Tagline */}
            <p
              className="font-display font-semibold text-white/50 tracking-tight"
              style={{
                fontSize: 'clamp(18px, 2.2vw, 24px)',
                ...anim(520),
              }}
            >
              Every cut, a signature.
            </p>

            {/* Body */}
            <p
              className="font-body text-[16px] text-white/40 leading-relaxed max-w-sm"
              style={anim(620)}
            >
              Owner-operated on Orisunbare Street. Sam handles every cut himself — walk in or book ahead on WhatsApp.
            </p>

            {/* CTAs */}
            <div style={anim(720)}>
              <HeroCtas />
            </div>
          </div>

          {/* Right — photo frame */}
          <div
            className="hidden lg:block"
            style={anim(300)}
          >
            <div className="relative">
              {/* Photo container */}
              <div
                className="relative rounded-[4px] overflow-hidden bg-white/5 border border-white/10"
                style={{ aspectRatio: '3/4' }}
              >
                {/* Real photo goes here — /images/shop/hero.jpg */}
                <img
                  src="/images/shop/hero.jpg"
                  alt="Sam's Clipperhz — barber at work"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />

                {/* Placeholder when no photo */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-[2px] bg-volt/40" />
                  <span className="font-mono text-[11px] text-white/20 uppercase tracking-widest">
                    Add hero.jpg to<br />public/images/shop/
                  </span>
                </div>

                {/* Dark gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />

                {/* Floating badge on photo */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-volt uppercase tracking-widest">Owner</span>
                    <span className="font-display font-bold text-[18px] text-white">Sam</span>
                  </div>
                  <div className="bg-volt/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="font-mono text-[10px] text-white uppercase tracking-widest">10+ years</span>
                  </div>
                </div>
              </div>

              {/* Volt accent frame offset */}
              <div
                className="absolute -bottom-3 -right-3 -z-10 rounded-[4px] bg-volt/20"
                style={{ inset: 'auto -12px -12px auto', width: '85%', height: '85%' }}
                aria-hidden="true"
              />
            </div>
          </div>

        </div>

        {/* ── Stats bar ── */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          <StatItem num={10}  suffix="+" label="Years running" active={statsInView} delayMs={0}   />
          <StatItem num={8}   suffix=""  label="Services"      active={statsInView} delayMs={100} />
          <StatItem num={5}   suffix=""  label="Products"      active={statsInView} delayMs={200} />
          <StatItem num={10}  suffix="pm" label="Open till"    active={statsInView} delayMs={300} />
        </div>

      </div>

      {/* ── Bottom fade into bone ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bone), transparent)' }}
        aria-hidden="true"
      />
    </section>
  );
}
