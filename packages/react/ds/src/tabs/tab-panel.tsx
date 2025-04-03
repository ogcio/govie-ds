import React from 'react';
import { slugify } from '../utilities.ts.js';

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
      id={`tab-panel-${valueSlug}`}
      tabIndex={0}
      className="gi-tab-panel"
    >
      {children}
    </div>
  );
}
