export type SideNavProps = {
  items: SideNavItemProps[];
};

export type SideNavItemProps = {
  label: string;
  value: string;
  href?: string;
  icon?: string;
  expandable?: boolean;
  selected?: boolean;
  primary?: boolean;
  secondary?: boolean;
  open?: boolean;
  children?: SideNavItemProps[];
};
