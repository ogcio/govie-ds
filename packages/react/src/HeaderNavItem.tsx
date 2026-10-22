import GiHeaderNavItem from '@/atoms/header/HeaderNavItem';
import type { Props as ItemProps } from '@/atoms/header/HeaderNavItem';
import GiHeaderNavItemButton from '@/atoms/header/HeaderNavItemButton';
import type { Props as ButtonProps } from '@/atoms/header/HeaderNavItemButton';

export type HeaderNavItemProps = Omit<ButtonProps, 'styles'> & {
  visible?: ItemProps['visible'];
  style?: React.CSSProperties;
};

export default function HeaderNavItem({ visible, style, ...props }: HeaderNavItemProps) {
  return (
    <GiHeaderNavItem visible={visible}>
      <GiHeaderNavItemButton {...props} styles={style as Record<string, string>} />
    </GiHeaderNavItem>
  );
}
