import { Children, cloneElement, isValidElement } from 'react';
import { generateRandomId } from '../utilities.js';
import { TabsProps } from './types.js';

export function Tabs({
  variant = 'neutral',
  size = 'md',
  stretch = false,
  padding = true,
  labelAlignment = 'center',
  id = generateRandomId(),
  ariaLabelledBy,
  dataTestid,
  children,
}: TabsProps) {
  const childrenWithName = Children.map(children, (element) => {
    if (isValidElement(element)) {
      return cloneElement<any>(element, {
        tabName: id,
        variant,
        size,
        ariaLabelledBy,
        stretch,
        padding,
        labelAlignment,
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
