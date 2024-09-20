import React from 'react';

export function Tabs({
  ariaLabel,
  ariaLabelledby,
  children,
}: {
  ariaLabel?: string;
  ariaLabelledby?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={`gi-flex gi-flex-wrap`}
    >
      {children}
    </div>
  );
}
