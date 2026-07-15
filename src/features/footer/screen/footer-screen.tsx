import { Show } from 'meemaw';
import { MessageCircle } from '@icons';
import { FacebookIcon, InstagramIcon, TikTokIcon } from '@ui/icons/social-icons';
import { CONFIG } from '@shared/config';

export function FooterScreen() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

        {/* Wordmark + tagline */}
        <div className="flex flex-col gap-2">
          <span className="font-display font-bold text-[17px] text-ink tracking-tight">
            <span className="text-volt font-mono">✦</span> Sam's Clipperhz
          </span>
          <p className="font-body text-[13px] text-steel">
            {CONFIG.brand.tagline}
          </p>
        </div>

        {/* Socials + copyright */}
        <div className="flex flex-col items-start sm:items-end gap-4">
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${CONFIG.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-steel hover:text-ink transition-colors duration-150"
            >
              <MessageCircle size={18} aria-hidden="true" />
            </a>

            <a
              href={CONFIG.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-steel hover:text-ink transition-colors duration-150"
            >
              <FacebookIcon size={18} aria-hidden="true" />
            </a>

            <Show when={CONFIG.contact.instagram !== ''}>
              <a
                href={`https://instagram.com/${CONFIG.contact.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-steel hover:text-ink transition-colors duration-150"
              >
                <InstagramIcon size={18} aria-hidden="true" />
              </a>
            </Show>

            <Show when={CONFIG.contact.tiktok !== ''}>
              <a
                href={`https://tiktok.com/@${CONFIG.contact.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-steel hover:text-ink transition-colors duration-150"
              >
                <TikTokIcon size={18} aria-hidden="true" />
              </a>
            </Show>
          </div>

          <p className="font-mono text-[13px] text-steel">
            © {year} Sam's Clipperhz · Site by FA
          </p>
        </div>

      </div>
    </footer>
  );
}
