'use client';

import { Children, forwardRef, type ReactElement } from 'react';
import { cn } from '../../cn.js';
import { Container } from '../../container/container.js';
import { translate as t } from '../../i18n/utility.js';
import {
  getSpecialComponentType,
  isSpecialComponent,
} from '../../utils/utilities.js';
import type { HeaderNextProps, HeaderSlotContainerProps } from '../types.js';
import {
  headerMenuVariants,
  headerSlotContainerVariants,
  headerVariants,
} from '../variants.js';
import { HeaderProvider } from './header-context.js';

export const HeaderNext = forwardRef<HTMLElement, HeaderNextProps>(
  (
    {
      children,
      variant = 'default',
      fullWidth,
      className,
      id,
      'aria-labelledby': ariaLabelledby,
      'aria-label': ariaLabelProp,
      ...rest
    },
    ref,
  ) => {
    const allChildren = Children.toArray(children);
    const getChildrenByComponentType = (componentType: string) =>
      allChildren.find(
        (child) => getSpecialComponentType(child) === componentType,
      ) as ReactElement | undefined;

    const headerLogo = getChildrenByComponentType('HeaderLogo');
    const headerTitle = getChildrenByComponentType('HeaderTitle');
    const headerSecondaryMenu = getChildrenByComponentType(
      'HeaderSecondaryMenu',
    );
    const headerPrimaryMenu = getChildrenByComponentType('HeaderPrimaryMenu');

    const restChildren = allChildren.filter(
      (child) =>
        !isSpecialComponent(child, [
          'HeaderLogo',
          'HeaderTitle',
          'HeaderPrimaryMenu',
          'HeaderSecondaryMenu',
        ]),
    );

    console.log({
      allChildren,
      headerLogo,
      headerTitle,
    });

    const ariaLabel =
      ariaLabelProp ?? t('header.siteHeader', { defaultValue: 'Site Header' });

    return (
      <HeaderProvider variant={variant} fullWidth={fullWidth}>
        <header
          ref={ref}
          id={id ?? 'GovieHeader'}
          role="banner"
          aria-labelledby={ariaLabelledby}
          aria-label={ariaLabel}
          className={headerVariants({ appearance: variant, className })}
          data-variant={variant}
          {...rest}
        >
          <Container className="gi-order-2" fullWidth={fullWidth}>
            <div className={headerMenuVariants({ appearance: variant })}>
              {headerLogo}
              {headerTitle}
              {headerPrimaryMenu}
            </div>
          </Container>
          {headerSecondaryMenu}
          {restChildren}
        </header>
      </HeaderProvider>
    );
  },
);

export const HeaderSlotContainer = ({
  variant,
  className,
  ...props
}: HeaderSlotContainerProps) => (
  <div
    className={cn(
      headerSlotContainerVariants({ appearance: variant }),
      className,
    )}
    {...props}
  />
);

HeaderNext.displayName = 'HeaderNext';
