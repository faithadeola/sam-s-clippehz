import { useState } from 'react';
import { Show, Repeat } from 'meemaw';
import { MessageCircle, ChevronDown } from '@icons';
import { cn } from '@shared/utils/cn';
import { CONFIG } from '@shared/config';
import { useBookingContext } from '@shared/providers/booking-provider';
import { buildWhatsAppUrl } from '@shared/helpers/build-whatsapp-url';
import { ServiceChip } from './parts/service-chip';
import { DayPicker } from './parts/day-picker';
import { TimePicker } from './parts/time-picker';
import { HomeServiceToggle } from './parts/home-service-toggle';

export function BookingTrayScreen() {
  const { selectedServices, removeService, isHomeService, setIsHomeService } =
    useBookingContext();

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [homeAddress, setHomeAddress] = useState('');
  const [name, setName] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const isVisible = selectedServices.length > 0;
  const totalMins = selectedServices.reduce((sum, s) => sum + s.mins, 0);

  const canSend =
    selectedServices.length > 0 &&
    selectedDay !== null &&
    selectedTime !== null;

  function handleSend() {
    if (!canSend || selectedDay === null || selectedTime === null) return;

    const url = buildWhatsAppUrl({
      whatsappNumber: CONFIG.contact.whatsapp,
      services: selectedServices,
      day: selectedDay,
      time: selectedTime,
      isHomeService,
      homeAddress,
      name,
    });

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleDaySelect(date: Date) {
    setSelectedDay(date);
    setSelectedTime(null);
  }

  return (
    <div
      role="region"
      aria-label="Booking tray"
      aria-hidden={!isVisible}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ease-out',
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none',
      )}
    >
      {/* Tray panel */}
      <div className="bg-paper border-t border-hairline shadow-[0_-4px_24px_rgba(0,0,0,0.08)] max-h-[85vh] overflow-y-auto">

        {/* Tray handle / header */}
        <div className="sticky top-0 bg-paper border-b border-hairline z-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-[17px] text-ink">
                Your booking
              </span>
              <span className="font-mono text-[13px] text-steel bg-bone border border-hairline px-2 py-0.5 rounded-full">
                ~{totalMins} min
              </span>
            </div>

            <button
              type="button"
              onClick={() => setCollapsed(c => !c)}
              aria-label={collapsed ? 'Expand booking tray' : 'Collapse booking tray'}
              className="text-steel hover:text-ink transition-colors duration-100"
            >
              <ChevronDown
                size={20}
                aria-hidden="true"
                className={cn('transition-transform duration-200', collapsed ? 'rotate-180' : '')}
              />
            </button>
          </div>
        </div>

        <Show when={!collapsed}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">

            {/* Selected services */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[13px] text-steel uppercase tracking-wider">
                Selected
              </span>
              <div className="flex flex-wrap gap-2">
                <Repeat each={[...selectedServices]}>
                  {(service) => (
                    <ServiceChip key={service.id} service={service} onRemove={removeService} />
                  )}
                </Repeat>
              </div>
            </div>

            {/* Day picker */}
            <DayPicker selected={selectedDay} onSelect={handleDaySelect} />

            {/* Time picker */}
            <TimePicker
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              onSelect={setSelectedTime}
            />

            {/* Home service toggle */}
            <HomeServiceToggle
              enabled={isHomeService}
              address={homeAddress}
              onToggle={() => setIsHomeService(!isHomeService)}
              onAddressChange={setHomeAddress}
            />

            {/* Name field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="booking-name"
                className="font-mono text-[13px] text-steel uppercase tracking-wider"
              >
                Your name <span className="normal-case text-steel">(optional)</span>
              </label>
              <input
                id="booking-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tunde"
                className="w-full font-body text-[15px] text-ink bg-paper border border-hairline rounded-[6px] px-3 py-2.5 placeholder:text-steel focus:outline-none focus:border-volt transition-colors duration-100"
              />
            </div>

            {/* Validation hint */}
            <Show when={!canSend && selectedServices.length > 0}>
              <p className="font-body text-[13px] text-steel">
                Pick a day and time to send your booking.
              </p>
            </Show>

            {/* Send button */}
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              aria-disabled={!canSend}
              className={cn(
                'w-full inline-flex items-center justify-center gap-2 font-body font-semibold text-[17px] px-6 py-4 rounded-[6px] transition-colors duration-150',
                canSend
                  ? 'bg-volt hover:bg-volt-ink text-white cursor-pointer'
                  : 'bg-bone text-steel cursor-not-allowed border border-hairline',
              )}
            >
              <MessageCircle size={18} aria-hidden="true" />
              Send booking on WhatsApp
            </button>

          </div>
        </Show>
      </div>
    </div>
  );
}
