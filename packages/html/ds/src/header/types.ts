import { DrawerPosition } from '../drawer/types';

export type HeaderItemMode = 'always' | 'mobile-only' | 'desktop-only';
export type HeaderItemAppearance = 'dropdown' | 'drawer';
export type HeaderItemType = 'slot' | 'divider' | 'link' | 'custom-link';
export type HeaderAppearance = 'default' | 'light';

type CommonProps = { showItemMode?: HeaderItemMode };

type ConditionalProps =
  | {
      label?: string;
      icon?: string;
      component: string;
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
      icon?: string;
      component?: never;
      href?: string;
      external?: boolean;
      onClick?: () => void;
      slotAppearance?: never;
      drawerPosition?: never;
      itemType: 'link';
    }
  | {
      label?: never;
      icon?: never;
      component: string;
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
    href?: string;
    label?: string;
    slot?: any;
  }[];
  fullWidth?: boolean;
  showTitleOnMobile?: boolean;
  dataTestid?: string;
  appearance?: HeaderAppearance;
};
