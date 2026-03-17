'use client';
import clsx from 'clsx';
import React, { useState, useRef, ComponentPropsWithRef } from 'react';
import { Icon } from '../icon/icon.js';
import { accordionVariants } from './variants.js';

export type AccordionItemProps = {
  children: React.ReactNode;
  label: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'small';
} & ComponentPropsWithRef<'div'>;

export const AccordionItem = ({
  defaultExpanded,
  children,
  label,
  disabled,
  className,
  variant = 'default',
  ...props
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
  const { base, header } = accordionVariants({ variant, disabled: !!disabled });
  return (
    <>
      <div
        {...props}
        ref={ref}
        data-element="accordion-item"
        data-disabled={!!disabled}
        onClick={() => !disabled && setIsExpanded(!isExpanded)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={clsx(base(), className)}
      >
        <div data-element="accordion-header" className={header()}>
          {label}
          <Icon
            icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            size="md"
            className={clsx({
              'gi-pt-[1.5px]': variant === 'default',
            })}
          />
        </div>
      </div>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={clsx('gi-px-2 gi-pb-4 gi-pt-2 gi-font-normal', {
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
