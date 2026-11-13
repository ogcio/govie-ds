import CoreSideNavItem from '@/atoms/sidenav/SideNavItem';
import CoreSideNavItemButton, { type Props } from '@/atoms/sidenav/SideNavItemButton';
import CoreSideNavItemAction from '@/atoms/sidenav/SideNavItemAction';

export type SideNavItemProps = Props & {
  actions?: React.ReactNode;
  style?: React.CSSProperties;
};

export default function SideNavItem({ children, actions, ariaHidden, style, styles, ...props }: SideNavItemProps) {
  return (
    <CoreSideNavItem ariaHidden={ariaHidden}>
      <CoreSideNavItemButton {...props} ariaHidden={ariaHidden} styles={(style as Props['styles']) ?? styles}>
        {children}
      </CoreSideNavItemButton>
      <CoreSideNavItemAction>{actions}</CoreSideNavItemAction>
    </CoreSideNavItem>
  );
}
