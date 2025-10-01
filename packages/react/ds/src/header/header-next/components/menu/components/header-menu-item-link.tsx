import { Slot } from '@radix-ui/react-slot';
import { Icon, IconId } from '../../../../../icon/icon.js';
import Anchor from '../../../../../primitives/anchor.js';
import { HeaderMenuItemLinkProps } from '../../../../types.js';
import {
  headerSecondaryLinkItemVariants,
  headerToolItemVariants,
} from '../../../../variants.js';
import { useHeaderContext } from '../../../header-context.js';
import { useHeaderMenuSection } from '../header-menu-context.js';

export const HeaderMenuItemLink = ({
  asChild,
  icon,
  href,
  external,
  children,
  ...props
}: HeaderMenuItemLinkProps) => {
  const context = useHeaderContext();
  const section = useHeaderMenuSection();

  if (!section) {
    throw new Error(
      'HeaderMenuItemLink must be used within a HeaderSecondaryMenu or HeaderPrimaryMenu',
    );
  }
  const appearance = context.variant;
  const Component = asChild ? Slot : Anchor;

  switch (section) {
    case 'secondary': {
      return (
        <li>
          <Component
            href={href}
            className={headerSecondaryLinkItemVariants({ appearance })}
            {...props}
          >
            {children}
          </Component>
        </li>
      );
    }
    case 'primary': {
      return (
        <Component
          className={headerToolItemVariants({ appearance })}
          href={href}
          /*onClick={item.onClick}*/
          external={external}
        >
          {children}
          {icon && <Icon icon={icon} />}
        </Component>
      );
    }
    default: {
      return null;
    }
  }
};

Object.defineProperty(HeaderMenuItemLink, 'componentType', {
  value: 'HeaderMenuItemLink',
  writable: false,
  enumerable: false,
});
