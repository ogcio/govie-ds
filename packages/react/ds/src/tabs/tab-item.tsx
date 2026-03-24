'use client';

import { forwardRef, FC, Ref } from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import { Button as PrimitiveButton } from '../primitives/button.js';
import { slugify } from '../utilities.js';
import { InternalTabItemProps, TabItemProps } from './types.js';
import { tabItemVariants } from './variants.js';

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

  const { base, border } = tabItemVariants({
    size,
    checked,
    stretch,
    labelAlignment,
    appearance,
  });

  const Content = (
    <>
      {icon && <Icon icon={icon} />}
      {children}
      <div
        data-element="tab-item-border"
        className={border()}
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
          base(),
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
        base(),
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
