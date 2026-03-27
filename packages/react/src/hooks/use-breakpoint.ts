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
  breakpoint: BreakpointType | null;
  width: number | null;
} => {
  const [breakpoint, setBreakpoint] = useState<BreakpointType | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = Math.min(
        globalThis.document.documentElement.clientWidth,
        globalThis.window.innerWidth,
      );
      setWidth(currentWidth);
      setBreakpoint(getBreakpoint(currentWidth));
    };

    handleResize();
    globalThis.window.addEventListener('resize', handleResize);

    return () => {
      globalThis.window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { breakpoint, width };
};
