import { Children } from 'react';
import { cn } from '../../../../cn.js';
import { isSpecialComponent } from '../../../../utils/utilities.js';
import { HeaderPrimaryMenuProps } from '../../../types.js';
import { useHeaderContext } from '../../header-context.js';
import { HeaderMenuSectionProvider } from './header-menu-context.js';

export const HeaderPrimaryMenu = ({
  children,
  ...props
}: HeaderPrimaryMenuProps) => {
  const headerContext = useHeaderContext();

  if (!headerContext) {
    throw new Error('HeaderPrimaryMenu must be used within a Header');
  }

  const allChildren = Children.toArray(children);
  const allowedComponents = allChildren.filter((child) =>
    isSpecialComponent(child, [
      'HeaderMenuItemLink',
      'HeaderMenuItemButton',
      'HeaderMenuItemSeparator',
    ]),
  );

  return (
    <HeaderMenuSectionProvider section="primary">
      <div className="gi-header-primary-menu">
        {allowedComponents.map((component: any, index) => {
          const { showItemMode = 'desktop-only' } = component?.props || {};
          return (
            <div
              className={cn({
                'gi-block': showItemMode === 'always',
                'gi-block lg:gi-hidden': showItemMode === 'mobile-only',
                'gi-hidden lg:gi-block': showItemMode === 'desktop-only',
              })}
              key={`item-${index}`}
              {...props}
            >
              {component}
            </div>
          );
        })}

        {/*finalItems?.map((item, index) => {
          const { label, showItemMode = 'desktop-only' } = item;
          return (
            <div
              aria-label={item.ariaLabel}
              data-testid={`header-item-${index}`}
              className={cn({
                'gi-block': showItemMode === 'always',
                'gi-block lg:gi-hidden': showItemMode === 'mobile-only',
                'gi-hidden lg:gi-block': showItemMode === 'desktop-only',
              })}
              key={`item-${label}-${index}`}
            >
              <ItemTypeComponent item={item} index={index} />
            </div>
          );
        })*/}
      </div>
    </HeaderMenuSectionProvider>
  );
};
Object.defineProperty(HeaderPrimaryMenu, 'componentType', {
  value: 'HeaderPrimaryMenu',
  writable: false,
  enumerable: false,
});
