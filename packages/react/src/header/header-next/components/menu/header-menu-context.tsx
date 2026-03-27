'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { HeaderMenuSectionContextProps } from '../../../types.js';

const HeaderMenuSectionContext =
  createContext<HeaderMenuSectionContextProps | null>(null);

export function HeaderMenuSectionProvider({
  section,
  children,
}: {
  section: HeaderMenuSectionContextProps;
  children: ReactNode;
}) {
  return (
    <HeaderMenuSectionContext.Provider value={section}>
      {children}
    </HeaderMenuSectionContext.Provider>
  );
}

export function useHeaderMenuSection(): HeaderMenuSectionContextProps {
  const value = useContext(HeaderMenuSectionContext);
  if (!value) {
    throw new Error(
      'useHeaderMenuSection must be used within HeaderMenuSectionProvider',
    );
  }
  return value;
}
