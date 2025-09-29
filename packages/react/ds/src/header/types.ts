import { LogoProps } from '../common/types.js';
import { DrawerPosition } from '../drawer/drawer.js';
import { IconId } from '../icon/icon.js';

export type HeaderItemMode = 'always' | 'mobile-only' | 'desktop-only';
export type HeaderItemAppearance = 'dropdown' | 'drawer';
export type HeaderItemType =
  | 'slot'
  | 'divider'
  | 'link'
  | 'custom-link'
  | 'render';
export type HeaderAppearance = 'default' | 'light';

type CommonProps = { showItemMode?: HeaderItemMode };

type ConditionalProps =
  | {
      label?: string;
      ariaLabel?: string;
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
      ariaLabel?: string;
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
      ariaLabel?: string;
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
      ariaLabel?: string;
      icon?: never;
      component: React.ReactNode;
      href?: never;
      external?: never;
      onClick?: never;
      slotAppearance?: never;
      drawerPosition?: never;
      itemType: 'custom-link';
    }
  | {
      label?: string;
      ariaLabel?: string;
      icon?: never;
      component?: never;
      href?: never;
      external?: never;
      onClick?: never;
      slotAppearance?: never;
      drawerPosition?: never;
      render: () => React.ReactNode;
      itemType: 'render';
    };

export type HeaderItem = CommonProps & ConditionalProps;

export type SecondaryLink =
  | {
      href: string;
      label: string;
      slot?: undefined;
    }
  | {
      slot: React.ReactNode;
      href?: undefined;
      label?: undefined;
    };

export type HeaderProps = {
  title?: string;
  logo?: LogoProps;
  addDefaultMobileMenu?: boolean;
  mobileMenuLabel?: string;
  showMenuLabel?: boolean;
  items?: HeaderItem[];
  secondaryLinks?: SecondaryLink[];
  fullWidth?: boolean;
  showTitleOnMobile?: boolean;
  dataTestid?: string;
  appearance?: HeaderAppearance;
};
