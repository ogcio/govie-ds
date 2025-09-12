'use client';
import React, { useState, useRef } from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';

export type AccordionItemProps = {
  children: React.ReactNode;
  label: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  dataTestid?: string;
  iconStart?: boolean;
  variant?: 'default' | 'small';
};

const accordionVariants = tv({
  variants: {
    variant: {
      default: 'gi-px-2 gi-py-4 gi-text-md gi-font-bold',
      small: 'gi-py-2 gi-px-2 gi-text-sm gi-font-bold',
    },
  },
});

export const AccordionItem = ({
  defaultExpanded,
  children,
  label,
  disabled,
  dataTestid,
  iconStart,
  variant = 'default',
}: AccordionItemProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const ref = useRef<HTMLDivElement>(null);
  const buttonId = `${label}-button`;
  const panelId = `${label}-panel`;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !disabled) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      <div
        ref={ref}
        data-testid={dataTestid}
        data-disabled={!!disabled}
        data-icon-start={!!iconStart}
        onClick={() => !disabled && setIsExpanded(!isExpanded)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="gi-accordion"
      >
        <div
          className={cn('gi-accordion-header', accordionVariants({ variant }))}
        >
          {label}{' '}
          <Icon
            icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          />
        </div>
      </div>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn('gi-px-2 gi-pb-4 gi-pt-2 gi-font-normal', {
          'gi-block': isExpanded,
          'gi-hidden': !isExpanded,
          'gi-text-md': variant === 'default',
          'gi-text-sm': variant === 'small',
        })}
      >
        {children}
      </div>
    </>
  );
};
