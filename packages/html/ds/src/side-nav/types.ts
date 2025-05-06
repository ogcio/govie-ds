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
  parent?: boolean;
  open?: boolean;
  children?: SideNavItemProps[];
};
