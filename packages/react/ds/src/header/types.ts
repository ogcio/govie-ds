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
      closeLabel?: string;
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
      closeLabel?: string;
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
      closeLabel?: string;
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
      closeLabel?: string;
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
  dataTestid?: string; // legacy key kept for BC
  fullWidth?: boolean;
  children?: ReactNode;
  /**
   * @deprecated Replaced by `variant` (new composable API).
   * Use: `<Header variant="default" | "light">…</Header>`.
   */
  appearance?: HeaderAppearance;
  /**
   * @deprecated Use `<HeaderTitle>` child instead.
   * Example: `<Header><HeaderTitle>My site</HeaderTitle></Header>`.
   */
  title?: string;

  /**
   * @deprecated Use `<HeaderLogo>` + `<SomeLogo />` children.
   * Example: `<Header><HeaderLogo><img src="..."/></HeaderLogo></Header>`.
   */
  logo?: LogoProps;
  /**
   * @deprecated Mobile menu is now composed with `<HeaderPrimaryMenu>` and item buttons/links.
   * Use: `<HeaderPrimaryMenu><HeaderMenuItemButton showItemMode="mobile-only" … /></HeaderPrimaryMenu>`.
   */
  addDefaultMobileMenu?: boolean;

  /**
   * @deprecated Provide your own button/label via `<HeaderPrimaryMenu>` children.
   * Use: `<HeaderMenuItemButton aria-label="Open menu">Menu</HeaderMenuItemButton>`.
   */
  mobileMenuLabel?: string;
  /**
   * @deprecated Control visibility per item with `showItemMode`.
   * Use: `<HeaderMenuItemButton showItemMode="desktop-only" />` (or `mobile-only`, `always`).
   */
  showMenuLabel?: boolean;
  /**
   * @deprecated Replace with composable menu children.
   * Use:
   * `<HeaderPrimaryMenu>
   *    <HeaderMenuItemLink href="/departments">Departments</HeaderMenuItemLink>
   *    <HeaderMenuItemButton icon="search" …>Search</HeaderMenuItemButton>
   *  </HeaderPrimaryMenu>`
   */
  items?: HeaderItem[];
  /**
   * @deprecated Replace with `<HeaderSecondaryMenu>` + `<HeaderMenuItemLink|Slot>`.
   * Use:
   * `<HeaderSecondaryMenu>
   *    <HeaderMenuItemLink href="/ga">Gaeilge</HeaderMenuItemLink>
   *    <HeaderMenuItemSlot><UserChip/></HeaderMenuItemSlot>
   *  </HeaderSecondaryMenu>`
   */
  secondaryLinks?: SecondaryLink[];
  /**
   * @deprecated The title’s responsive behavior is controlled by your child components and CSS.
   * Use: media utilities (e.g., hide/show via classes) around `<HeaderTitle>`.
   */
  showTitleOnMobile?: boolean;
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
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    asChild?: boolean;
    showItemMode?: HeaderItemMode;
    icon?: IconId;
  }
>;
export type HeaderPrimaryMenuProps = PropsWithChildren<
  ComponentPropsWithoutRef<'nav'>
>;
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
export type HeaderMenuItemSlotProps = PropsWithChildren<
  ComponentPropsWithoutRef<'div'> & {
    children?: ReactNode;
  }
>;
