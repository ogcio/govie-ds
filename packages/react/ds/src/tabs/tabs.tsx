import React from 'react';
import { generateRandomId } from '../utils.js';

export function Tabs({
  id = generateRandomId(),
  ariaLabelledBy,
  children,
}: {
  id?: string;
  ariaLabelledBy: string;
  children: React.ReactNode;
}) {
  const childrenWithName = React.Children.map(children, (element) => {
    if (React.isValidElement<{ tabName: string }>(element)) {
      return React.cloneElement<{ tabName: string }>(element, { tabName: id });
    }
    return element;
  });
  return (
    <div aria-labelledby={ariaLabelledBy} className="gi-tabs" id={id}>
      {childrenWithName}
    </div>
  );
}
