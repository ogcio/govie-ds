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
      small: 'gi-py-2 gi-px-2 gi-text-sm',
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

  return (
    <div
      ref={ref}
      className={cn('gi-border-b-gray-150', {
        'gi-opacity-30': disabled,
      })}
      data-testid={dataTestid}
    >
      <div
        onClick={() => !disabled && setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        tabIndex={0}
        className={cn(
          accordionVariants({ variant }),
          'hover:gi-bg-gray-200 gi-focus-state-outline-inner-shadow-sm gi-focus-visible-state-outline-inner-shadow-sm',
          {
            'gi-flex gi-flex-row-reverse gi-justify-end': iconStart,
            'gi-flex gi-justify-between': !iconStart,
            'gi-cursor-not-allowed': disabled,
            'gi-cursor-pointer': !disabled,
          },
        )}
      >
        {label}{' '}
        <Icon icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
      </div>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(isExpanded ? 'gi-block' : 'gi-hidden', 'gi-p-3')}
      >
        {children}
      </div>
    </div>
  );
};
