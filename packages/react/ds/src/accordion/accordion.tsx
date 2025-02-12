import React, { ReactElement } from 'react';

import { cn } from '../cn.js';
import { AccordionItem } from './accordion-item.js';

export type AccordionProps = {
  children: React.ReactElement<typeof AccordionItem>[];
  iconStart?: boolean;
  dataTestid?: string;
  variant?: 'default' | 'small';
};

export const Accordion = ({
  children,
  iconStart,
  dataTestid,
  variant = 'default',
}: AccordionProps) => {
  return (
    <>
      <div
        data-testid={dataTestid}
        data-icon-start={iconStart}
        className="gi-max-w-prose"
        role="presentation"
      ></div>
      {React.Children.map(children, (child, index) => {
        const isLastChild = index === React.Children.count(children) - 1;

        return React.isValidElement(child) ? (
          <div
            className={cn('gi-border-t', {
              'gi-border-b': isLastChild,
            })}
          >
            {React.cloneElement(child as ReactElement<any>, {
              variant,
              iconStart,
            })}
          </div>
        ) : null;
      })}
    </>
  );
};
