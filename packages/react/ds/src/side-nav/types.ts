import { IconId } from '../icon/icon.js';

export type SideNavItemProps = {
  value: string;
  label: string;
  href?: string;
  primary?: boolean;
  secondary?: boolean;
  open?: boolean;
  expandable?: boolean;
  icon?: IconId;
};

export type SideNavProps = {
  className?: string;
  dataTestid?: string;
  value?: string;
  onChange?: (value: string) => void;
};
