'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { HeaderVariant } from '../types.js';

type DrawerPosition = 'left' | 'right';

type HeaderContextValue = {
  variant: HeaderVariant;
  fullWidth?: boolean;
};

const HeaderContext = createContext<HeaderContextValue | null>(null);

type HeaderProviderProps = {
  children: React.ReactNode;
  variant: HeaderVariant;
  fullWidth?: boolean;
};

export function HeaderProvider({
  children,
  variant = 'default',
  fullWidth,
}: HeaderProviderProps) {
  return (
    <HeaderContext.Provider
      value={{
        variant,
        fullWidth,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeaderContext() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeaderContext must be used within HeaderProvider');
  }
  return context;
}
