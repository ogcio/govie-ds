import { ReactNode } from 'react';
import { LogoProps } from '../common/types.js';
import { DrawerPosition } from '../drawer/drawer.js';
import { IconId } from '../icon/icon.js';

export type HeaderItemMode = 'always' | 'mobile-only' | 'desktop-only';
export type HeaderItemAppearance = 'dropdown' | 'drawer';
export type HeaderItemType = 'slot' | 'divider' | 'link' | 'custom-link';

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
  logo?: LogoProps;
  addDefaultMobileMenu?: boolean;
  mobileMenuLabel?: string;
  items?: HeaderItem[];
  /**
   * @deprecated Use `utilitySlot` instead.
   */
  secondaryLinks?: {
    href: string;
    label: string;
  }[];
  utilitySlot?: ReactNode;
  fullWidth?: boolean;
  showTitleOnMobile?: boolean;
  dataTestid?: string;
};
