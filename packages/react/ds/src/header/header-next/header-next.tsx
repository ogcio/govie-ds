'use client';

import { Children, type ReactNode } from 'react';
import { Container } from '../../container/container.js';
import { translate as t } from '../../i18n/utility.js';
import {
  getSpecialComponentType,
  isSpecialComponent,
} from '../../utils/utilities.js';
import { HeaderVariant } from '../types.js';
import { headerMenuVariants, headerVariants } from '../variants.js';
import { HeaderProvider } from './header-context.js';

type HeaderProps = {
  children: ReactNode;
  variant?: HeaderVariant;
  fullWidth?: boolean;
};

export function HeaderNext({
  children,
  variant = 'default',
  fullWidth,
  ...props
}: HeaderProps) {
  const appearance = variant;
  const allChildren = Children.toArray(children);

  const headerLogo = allChildren.find(
    (child) => getSpecialComponentType(child) === 'HeaderLogo',
  );
  const headerTitle = allChildren.find(
    (child) => getSpecialComponentType(child) === 'HeaderTitle',
  );
  const headerSecondaryMenu = allChildren.find(
    (child) => getSpecialComponentType(child) === 'HeaderSecondaryMenu',
  );
  const headerPrimaryMenu = allChildren.find(
    (child) => getSpecialComponentType(child) === 'HeaderPrimaryMenu',
  );

  const restChildren = allChildren.filter(
    (child) =>
      !isSpecialComponent(child, [
        'HeaderLogo',
        'HeaderTitle',
        'HeaderPrimaryMenu',
        'HeaderSecondaryMenu',
      ]),
  );

  return (
    <HeaderProvider variant={variant} fullWidth={fullWidth}>
      <header
        id="GovieHeader"
        aria-label={t('header.siteHeader', { defaultValue: 'Site Header' })}
        className={headerVariants({ appearance })}
        {...props}
      >
        <Container
          id="HeaderContainer"
          className="gi-order-2"
          fullWidth={fullWidth}
        >
          <div className={headerMenuVariants({ appearance })}>
            {headerLogo}
            {headerTitle}
            {headerPrimaryMenu}
          </div>
        </Container>
        {headerSecondaryMenu}
        {/*

        {finalItems?.map(({ itemType, component, slotAppearance }, index) => {
          if (itemType === 'slot') {
            const renderOnlyForDropdown =
              component && slotAppearance !== 'drawer';

            if (renderOnlyForDropdown) {
              return (
                <SlotContainer
                  key={`slot-container-${index}`}
                  slot={component}
                  index={index}
                  appearance={appearance}
                />
              );
            }
            return null;
          }
        })}*/}
        {...restChildren}
      </header>
    </HeaderProvider>
  );
}
