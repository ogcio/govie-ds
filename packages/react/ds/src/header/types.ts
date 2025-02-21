import { LinkProps as ReactRouterLinkProps } from 'react-router';
import { DrawerPosition } from '../drawer/drawer.js';
import { IconId } from '../icon/icon.js';

export type HeaderItemMode = 'always' | 'mobile-only' | 'desktop-only';
export type HeaderItemAppearance = 'dropdown' | 'drawer';

export type HeaderLinkItemType = {
  href?: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export type HeaderSlotItemType = {
  component: React.ReactNode;
  slotAppearance?: HeaderItemAppearance;
  drawerPosition?: DrawerPosition;
};

export type HeaderItemType = 'slot' | 'divider' | 'link' | 'react-router-link';

export type HeaderItem = {
  label?: string;
  icon?: IconId;
  itemType: HeaderItemType;
  details?: HeaderLinkItemType | HeaderSlotItemType | ReactRouterLinkProps;
  showItemMode?: HeaderItemMode;
};

export type HeaderProps = {
  title?: string;
  logo?: {
    imageSmall?: string;
    imageLarge?: string;
    href?: string;
    external?: boolean;
    alt?: string;
  };
  addDefaultMobileMenu?: boolean;
  mobileMenuLabel?: string;
  items?: HeaderItem[];
  secondaryLinks?: {
    href: string;
    label: string;
  }[];
  fullWidth?: boolean;
  showTitleOnMobile?: boolean;
  dataTestid?: string;
};
