'use client';

import { useEffect, useRef, forwardRef, FC } from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import { Button as PrimitiveButton } from '../primitives/button.js';
import { slugify } from '../utilities.js';
import { InternalTabItemProps, TabItemProps } from './types.js';

const tabItemVariants = tv({
  base: 'gi-tab-item',
  variants: {
    size: {
      md: 'gi-text-md gi-py-4',
      sm: 'gi-text-sm gi-py-2',
    },
    checked: {
      true: 'gi-tab-item-checked',
    },
    stretch: {
      true: 'gi-flex-1',
    },
    labelAlignment: {
      start: 'gi-text-start',
      center: 'gi-text-center',
      end: 'gi-text-end',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const TabItem: FC<TabItemProps> = () => null;

export const InternalTabItem = forwardRef<
  HTMLButtonElement,
  InternalTabItemProps
>(
  (
    {
      value,
      href,
      checked = false,
      children,
      onTabClick,
      onTabKeyDown,
      size = 'md',
      appearance = 'default',
      labelAlignment = 'center',
      stretch,
      icon,
      ...props
    },
    ref,
  ) => {
    const valueSlug = slugify(value);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const clickButtonRef = useRef(false);

    useEffect(() => {
      if (checked && !clickButtonRef.current) {
        buttonRef.current?.click();
      }
    }, [checked]);

    return (
      <PrimitiveButton
        id={`tab-${valueSlug}`}
        ref={(element) => {
          buttonRef.current = element;
          if (typeof ref === 'function') {
            ref(element);
          } else if (ref) {
            ref.current = element;
          }
        }}
        {...props}
        role="tab"
        aria-roledescription="tab"
        aria-selected={checked ? 'true' : 'false'}
        aria-controls={`tab-panel-${valueSlug}`}
        className={tabItemVariants({ size, checked, stretch, labelAlignment })}
        onClick={(event) => {
          clickButtonRef.current = true;
          if (onTabClick) {
            onTabClick(event);
          }
          buttonRef.current?.blur();
        }}
        onKeyDown={(event) => {
          if (onTabKeyDown) {
            onTabKeyDown(event);
          }
        }}
      >
        {href ? (
          <a href={href} className="gi-decoration-xs">
            {children}
          </a>
        ) : (
          <>
            {icon && <Icon icon={icon} />}
            {children}
            <div
              className={cn('gi-tab-item-border', {
                'gi-bg-color-text-system-neutral-interactive-default':
                  checked && appearance === 'dark',
                'gi-bg-color-border-tone-primary-accent-selected':
                  checked && appearance === 'default',
              })}
            ></div>
          </>
        )}
      </PrimitiveButton>
    );
  },
);

InternalTabItem.displayName = 'InternalTabItem';
TabItem.displayName = 'TabItem';
