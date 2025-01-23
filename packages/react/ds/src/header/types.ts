import { DrawerPosition } from '../drawer/drawer.js';
import { IconId } from '../icon/icon.js';

export type HeaderItemMode = 'always' | 'mobile-only' | 'desktop-only';
export type HeaderItemAppearance = 'dropdown' | 'drawer';

export type HeaderLinkItemType = {
  href: string;
  external?: boolean;
};

export type HeaderSlotItemType = {
  component: React.ReactNode;
  slotAppearance?: HeaderItemAppearance;
  drawerPosition?: DrawerPosition;
};

export type HeaderItemType = 'slot' | 'divider' | 'link';

export type HeaderItem = {
  label?: string;
  icon?: IconId;
  itemType: HeaderItemType;
  details?: HeaderLinkItemType | HeaderSlotItemType;
  showItemMode?: HeaderItemMode;
};

export type HeaderProps = {
  title?: string;
  logo?: {
    image?: string;
    href?: string;
    external?: boolean;
    alt?: string;
  };
  addDefaultMobileMenu?: boolean;
  items?: HeaderItem[];
  secondaryLinks?: {
    href: string;
    label: string;
  }[];
  fullWidth?: boolean;
};
