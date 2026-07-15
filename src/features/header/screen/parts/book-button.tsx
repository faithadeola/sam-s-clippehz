import { MessageCircle } from '@icons';
import { CONFIG } from '@shared/config';

export function BookButton() {
  const url = `https://wa.me/${CONFIG.contact.whatsapp}`;

  return (
    <>
      {/* Desktop: full label */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-flex items-center gap-2 bg-volt hover:bg-volt-ink text-white font-body font-semibold text-[15px] px-5 py-2.5 rounded-[6px] transition-colors duration-150"
      >
        <MessageCircle size={16} aria-hidden="true" />
        Book on WhatsApp
      </a>

      {/* Mobile: icon only */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book on WhatsApp"
        className="sm:hidden inline-flex items-center justify-center bg-volt hover:bg-volt-ink text-white w-10 h-10 rounded-[6px] transition-colors duration-150"
      >
        <MessageCircle size={20} aria-hidden="true" />
      </a>
    </>
  );
}
