import { MapPin } from '@icons';
import { CONFIG } from '@shared/config';
import { OpenBadge } from '../../hero/screen/parts/open-badge';
import { HoursTable } from './parts/hours-table';
import { ContactLinks } from './parts/contact-links';

export function VisitScreen() {
  return (
    <section id="visit" className="py-20 px-4 sm:px-6 border-t border-hairline">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left — heading + badge + directions */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="font-display font-extrabold text-ink text-[clamp(28px,4vw,40px)] leading-tight tracking-tight">
              Find us
            </h2>
            <OpenBadge />
          </div>

          <a
            href={CONFIG.contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-volt hover:bg-volt-ink text-white font-body font-semibold text-[15px] px-5 py-3 rounded-[6px] transition-colors duration-150 self-start"
          >
            <MapPin size={16} aria-hidden="true" />
            Get directions
          </a>

          <ContactLinks />
        </div>

        {/* Right — hours */}
        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-[13px] text-steel uppercase tracking-wider">
            Opening hours
          </h3>
          <HoursTable />
          <p className="font-body text-[13px] text-steel">
            {CONFIG.contact.address}
          </p>
        </div>

      </div>
    </section>
  );
}
