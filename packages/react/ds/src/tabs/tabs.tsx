import React from 'react';

export function Tabs({
  ariaLabel,
  children,
}: {
  ariaLabel?: string;
  ariaLabelledby?: string;
  children: React.ReactNode;
}) {
  return (
    <div aria-label={ariaLabel} className="gi-tabs gi-flex gi-flex-wrap">
      {children}
    </div>
  );
}
