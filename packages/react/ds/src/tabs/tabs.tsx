import { Children, cloneElement, isValidElement } from 'react';
import { generateRandomId } from '../utilities.js';
import { TabsProps } from './types.js';

export function Tabs({
  appearance = 'default',
  size = 'md',
  stretch = false,
  padding = true,
  labelAlignment = 'center',
  id = generateRandomId(),
  ariaLabelledBy,
  children,
  ...props
}: TabsProps) {
  const childrenWithName = Children.map(children, (element) => {
    if (isValidElement(element)) {
      return cloneElement<any>(element, {
        tabName: id,
        appearance,
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
    <div className="gi-tabs" id={id} {...props}>
      {childrenWithName}
    </div>
  );
}
