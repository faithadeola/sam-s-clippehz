const WORDS = [
  'Sharp', 'Clean', 'Precise', 'Ibadan', 'Since 2015',
  'Skin Fade', 'Low Cut', 'Taper', 'Fresh', 'Signature',
  'Sharp', 'Clean', 'Precise', 'Ibadan', 'Since 2015',
  'Skin Fade', 'Low Cut', 'Taper', 'Fresh', 'Signature',
];

export function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden bg-volt py-3 select-none" aria-hidden="true">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-volt to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-volt to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex gap-0 whitespace-nowrap w-max">
        {WORDS.map((word, i) => (
          <span key={i} className="font-mono font-bold text-[12px] text-white/90 uppercase tracking-[0.2em] px-6">
            {word}
            <span className="ml-6 text-white/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
