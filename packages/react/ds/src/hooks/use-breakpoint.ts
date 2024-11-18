'use client';
import { useState, useEffect } from 'react';

export enum Breakpoint {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 480) {
    return Breakpoint.XS;
  }
  if (width < 640) {
    return Breakpoint.SM;
  }
  if (width < 768) {
    return Breakpoint.MD;
  }
  if (width < 1024) {
    return Breakpoint.LG;
  }
  return Breakpoint.XL;
};

export const useBreakpoint = (): { breakpoint: Breakpoint; width: number } => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(Breakpoint.XS);
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
