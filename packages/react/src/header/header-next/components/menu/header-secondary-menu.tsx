'use client';

import { Children, forwardRef } from 'react';
import { Container } from '../../../../container/container.js';
import { isSpecialComponent } from '../../../../utils/utilities.js';
import { HeaderSecondaryMenuProps } from '../../../types.js';
import { headerSecondaryLinksVariants } from '../../../variants.js';
import { useHeaderContext } from '../../header-context.js';
import { HeaderMenuSectionProvider } from './header-menu-context.js';

export const HeaderSecondaryMenu = forwardRef<
  HTMLElement,
  HeaderSecondaryMenuProps
>(
  (
    {
      children,
      className,
      'aria-label': ariaLabel = 'Secondary navigation',
      ...rest
    },
    ref,
  ) => {
    const headerContext = useHeaderContext();
    if (!headerContext) {
      throw new Error('HeaderSecondaryMenu must be used within a Header');
    }

    const appearance = headerContext.variant;
    const allChildren = Children.toArray(children);

    const allowedChildren = allChildren.filter((child) =>
      isSpecialComponent(child, ['HeaderMenuItemLink', 'HeaderMenuItemSlot']),
    );

    if (allowedChildren.length === 0) {
      return null;
    }

    return (
      <HeaderMenuSectionProvider section="secondary">
        <nav
          ref={ref}
          role="navigation"
          aria-label={ariaLabel}
          data-section="secondary"
          className={headerSecondaryLinksVariants({ appearance, className })}
          {...rest}
        >
          <Container className="gi-w-full" fullWidth={headerContext.fullWidth}>
            <ul
              className="gi-flex gi-justify-end gi-items-center gi-gap-2"
              data-orientation="horizontal"
            >
              {allowedChildren}
            </ul>
          </Container>
        </nav>
      </HeaderMenuSectionProvider>
    );
  },
);

HeaderSecondaryMenu.displayName = 'HeaderSecondaryMenu';

Object.defineProperty(HeaderSecondaryMenu, 'componentType', {
  value: 'HeaderSecondaryMenu',
  writable: false,
  enumerable: false,
});
