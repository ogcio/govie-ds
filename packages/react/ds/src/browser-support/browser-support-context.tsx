'use client';
import { createContext, ReactNode, useContext, useRef, useState } from 'react';

interface BrowserSupportContextValue {
  owner: symbol | null;
  claim: (token: symbol) => void;
  release: (token: symbol) => void;
  hasOwner: () => boolean;
}

const BrowserSupportContext = createContext<
  BrowserSupportContextValue | undefined
>(undefined);

export function BrowserSupportProvider({ children }: { children: ReactNode }) {
  const [owner, setOwner] = useState<symbol | null>(null);
  const ownerRef = useRef<symbol | null>(null);

  const claim = (token: symbol) => {
    setOwner((previous) => {
      if (previous === null) {
        ownerRef.current = token;
        return token;
      } else {
        ownerRef.current = previous;
        return previous;
      }
    });
  };

  const release = (token: symbol): void => {
    if (ownerRef.current === token) {
      setOwner(() => {
        ownerRef.current = null;
        return null;
      });
    }
  };

  const hasOwner = (): boolean => ownerRef.current !== null;

  return (
    <BrowserSupportContext.Provider value={{ owner, claim, release, hasOwner }}>
      {children}
    </BrowserSupportContext.Provider>
  );
}

export const useBrowserSupportContext = (): BrowserSupportContextValue => {
  const context = useContext(BrowserSupportContext);

  if (!context) {
    throw new Error(
      'BrowserSupport must be used within a BrowserSupportContext',
    );
  }

  return context;
};
