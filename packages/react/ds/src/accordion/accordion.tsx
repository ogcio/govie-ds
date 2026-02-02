import {
  Children,
  cloneElement,
  ComponentPropsWithRef,
  isValidElement,
  ReactElement,
} from 'react';
import { cn } from '../cn.js';
import { AccordionItem, AccordionItemProps } from './accordion-item.js';

export type AccordionProps = {
  children: ReactElement<typeof AccordionItem>[];
  className?: string;
  variant?: 'default' | 'small';
} & ComponentPropsWithRef<'div'>;

export const Accordion = ({
  children,
  className,
  variant = 'default',
  ...props
}: AccordionProps) => {
  return (
    <div {...props} role="presentation" className={cn('gi:w-full', className)}>
      {Children.map(children, (child, index) => {
        const isLastChild = index === Children.count(children) - 1;

        return isValidElement(child) ? (
          <div
            className={cn('gi:border-t', {
              'gi:border-b': isLastChild,
            })}
          >
            {cloneElement(
              child as unknown as ReactElement<AccordionItemProps>,
              {
                variant,
              },
            )}
          </div>
        ) : null;
      })}
    </div>
  );
};
