import { Children, cloneElement, isValidElement, ReactElement } from 'react';
import { cn } from '../cn.js';
import { AccordionItem, AccordionItemProps } from './accordion-item.js';

export type AccordionProps = {
  children: ReactElement<typeof AccordionItem>[];
  iconStart?: boolean;
  dataTestid?: string;
  className?: string;
  variant?: 'default' | 'small';
};

export const Accordion = ({
  children,
  iconStart,
  dataTestid,
  className,
  variant = 'default',
}: AccordionProps) => {
  return (
    <div
      data-testid={dataTestid}
      data-icon-start={iconStart}
      role="presentation"
      className={cn('gi-w-full', className)}
    >
      {Children.map(children, (child, index) => {
        const isLastChild = index === Children.count(children) - 1;

        return isValidElement(child) ? (
          <div
            className={cn('gi-border-t', {
              'gi-border-b': isLastChild,
            })}
          >
            {cloneElement(
              child as unknown as ReactElement<AccordionItemProps>,
              {
                variant,
                iconStart,
              },
            )}
          </div>
        ) : null;
      })}
    </div>
  );
};
