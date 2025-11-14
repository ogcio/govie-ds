'use client';

import { Children, forwardRef } from 'react';
import { cn } from '../../../../cn.js';
import { isSpecialComponent } from '../../../../utils/utilities.js';
import { HeaderPrimaryMenuProps, type HeaderItemMode } from '../../../types.js';
import { useHeaderContext } from '../../header-context.js';
import { HeaderMenuSectionProvider } from './header-menu-context.js';

export const HeaderPrimaryMenu = forwardRef<
  HTMLElement,
  HeaderPrimaryMenuProps
>(
  (
    {
      children,
      className,
      'aria-label': ariaLabel = 'Primary navigation',
      ...rest
    },
    ref,
  ) => {
    const headerContext = useHeaderContext();

    if (!headerContext) {
      throw new Error('HeaderPrimaryMenu must be used within a Header');
    }

    const allChildren = Children.toArray(children);
    const allowedChildren = allChildren.filter((child) =>
      isSpecialComponent(child, [
        'HeaderMenuItemLink',
        'HeaderMenuItemButton',
        'HeaderMenuItemSlot',
        'HeaderMenuItemSeparator',
      ]),
    );

    if (allowedChildren.length === 0) {
      return null;
    }

    return (
      <HeaderMenuSectionProvider section="primary">
        <nav
          ref={ref}
          role="navigation"
          aria-label={ariaLabel}
          data-section="primary"
          className={cn('gi-header-primary-menu', className)}
          {...rest}
        >
          <ul className="gi-flex gi-items-center gi-gap-2">
            {allowedChildren.map((component, index) => {
              const showItemMode: HeaderItemMode =
                (component as any)?.props?.showItemMode ?? 'desktop-only';

              return (
                <li
                  key={`primary-item-${index}`}
                  className={cn({
                    'gi-block': showItemMode === 'always',
                    'gi-block lg:gi-hidden': showItemMode === 'mobile-only',
                    'gi-hidden lg:gi-block': showItemMode === 'desktop-only',
                  })}
                  data-visibility={showItemMode}
                >
                  {component}
                </li>
              );
            })}
          </ul>
        </nav>
      </HeaderMenuSectionProvider>
    );
  },
);

HeaderPrimaryMenu.displayName = 'HeaderPrimaryMenu';

Object.defineProperty(HeaderPrimaryMenu, 'componentType', {
  value: 'HeaderPrimaryMenu',
  writable: false,
  enumerable: false,
});
