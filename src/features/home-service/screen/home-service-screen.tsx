import { ArrowRight } from '@icons';
import { CONFIG } from '@shared/config';
import { useBookingContext } from '@shared/providers/booking-provider';
import { useInView } from '@shared/hooks/use-in-view';
import { cn } from '@shared/utils/cn';

export function HomeServiceScreen() {
  const { setIsHomeService } = useBookingContext();
  const { ref, inView } = useInView();

  function handleCta() {
    setIsHomeService(true);
    const catalogue = document.getElementById('catalogue');
    if (catalogue !== null) {
      catalogue.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section id="home-service" className="py-24 px-4 sm:px-6 bg-paper border-t border-hairline">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >

        {/* Left */}
        <div className={cn('flex flex-col gap-8 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
          <div className="w-12 h-[3px] bg-volt" aria-hidden="true" />

          <h2 className="font-display font-extrabold text-ink text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-tight">
            We come<br />
            <span className="text-volt">to you.</span>
          </h2>

          <p className="font-body text-[17px] text-steel leading-relaxed max-w-sm">
            Can't make it to Orisunbare Street? Sam brings the shop to your door.
            {CONFIG.homeService.radiusNote !== '' && (
              <> {CONFIG.homeService.radiusNote}</>
            )}{' '}
            Fee quoted on WhatsApp.
          </p>

          <button
            type="button"
            onClick={handleCta}
            className="inline-flex items-center gap-2 bg-volt hover:bg-volt-ink text-white font-body font-semibold text-[17px] px-6 py-4 rounded-[6px] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] self-start"
          >
            Book home service
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Right — stat cards */}
        <div className={cn('grid grid-cols-1 gap-0 bg-bone rounded-[12px] border border-hairline overflow-hidden divide-y divide-hairline transition-all duration-700 delay-200', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
          {[
            { label: 'Coverage', value: CONFIG.homeService.radiusNote || 'Within Ibadan' },
            { label: 'Fee', value: 'Quoted on WhatsApp' },
            { label: 'How to book', value: 'Select your cut · toggle "Come to me" · send' },
          ].map(({ label, value }) => (
            <div key={label} className="px-6 py-5 flex flex-col gap-1 group hover:bg-volt-soft transition-colors duration-150">
              <span className="font-mono text-[11px] text-volt uppercase tracking-widest">{label}</span>
              <span className="font-body text-[15px] text-ink">{value}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
