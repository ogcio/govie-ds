'use client';

import { forwardRef, FC, Ref } from 'react';
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
      start: 'gi-justify-start',
      center: 'gi-justify-center',
      end: 'gi-justify-end',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const TabItem: FC<TabItemProps> = () => null;

export const InternalTabItem = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  InternalTabItemProps
>((props, ref) => {
  const {
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
    ...rest
  } = props;

  const valueSlug = slugify(value);

  const sharedA11y = {
    role: 'tab',
    'aria-selected': checked,
    'aria-controls': `tab-panel-${valueSlug}`,
    id: `tab-${valueSlug}`,
    tabIndex: checked ? 0 : -1,
  } as const;

  const classes = tabItemVariants({ size, checked, stretch, labelAlignment });

  const Content = (
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
        aria-hidden="true"
      />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        {...sharedA11y}
        {...rest}
        className={cn(
          classes,
          'gi-inline-flex gi-items-center gi-gap-2 gi-decoration-xs',
          className,
        )}
        onClick={(event) => {
          onTabClick?.(event);
        }}
        onKeyDown={(event) => {
          onTabKeyDown?.(event);
        }}
        ref={ref as Ref<HTMLAnchorElement>}
      >
        {Content}
      </a>
    );
  }

  return (
    <PrimitiveButton
      {...sharedA11y}
      {...rest}
      ref={ref as Ref<HTMLButtonElement>}
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
    >
      {Content}
    </PrimitiveButton>
  );
});

InternalTabItem.displayName = 'InternalTabItem';
TabItem.displayName = 'TabItem';
