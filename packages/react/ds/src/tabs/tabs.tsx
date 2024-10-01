import React from 'react';

export function Tabs({
  id,
  ariaLabel,
  children,
}: {
  id: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  children: React.ReactNode;
}) {
  const childrenWithName = React.Children.map(children, (element) => {
    if (React.isValidElement<{ tabName: string }>(element)) {
      return React.cloneElement<{ tabName: string }>(element, { tabName: id });
    }
    return element;
  });
  return (
    <div aria-label={ariaLabel} className="gi-tabs gi-flex gi-flex-wrap">
      {childrenWithName}
    </div>
  );
}
