import { Repeat } from 'meemaw';
import { CONFIG } from '@shared/config';
import { useBookingContext } from '@shared/providers/booking-provider';
import { useInView } from '@shared/hooks/use-in-view';
import { cn } from '@shared/utils/cn';
import { CutCard } from './parts/cut-card';
import type { ServiceConfig } from '@shared/config';

export function CatalogueScreen() {
  const { selectedServices, toggleService } = useBookingContext();
  const { ref, inView } = useInView();

  function handleToggle(service: ServiceConfig) {
    toggleService(service);
  }

  return (
    <section id="catalogue" className="py-24 px-4 sm:px-6 bg-bone border-t border-hairline">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto"
      >

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className={cn('flex flex-col gap-3 transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            <div className="w-12 h-[3px] bg-volt" aria-hidden="true" />
            <h2 className="font-display font-extrabold text-ink text-[clamp(36px,5vw,56px)] leading-[0.95] tracking-tight">
              The cuts.
            </h2>
          </div>
          <p className={cn('font-body text-[15px] text-steel max-w-xs transition-all duration-700 delay-100', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
            Tap any cut to add it to your booking. Pick as many as you need.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Repeat each={CONFIG.services} key="id">
            {(service, i) => (
              <div
                key={service.id}
                className={cn('transition-all duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}
                style={{ transitionDelay: inView ? `${i * 60}ms` : '0ms' }}
              >
                <CutCard
                  service={service}
                  selected={selectedServices.some(s => s.id === service.id)}
                  onToggle={handleToggle}
                />
              </div>
            )}
          </Repeat>
        </div>

        {/* Bottom hint */}
        <p className={cn('font-mono text-[13px] text-steel/60 mt-8 text-center uppercase tracking-widest transition-all duration-700 delay-500', inView ? 'opacity-100' : 'opacity-0')}>
          Select a cut · pick a time · send on WhatsApp
        </p>

      </div>
    </section>
  );
}
