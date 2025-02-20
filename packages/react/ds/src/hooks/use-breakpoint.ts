'use client';
import { useState, useEffect } from 'react';

export const Breakpoint = {
  ExtraSmall: 'xs',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
} as const;

export type BreakpointType = (typeof Breakpoint)[keyof typeof Breakpoint];

const getBreakpoint = (width: number): BreakpointType => {
  if (width < 480) {
    return Breakpoint.ExtraSmall;
  }
  if (width < 640) {
    return Breakpoint.Small;
  }
  if (width < 768) {
    return Breakpoint.Medium;
  }
  if (width < 1024) {
    return Breakpoint.Large;
  }
  return Breakpoint.ExtraLarge;
};

export const useBreakpoint = (): {
  breakpoint: BreakpointType;
  width: number;
} => {
  const [breakpoint, setBreakpoint] = useState<BreakpointType>(
    Breakpoint.ExtraSmall,
  );
  const [width, setWidth] = useState<number>(
    typeof window === 'undefined' ? 0 : window.innerWidth,
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const currentWidth = window.innerWidth;
        setWidth(currentWidth);
        setBreakpoint(getBreakpoint(currentWidth));
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return { breakpoint, width };
};
