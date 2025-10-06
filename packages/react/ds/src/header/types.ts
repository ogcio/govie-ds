import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { LogoProps } from '../common/types.js';
import { DrawerPosition } from '../drawer/drawer.js';
import { IconId } from '../icon/icon.js';

export type HeaderItemMode = 'always' | 'mobile-only' | 'desktop-only';
export type HeaderItemAppearance = 'dropdown' | 'drawer';
export type HeaderItemType = 'slot' | 'divider' | 'link' | 'custom-link';
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

export type HeaderProps = ComponentPropsWithoutRef<'header'> & {
  dataTestid?: string;
  /** @deprecated Use "variant" instead */
  appearance?: HeaderAppearance;
  variant?: HeaderVariant;
  fullWidth?: boolean;
  children?: any;
  /** @deprecated Use <HeaderTitle> instead */
  title?: string;
  /** @deprecated Use <HeaderLogo> instead */
  logo?: LogoProps;
  /** @deprecated  */
  addDefaultMobileMenu?: boolean;
  /** @deprecated */
  mobileMenuLabel?: string;
  /** @deprecated */
  showMenuLabel?: boolean;
  /** @deprecated Use <HeaderPrimaryMenuItems> with nested Header components instead */
  items?: HeaderItem[];
  /** @deprecated Use <HeaderSecondaryMenuItems> instead */
  secondaryLinks?: SecondaryLink[];
  /** @deprecated */
  showTitleOnMobile?: boolean;
  /** @deprecated */
};

/* HeaderNext */
export type HeaderNextProps = ComponentPropsWithoutRef<'header'> & {
  children?: ReactNode;
  variant?: HeaderVariant;
  fullWidth?: boolean;
};

export type HeaderLogoProps = PropsWithChildren;
export type HeaderVariant = 'default' | 'light';
export type HeaderMenuItemLinkProps =
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
    showItemMode?: HeaderItemMode;
    icon?: IconId;
    href?: string;
    external?: boolean;
    children: ReactNode;
  };

export type HeaderMenuItemButtonProps = PropsWithChildren<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    asChild?: boolean;
    showItemMode?: HeaderItemMode;
    icon?: IconId;
  }
>;
export type HeaderPrimaryMenuProps = PropsWithChildren<
  ComponentPropsWithoutRef<'nav'>
>;
export type HeaderMenuItemSlotProps = PropsWithChildren;
export type HeaderMenuSectionContextProps = 'primary' | 'secondary';
export type HeaderSlotContainerProps = PropsWithChildren<
  {
    variant: HeaderVariant;
    className?: string;
  } & ComponentPropsWithoutRef<'div'>
>;
export type HeaderTitleProps = PropsWithChildren<
  {
    className?: string;
  } & ComponentPropsWithoutRef<'div'>
>;
export type HeaderSecondaryMenuProps = PropsWithChildren<
  ComponentPropsWithoutRef<'nav'>
>;
