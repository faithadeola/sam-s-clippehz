import { useState } from 'react';
import { Share2 } from '@icons';
import { CONFIG } from '@shared/config';
import { useInView } from '@shared/hooks/use-in-view';
import { cn } from '@shared/utils/cn';

function generateCode(name: string): string {
  const cleaned = name.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return `SAM-${cleaned.slice(0, 8)}`;
}

export function ReferralScreen() {
  const [name, setName] = useState('');
  const { ref, inView } = useInView();
  const code = name.trim() !== '' ? generateCode(name) : '';

  function handleShare() {
    if (code === '') return;
    const message = `Use my referral code *${code}* when booking at Sam's Clipperhz — ${CONFIG.brand.tagline}\n\nhttps://samsclipperhz.com`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="referral" className="py-24 px-4 sm:px-6 bg-paper border-t border-hairline">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left — copy */}
        <div className={cn('flex flex-col gap-6 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <div className="w-12 h-[3px] bg-volt" aria-hidden="true" />
          <h2 className="font-display font-extrabold text-ink text-[clamp(32px,5vw,52px)] leading-[0.95] tracking-tight">
            Tell a friend.
          </h2>
          <p className="font-body text-[17px] text-steel leading-relaxed max-w-sm">
            {CONFIG.referral.reward} Enter your name, get your code, share it on WhatsApp.
          </p>
        </div>

        {/* Right — form */}
        <div className={cn('flex flex-col gap-5 transition-all duration-700 delay-200', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <div className="flex flex-col gap-2">
            <label htmlFor="referral-name" className="font-mono text-[11px] text-volt uppercase tracking-widest">
              Your name
            </label>
            <input
              id="referral-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tunde"
              className="font-body text-[15px] text-ink bg-paper border border-hairline rounded-[8px] px-4 py-3 placeholder:text-steel/50 focus:outline-none focus:border-volt transition-colors duration-150"
            />
          </div>

          {code !== '' && (
            <div className="bg-volt-soft border border-volt/20 rounded-[8px] px-5 py-4 flex flex-col gap-1">
              <span className="font-mono text-[11px] text-volt uppercase tracking-widest">Your code</span>
              <span className="font-mono font-bold text-[28px] text-volt tracking-widest">{code}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleShare}
            disabled={code === ''}
            aria-disabled={code === ''}
            className={cn(
              'inline-flex items-center justify-center gap-2 font-body font-semibold text-[17px] px-6 py-4 rounded-[8px] transition-all duration-150',
              code !== ''
                ? 'bg-volt hover:bg-volt-ink text-white hover:scale-[1.01] active:scale-[0.99]'
                : 'bg-bone text-steel border border-hairline cursor-not-allowed',
            )}
          >
            <Share2 size={18} aria-hidden="true" />
            Share on WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
}
