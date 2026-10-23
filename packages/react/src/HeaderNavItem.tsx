import GiHeaderNavItem from '@/atoms/header/HeaderNavItem';
import type { Props as ItemProps } from '@/atoms/header/HeaderNavItem';
import GiHeaderNavItemButton from '@/atoms/header/HeaderNavItemButton';
import type { Props as ButtonProps } from '@/atoms/header/HeaderNavItemButton';

export type HeaderNavItemProps = ButtonProps & Pick<ItemProps, 'visible'> & { style?: React.CSSProperties };

export default function HeaderNavItem({ visible, style, styles, ...props }: HeaderNavItemProps) {
  return (
    <GiHeaderNavItem visible={visible}>
      <GiHeaderNavItemButton {...props} styles={(style ?? styles) as Record<string, string>} />
    </GiHeaderNavItem>
  );
}
