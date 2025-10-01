import { Children } from 'react';
import { Container } from '../../../../container/container.js';
import { isSpecialComponent } from '../../../../utils/utilities.js';
import { headerSecondaryLinksVariants } from '../../../variants.js';
import { useHeaderContext } from '../../header-context.js';
import { HeaderMenuSectionProvider } from './header-menu-context.js';

type HeaderSecondaryMenu = {
  children?: any;
};

export const HeaderSecondaryMenu = ({ children }: HeaderSecondaryMenu) => {
  const headerContext = useHeaderContext();

  if (!headerContext) {
    throw new Error('HeaderSecondaryMenu must be used within a Header');
  }

  const allChildren = Children.toArray(children);
  const appearance = headerContext.variant;

  const allowedComponents = allChildren.filter((child) =>
    isSpecialComponent(child, ['HeaderMenuItemLink', 'HeaderMenuItemSlot']),
  );

  return (
    <HeaderMenuSectionProvider section="secondary">
      <div className={headerSecondaryLinksVariants({ appearance })}>
        <Container
          className="gi-flex gi-justify-end gi-items-center"
          fullWidth={headerContext.fullWidth}
        >
          <ul>{...allowedComponents}</ul>
        </Container>
      </div>
    </HeaderMenuSectionProvider>
  );
};

Object.defineProperty(HeaderSecondaryMenu, 'componentType', {
  value: 'HeaderSecondaryMenu',
  writable: false,
  enumerable: false,
});
