import CoreSideNavGroup from '@/atoms/sidenav/SideNavGroup';
import CoreSideNavItemButton, { type Props as ButtonProps } from '@/atoms/sidenav/SideNavItemButton';

export type SideNavGroupProps = Omit<ButtonProps, 'children' | 'selected' | 'ariaCurrent' | 'ariaExpanded'> & {
  children?: React.ReactNode;
  label?: React.ReactNode;
  actions?: React.ReactNode;
  open?: boolean;
  style?: React.CSSProperties;
};

export default function SideNavGroup({
  children,
  label,
  actions,
  open = false,
  ariaHidden,
  style,
  styles,
  ...buttonProps
}: SideNavGroupProps) {
  return (
    <CoreSideNavGroup
      open={open}
      listId={buttonProps.ariaControls}
      ariaHidden={ariaHidden}
      actions={actions}
      trigger={
        <CoreSideNavItemButton
          {...buttonProps}
          ariaHidden={ariaHidden}
          ariaExpanded={open}
          styles={(style as ButtonProps['styles']) ?? styles}
        >
          {label}
        </CoreSideNavItemButton>
      }
    >
      {children}
    </CoreSideNavGroup>
  );
}
