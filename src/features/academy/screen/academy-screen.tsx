import { Scissors, MessageCircle } from '@icons';
import { CONFIG } from '@shared/config';
import { useInView } from '@shared/hooks/use-in-view';
import { cn } from '@shared/utils/cn';

export function AcademyScreen() {
  const { ref, inView } = useInView();
  const waUrl = `https://wa.me/${CONFIG.contact.whatsapp}?text=${encodeURIComponent("Hi Sam, I'm interested in learning barbering. Please tell me more about the sessions.")}`;

  return (
    <section id="academy" className="py-24 px-4 sm:px-6 bg-bone border-t border-hairline">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div className={cn('flex flex-col gap-6 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-volt uppercase tracking-widest self-start border border-volt/20 bg-volt-soft px-3 py-1.5 rounded-full">
            <Scissors size={12} aria-hidden="true" />
            Academy
          </div>
          <div className="w-12 h-[3px] bg-volt" aria-hidden="true" />
          <h2 className="font-display font-extrabold text-ink text-[clamp(32px,5vw,52px)] leading-[0.95] tracking-tight">
            Learn the<br />craft.
          </h2>
          <p className="font-body text-[17px] text-steel leading-relaxed max-w-sm">
            {CONFIG.academy.blurb}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-volt hover:bg-volt-ink text-white font-body font-semibold text-[17px] px-6 py-4 rounded-[8px] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] self-start"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Message Sam on WhatsApp
          </a>
        </div>

        {/* Right — what you learn */}
        <div className={cn('transition-all duration-700 delay-200', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <div className="bg-paper border border-hairline rounded-[12px] overflow-hidden divide-y divide-hairline">
            {[
              { num: '01', title: 'Tools & setup', desc: 'Clippers, guards, blades — what every barber needs to know.' },
              { num: '02', title: 'Skin fades & tapers', desc: 'The techniques behind the most requested styles.' },
              { num: '03', title: 'Line-ups & sculpting', desc: 'Edges, beards, and the finishing details that set you apart.' },
              { num: '04', title: 'Running your business', desc: 'Pricing, clients, and building a loyal base.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="px-6 py-5 flex gap-5 items-start hover:bg-volt-soft transition-colors duration-150">
                <span className="font-mono font-bold text-[13px] text-volt mt-0.5 shrink-0">{num}</span>
                <div className="flex flex-col gap-1">
                  <span className="font-display font-bold text-[16px] text-ink">{title}</span>
                  <span className="font-body text-[14px] text-steel">{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
