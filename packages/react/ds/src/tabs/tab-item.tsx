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
      className,
      ...props
    },
    ref,
  ) => {
    const valueSlug = slugify(value);
    const internalRef = useRef<HTMLButtonElement>(null);
    const clickButtonRef = useRef(false);

    useEffect(() => {
      if (checked && !clickButtonRef.current) {
        internalRef.current?.click();
      }
    }, [checked]);

    const sharedA11y = {
      role: 'tab',
      'aria-selected': checked,
      'aria-controls': `tab-panel-${valueSlug}`,
      id: `tab-${valueSlug}`,
      tabIndex: checked ? 0 : -1,
    } as const;

    const classes = tabItemVariants({ size, checked, stretch, labelAlignment });

    const Border = (
      <div
        className={cn('gi-tab-item-border', {
          'gi-bg-color-text-system-neutral-interactive-default':
            checked && appearance === 'dark',
          'gi-bg-color-border-tone-primary-accent-selected':
            checked && appearance === 'default',
        })}
        aria-hidden="true"
      />
    );

    const Content = (
      <>
        {icon && <Icon icon={icon} />}
        {children}
        {Border}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          {...sharedA11y}
          className={cn(
            classes,
            'gi-inline-flex gi-items-center gi-gap-2 gi-decoration-xs',
            className,
          )}
          onClick={
            onTabClick as unknown as React.MouseEventHandler<HTMLAnchorElement>
          }
          onKeyDown={
            onTabKeyDown as unknown as React.KeyboardEventHandler<HTMLAnchorElement>
          }
        >
          {Content}
        </a>
      );
    }

    return (
      <PrimitiveButton
        {...sharedA11y}
        ref={(element) => {
          internalRef.current = element;
          if (typeof ref === 'function') {
            ref(element);
          } else if (ref) {
            ref.current = element;
          }
        }}
        className={cn(
          classes,
          'gi-inline-flex gi-items-center gi-gap-2',
          className,
        )}
        onClick={(event) => {
          onTabClick?.(event);
        }}
        onKeyDown={(event) => {
          onTabKeyDown?.(event);
        }}
        {...props}
      >
        {Content}
      </PrimitiveButton>
    );
  },
);

InternalTabItem.displayName = 'InternalTabItem';
TabItem.displayName = 'TabItem';
