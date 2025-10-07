'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../../../../cn.js';
import { headerDividerVariants } from '../../../../variants.js';
import { useHeaderContext } from '../../../header-context.js';
import { useHeaderMenuSection } from '../header-menu-context.js';

export type HeaderMenuItemSeparatorProps = ComponentPropsWithoutRef<'div'>;

export const HeaderMenuItemSeparator = forwardRef<
  HTMLDivElement,
  HeaderMenuItemSeparatorProps
>(({ className, ...props }, ref) => {
  const context = useHeaderContext();
  const section = useHeaderMenuSection();

  if (!section || section === 'secondary') {
    throw new Error(
      'HeaderMenuItemSeparator must be used within a HeaderPrimaryMenu',
    );
  }

  const appearance = context.variant;

  return (
    <div
      ref={ref}
      role="separator"
      className={cn(headerDividerVariants({ appearance }), className)}
      {...props}
    />
  );
});

HeaderMenuItemSeparator.displayName = 'HeaderMenuItemSeparator';

Object.defineProperty(HeaderMenuItemSeparator, 'componentType', {
  value: 'HeaderMenuItemSeparator',
  writable: false,
  enumerable: false,
});
