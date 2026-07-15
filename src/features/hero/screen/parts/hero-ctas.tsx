import { MessageCircle, ArrowRight } from '@icons';
import { CONFIG } from '@shared/config';

export function HeroCtas() {
  const waUrl = `https://wa.me/${CONFIG.contact.whatsapp}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-volt hover:bg-volt-ink text-white font-body font-semibold text-[17px] px-6 py-4 rounded-[6px] transition-colors duration-150"
      >
        <MessageCircle size={18} aria-hidden="true" />
        Book on WhatsApp
      </a>

      <a
        href="#catalogue"
        className="inline-flex items-center gap-2 text-ink hover:text-volt font-body font-semibold text-[17px] px-6 py-4 rounded-[6px] border border-hairline hover:border-volt transition-colors duration-150"
      >
        See the cuts
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}
