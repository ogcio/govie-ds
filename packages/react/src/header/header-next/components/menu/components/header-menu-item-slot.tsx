'use client';

import { forwardRef } from 'react';
import { cn } from '@/cn.js';
import { type HeaderMenuItemSlotProps } from '@/header/types.js';
import { headerSecondaryLinkSlotItemVariants } from '@/header/variants.js';
import { useHeaderContext } from '@/header/header-next/header-context.js';
import { useHeaderMenuSection } from '@/header/header-next/components/menu/header-menu-context.js';

export const HeaderMenuItemSlot = forwardRef<HTMLDivElement, HeaderMenuItemSlotProps>(
  ({ children, className, ...props }, ref) => {
    const context = useHeaderContext();
    const section = useHeaderMenuSection();

    if (!context) {
      throw new Error('HeaderMenuItemSlot must be used within a Header');
    }
    if (section !== 'secondary') {
      throw new Error('HeaderMenuItemSlot must be used within a HeaderSecondaryMenu');
    }

    const appearance = context.variant;

    return (
      <li>
        <div
          ref={ref}
          className={cn(
            headerSecondaryLinkSlotItemVariants({
              appearance,
            }),
            className,
          )}
          data-appearance={appearance}
          {...props}
        >
          {children}
        </div>
      </li>
    );
  },
);

HeaderMenuItemSlot.displayName = 'HeaderMenuItemSlot';

Object.defineProperty(HeaderMenuItemSlot, 'componentType', {
  value: 'HeaderMenuItemSlot',
  writable: false,
  enumerable: false,
});
