import { LinkProps as ReactRouterLinkProps } from 'react-router';
import { DrawerPosition } from '../drawer/drawer.js';
import { IconId } from '../icon/icon.js';

export type HeaderItemMode = 'always' | 'mobile-only' | 'desktop-only';
export type HeaderItemAppearance = 'dropdown' | 'drawer';

// export type HeaderLinkItemType = {
//   href?: string;
//   external?: boolean;
//   onClick?: React.MouseEventHandler<HTMLElement>;
// };

// export type HeaderSlotItemType = {
//   component: React.ReactNode;
//   slotAppearance?: HeaderItemAppearance;
//   drawerPosition?: DrawerPosition;
// };

// export type HeaderCustomLinkItemType = {
//   component: React.ReactNode;
// };

export type HeaderItemType = 'slot' | 'divider' | 'link' | 'custom-link';

// export type HeaderItem = {
//   label?: string;
//   icon?: IconId;
//   itemType: HeaderItemType;
//   details?:
//     | HeaderLinkItemType
//     | HeaderSlotItemType
//     | ReactRouterLinkProps
//     | HeaderCustomLinkItemType;
// };

type CommonProps = { showItemMode?: HeaderItemMode };

type ConditionalProps =
  | {
      label?: string;
      icon?: IconId;
      component: React.ReactNode;
      href?: never;
      external?: never;
      onClick?: never;
      slotAppearance?: HeaderItemAppearance;
      drawerPosition?: DrawerPosition;
      itemType: 'slot';
    }
  | {
      label?: never;
      icon?: never;
      component?: never;
      href?: never;
      external?: never;
      onClick?: never;
      slotAppearance?: never;
      drawerPosition?: never;
      itemType: 'divider';
    }
  | {
      label?: string;
      icon?: IconId;
      component?: never;
      href?: string;
      external?: boolean;
      onClick?: React.MouseEventHandler<HTMLElement>;
      slotAppearance?: never;
      drawerPosition?: never;
      itemType: 'link';
    }
  | {
      label?: never;
      icon?: never;
      component: React.ReactNode;
      href?: never;
      external?: never;
      onClick?: never;
      slotAppearance?: never;
      drawerPosition?: never;
      itemType: 'custom-link';
    };

export type HeaderItem = CommonProps & ConditionalProps;

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
