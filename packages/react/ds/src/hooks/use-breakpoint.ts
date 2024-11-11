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

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(Breakpoint.XS);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setBreakpoint(getBreakpoint(window.innerWidth));
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return breakpoint;
};
