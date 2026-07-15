import { useState, useEffect } from 'react';
import { getOpenStatus, type OpenStatus } from '@shared/helpers/get-open-status';
import { CONFIG } from '@shared/config';

export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(() =>
    getOpenStatus(CONFIG.hours, CONFIG.timezone),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getOpenStatus(CONFIG.hours, CONFIG.timezone));
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
