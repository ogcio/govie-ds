import { HeaderMenuItemSlotProps } from '../../../../types.js';
import { headerSecondaryLinkSlotItemVariants } from '../../../../variants.js';
import { useHeaderContext } from '../../../header-context.js';
import { useHeaderMenuSection } from '../header-menu-context.js';

export const HeaderMenuItemSlot = ({ children }: HeaderMenuItemSlotProps) => {
  const context = useHeaderContext();
  const section = useHeaderMenuSection();

  if (!context) {
    throw new Error(
      'HeaderMenuItemSlot must be used within a HeaderSecondaryMenu',
    );
  }

  const appearance = context.variant;

  switch (section) {
    case 'secondary': {
      return (
        <li>
          {
            <div
              className={headerSecondaryLinkSlotItemVariants({ appearance })}
              data-appearance={appearance}
            >
              {children}
            </div>
          }
        </li>
      );
    }
    default: {
      return null;
    }
  }
};

Object.defineProperty(HeaderMenuItemSlot, 'componentType', {
  value: 'HeaderMenuItemSlot',
  writable: false,
  enumerable: false,
});
