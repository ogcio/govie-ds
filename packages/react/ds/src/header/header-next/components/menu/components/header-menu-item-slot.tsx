import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { headerSecondaryLinkSlotItemVariants } from '../../../../variants.js';
import { useHeaderContext } from '../../../header-context.js';
import { useHeaderMenuSection } from '../header-menu-context.js';

export type HeaderMenuItemSlotProps = ComponentPropsWithoutRef<'div'> & {
  children?: ReactNode;
};

export const HeaderMenuItemSlot = forwardRef<
  HTMLDivElement,
  HeaderMenuItemSlotProps
>(({ children, className, ...props }, ref) => {
  const context = useHeaderContext();
  const section = useHeaderMenuSection();

  if (!context) {
    throw new Error('HeaderMenuItemSlot must be used within a Header');
  }
  if (section !== 'secondary') {
    throw new Error(
      'HeaderMenuItemSlot must be used within a HeaderSecondaryMenu',
    );
  }

  const appearance = context.variant;

  return (
    <li>
      <div
        ref={ref}
        className={headerSecondaryLinkSlotItemVariants({
          appearance,
          className,
        })}
        data-appearance={appearance}
        {...props}
      >
        {children}
      </div>
    </li>
  );
});

HeaderMenuItemSlot.displayName = 'HeaderMenuItemSlot';

Object.defineProperty(HeaderMenuItemSlot, 'componentType', {
  value: 'HeaderMenuItemSlot',
  writable: false,
  enumerable: false,
});
