import CoreSideNavGroup from '@/atoms/sidenav/SideNavGroup';
import CoreSideNavItemButton, { type Props as ItemButtonProps } from '@/atoms/sidenav/SideNavItemButton';

export type SideNavGroupProps = Omit<
  ItemButtonProps,
  'children' | 'selected' | 'ariaCurrent' | 'ariaExpanded' | 'styles'
> & {
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
          styles={style as ItemButtonProps['styles']}
        >
          {label}
        </CoreSideNavItemButton>
      }
    >
      {children}
    </CoreSideNavGroup>
  );
}
