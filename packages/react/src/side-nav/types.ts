import type { ReactNode } from 'react';
import { type Props as HeadingProps } from '@/Heading.js';
import type { IconId } from '@/icon/icon.js';

export type SideNavItemProps = {
  value: string;
  label: ReactNode;
  href?: string;
  asChild?: boolean;
  primary?: boolean;
  secondary?: boolean;
  open?: boolean;
  expandable?: boolean;
  icon?: IconId | Exclude<ReactNode, string>;
  actions?: ReactNode;
};

export type SideNavProps = {
  className?: string;
  dataTestid?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export type SideNavHeadingProps = {
  secondary?: boolean;
} & HeadingProps;
