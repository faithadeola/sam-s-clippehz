import { useState, useEffect } from 'react';
import { cn } from '@shared/utils/cn';
import { Wordmark } from './parts/wordmark';
import { BookButton } from './parts/book-button';

export function HeaderScreen() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        scrolled
          ? 'bg-paper/95 backdrop-blur-md border-b border-hairline shadow-sm'
          : 'bg-paper border-b border-hairline',
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Wordmark />
        <BookButton />
      </div>
    </header>
  );
}
