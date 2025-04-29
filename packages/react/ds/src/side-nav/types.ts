import { IconId } from '../icon/icon.js';

export type SideNavItemProps = {
  value: string;
  label: string;
  parent?: boolean;
  expandable?: boolean;
  icon?: IconId;
};

export type SideNavProps = {
  className?: string;
  dataTestid?: string;
  onChange?: (value: string) => void;
};
