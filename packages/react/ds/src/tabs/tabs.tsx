import { Children, cloneElement, isValidElement } from 'react';
import { generateRandomId } from '../utilities.js';
import { TabsProps } from './types.js';

export function Tabs({
  id = generateRandomId(),
  ariaLabelledBy,
  dataTestid,
  children,
  variant = 'neutral',
  size = 'md',
}: TabsProps) {
  const childrenWithName = Children.map(children, (element) => {
    if (isValidElement(element)) {
      return cloneElement<any>(element, {
        tabName: id,
        variant,
        size,
        ariaLabelledBy,
      });
    }
    return element;
  });
  return (
    <div className="gi-tabs" id={id} data-testid={dataTestid}>
      {childrenWithName}
    </div>
  );
}
