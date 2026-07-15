import { Show } from 'meemaw';
import { CONFIG } from '@shared/config';
import { BookingProvider } from '@shared/providers/booking-provider';
import { HeaderScreen } from '@features/header';
import { HeroScreen } from '@features/hero';
import { CatalogueScreen } from '@features/catalogue';
import { BookingTrayScreen } from '@features/booking-tray';
import { HomeServiceScreen } from '@features/home-service';
import { ProductsScreen } from '@features/products';
import { ReviewsScreen } from '@features/reviews';
import { RemindersScreen } from '@features/reminders';
import { MarqueeStrip } from '@features/hero/screen/parts/marquee-strip';
import { LoyaltyScreen } from '@features/loyalty';
import { ReferralScreen } from '@features/referral';
import { AcademyScreen } from '@features/academy';
import { VisitScreen } from '@features/visit';
import { FooterScreen } from '@features/footer';

export default function App() {
  return (
    <BookingProvider>
      <HeaderScreen />

      <main>
        <HeroScreen />
        <MarqueeStrip />
        <CatalogueScreen />
        <ProductsScreen />

        <Show when={CONFIG.homeService.enabled}>
          <HomeServiceScreen />
        </Show>

        <ReviewsScreen />

        <RemindersScreen />

        <Show when={CONFIG.loyalty.enabled}>
          <LoyaltyScreen />
        </Show>

        <Show when={CONFIG.referral.enabled}>
          <ReferralScreen />
        </Show>

        <Show when={CONFIG.academy.enabled}>
          <AcademyScreen />
        </Show>

        <VisitScreen />
      </main>

      <FooterScreen />

      {/* Booking tray — fixed to bottom, slides up when services selected */}
      <BookingTrayScreen />
    </BookingProvider>
  );
}
