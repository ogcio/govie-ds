import { Children, cloneElement, isValidElement } from 'react';
import { generateRandomId } from '../utilities.ts.js';

export type TabsProps = {
  id?: string;
  ariaLabelledBy: string;
  dataTestid?: string;
  children: React.ReactNode;
};

export function Tabs({
  id = generateRandomId(),
  ariaLabelledBy,
  dataTestid,
  children,
}: TabsProps) {
  const childrenWithName = Children.map(children, (element) => {
    if (isValidElement<{ tabName: string }>(element)) {
      return cloneElement<{ tabName: string }>(element, { tabName: id });
    }
    return element;
  });
  return (
    <div
      aria-labelledby={ariaLabelledBy}
      className="gi-tabs"
      id={id}
      data-testid={dataTestid}
    >
      {childrenWithName}
    </div>
  );
}
