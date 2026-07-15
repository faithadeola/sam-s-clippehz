import type { ServiceConfig } from '@shared/config';

export interface SelectedService {
  readonly service: ServiceConfig;
}

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface BookingState {
  readonly selectedServices: readonly ServiceConfig[];
  readonly selectedDay: Date | null;
  readonly selectedTime: string | null;
  readonly isHomeService: boolean;
  readonly homeAddress: string;
  readonly name: string;
}
