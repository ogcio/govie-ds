import { SideNavItem } from './side-nav-item.js';

export type SideNavItemProps = {
  children: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (selectedValues: string[]) => void;
};

export type SideNavProps = {
  children:
    | React.ReactElement<typeof SideNavItem>[]
    | React.ReactElement<typeof SideNavItem>;
  className?: string;
  dataTestid?: string;
};
