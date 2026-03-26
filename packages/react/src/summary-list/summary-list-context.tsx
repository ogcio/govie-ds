'use client';

import { createContext, useContext } from 'react';

const SummaryListContext = createContext<boolean | null>(null);

export function SummaryListProvider({ children }: any) {
  return (
    <SummaryListContext.Provider value={true}>
      {children}
    </SummaryListContext.Provider>
  );
}

export function useSummaryListContext() {
  const context = useContext(SummaryListContext);
  if (!context) {
    throw new Error(
      'useSummaryListContext must be used within SummaryListProvider',
    );
  }
  return context;
}
