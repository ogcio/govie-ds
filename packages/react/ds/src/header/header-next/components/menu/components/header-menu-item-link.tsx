import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import { Icon } from '../../../../../icon/icon.js';
import Anchor from '../../../../../primitives/anchor.js';
import { HeaderMenuItemLinkProps } from '../../../../types.js';
import {
  headerSecondaryLinkItemVariants,
  headerToolItemVariants,
} from '../../../../variants.js';
import { useHeaderContext } from '../../../header-context.js';
import { useHeaderMenuSection } from '../header-menu-context.js';

export const HeaderMenuItemLink = forwardRef<
  HTMLAnchorElement,
  HeaderMenuItemLinkProps
>(
  (
    {
      asChild,
      icon,
      href,
      external,
      children,
      className,
      target,
      rel,
      ...props
    },
    ref,
  ) => {
    const context = useHeaderContext();
    const section = useHeaderMenuSection();

    if (!section) {
      throw new Error(
        'HeaderMenuItemLink must be used within a HeaderSecondaryMenu or HeaderPrimaryMenu',
      );
    }

    const appearance = context.variant;
    const AnchorComponent = asChild ? Slot : Anchor;
    const finalTarget = target ?? (external ? '_blank' : undefined);

    switch (section) {
      case 'primary': {
        return (
          <AnchorComponent
            ref={ref}
            rel={rel}
            href={href}
            target={finalTarget}
            className={headerToolItemVariants({ appearance, className })}
            {...props}
          >
            {children}
            {icon ? <Icon icon={icon} aria-hidden="true" /> : null}
          </AnchorComponent>
        );
      }
      case 'secondary': {
        return (
          <li>
            <AnchorComponent
              ref={ref}
              rel={rel}
              href={href}
              target={finalTarget}
              className={headerSecondaryLinkItemVariants({
                appearance,
                className,
              })}
              {...props}
            >
              {children}
            </AnchorComponent>
          </li>
        );
      }
      default: {
        return null;
      }
    }
  },
);

HeaderMenuItemLink.displayName = 'HeaderMenuItemLink';

Object.defineProperty(HeaderMenuItemLink, 'componentType', {
  value: 'HeaderMenuItemLink',
  writable: false,
  enumerable: false,
});
