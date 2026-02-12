'use client';

import { useState, useEffect } from 'react';

/**
 * Detects mobile devices via viewport width + touch support.
 * Breakpoint aligns with Tailwind's `lg:` (1024px).
 */
export function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const narrow = window.innerWidth < breakpoint;
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(narrow || touch);
    };

    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}
