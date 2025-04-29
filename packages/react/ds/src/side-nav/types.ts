import { IconId } from '../icon/icon.js';
import { SideNavItem } from './side-nav.js';

export type SideNavItemProps = {
  value: string;
  label: string;
  isExpandable?: boolean;
  icon?: IconId;
  onChange?: (selectedValues: string[]) => void;
};

export type SideNavProps = {
  className?: string;
  dataTestid?: string;
};
