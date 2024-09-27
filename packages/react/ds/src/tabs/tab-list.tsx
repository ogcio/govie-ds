import React from 'react';

export function TabList({ children }: { children: React.ReactNode }) {
  return (
    <div role="tablist" className="gi--mb-[1px]">
      {children}
    </div>
  );
}
