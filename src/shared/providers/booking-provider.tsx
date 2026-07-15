import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ServiceConfig } from '@shared/config';

interface BookingContextValue {
  readonly selectedServices: readonly ServiceConfig[];
  readonly toggleService: (service: ServiceConfig) => void;
  readonly removeService: (id: string) => void;
  readonly clearServices: () => void;
  readonly isHomeService: boolean;
  readonly setIsHomeService: (value: boolean) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

interface BookingProviderProps {
  readonly children: ReactNode;
}

export function BookingProvider({ children }: BookingProviderProps) {
  const [selectedServices, setSelectedServices] = useState<readonly ServiceConfig[]>([]);
  const [isHomeService, setIsHomeService] = useState(false);

  function toggleService(service: ServiceConfig) {
    setSelectedServices(prev => {
      const exists = prev.some(s => s.id === service.id);
      return exists
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service];
    });
  }

  function removeService(id: string) {
    setSelectedServices(prev => prev.filter(s => s.id !== id));
  }

  function clearServices() {
    setSelectedServices([]);
  }

  return (
    <BookingContext.Provider
      value={{
        selectedServices,
        toggleService,
        removeService,
        clearServices,
        isHomeService,
        setIsHomeService,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContext(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (ctx === null) {
    throw new Error('useBookingContext must be used within BookingProvider');
  }
  return ctx;
}
