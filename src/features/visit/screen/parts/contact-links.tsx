import { Show } from 'meemaw';
import { Phone, MessageCircle, MapPin } from '@icons';
import { FacebookIcon, InstagramIcon, TikTokIcon } from '@ui/icons/social-icons';
import { CONFIG } from '@shared/config';

export function ContactLinks() {
  return (
    <div className="flex flex-col gap-3">
      <a
        href={CONFIG.contact.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-body text-[15px] text-ink hover:text-volt transition-colors duration-150"
      >
        <MapPin size={16} className="text-volt shrink-0" aria-hidden="true" />
        {CONFIG.contact.address}
      </a>

      <a
        href={`tel:${CONFIG.contact.phone.replace(/\s/g, '')}`}
        className="inline-flex items-center gap-2 font-body text-[15px] text-ink hover:text-volt transition-colors duration-150"
      >
        <Phone size={16} className="text-volt shrink-0" aria-hidden="true" />
        {CONFIG.contact.phone}
      </a>

      <a
        href={`https://wa.me/${CONFIG.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-body text-[15px] text-ink hover:text-volt transition-colors duration-150"
      >
        <MessageCircle size={16} className="text-volt shrink-0" aria-hidden="true" />
        WhatsApp
      </a>

      <a
        href={CONFIG.contact.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-body text-[15px] text-ink hover:text-volt transition-colors duration-150"
      >
        <FacebookIcon size={16} className="text-volt shrink-0" aria-hidden="true" />
        Facebook
      </a>

      <Show when={CONFIG.contact.instagram !== ''}>
        <a
          href={`https://instagram.com/${CONFIG.contact.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-[15px] text-ink hover:text-volt transition-colors duration-150"
        >
          <InstagramIcon size={16} className="text-volt shrink-0" aria-hidden="true" />
          Instagram
        </a>
      </Show>

      <Show when={CONFIG.contact.tiktok !== ''}>
        <a
          href={`https://tiktok.com/@${CONFIG.contact.tiktok}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-[15px] text-ink hover:text-volt transition-colors duration-150"
        >
          <TikTokIcon size={16} className="text-volt shrink-0" aria-hidden="true" />
          TikTok
        </a>
      </Show>
    </div>
  );
}
