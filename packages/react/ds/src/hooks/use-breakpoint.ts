'use client';
import { useState, useEffect } from 'react';

export const Breakpoint = {
  EXTRA_SMALL: 'xs',
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  EXTRA_LARGE: 'xl',
} as const;

export type BreakpointType = (typeof Breakpoint)[keyof typeof Breakpoint];

const getBreakpoint = (width: number): BreakpointType => {
  if (width < 480) {
    return Breakpoint.EXTRA_SMALL;
  }
  if (width < 640) {
    return Breakpoint.SMALL;
  }
  if (width < 768) {
    return Breakpoint.MEDIUM;
  }
  if (width < 1024) {
    return Breakpoint.LARGE;
  }
  return Breakpoint.EXTRA_LARGE;
};

export const useBreakpoint = (): {
  breakpoint: BreakpointType;
  width: number;
} => {
  const [breakpoint, setBreakpoint] = useState<BreakpointType>(
    Breakpoint.EXTRA_SMALL,
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
