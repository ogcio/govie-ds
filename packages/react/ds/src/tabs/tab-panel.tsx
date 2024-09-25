import React from 'react';
import { slugify } from '../utils.js';

export function TabPanel({
  value,
  children,
}: {
  value: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  children: React.ReactNode;
}) {
  const valueSlug = slugify(value);
  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${valueSlug}`}
      className="
        gi-hidden 
        gi-basis-full 
        gi-border-xs
        gi-border-solid 
        gi-border-slate-200 
        gi-bg-white 
        gi-p-4"
    >
      {children}
    </div>
  );
}
