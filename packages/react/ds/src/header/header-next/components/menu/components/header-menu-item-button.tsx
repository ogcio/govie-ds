import { Slot } from '@radix-ui/react-slot';
import { Button } from '../../../../../button/button.js';
import { Icon } from '../../../../../icon/icon.js';
import { HeaderMenuItemButtonProps } from '../../../../types.js';
import { headerToolItemVariants } from '../../../../variants.js';
import { useHeaderContext } from '../../../header-context.js';
import { useHeaderMenuSection } from '../header-menu-context.js';

const MenuButton = ({ showItemMode, ...props }: any) => {
  return <Button variant="primary" data-item-mode={showItemMode} {...props} />;
};

export const HeaderMenuItemButton = ({
  asChild,
  icon,
  children,
  ...props
}: HeaderMenuItemButtonProps) => {
  const section = useHeaderMenuSection();
  const context = useHeaderContext();

  if (!section || section === 'secondary') {
    throw new Error(
      'HeaderMenuItemButton must be used within a HeaderPrimaryMenu',
    );
  }
  const appearance = context.variant;
  const Component = asChild ? Slot : MenuButton;

  return (
    <Component className={headerToolItemVariants({ appearance })} {...props}>
      {children}
      {icon && <Icon icon={icon} ariaHidden={true} />}
    </Component>
  );
};

Object.defineProperty(HeaderMenuItemButton, 'componentType', {
  value: 'HeaderMenuItemButton',
  writable: false,
  enumerable: false,
});
