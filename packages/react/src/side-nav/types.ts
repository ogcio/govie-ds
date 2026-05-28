import type { ReactNode } from 'react';
import type { Props as GiSideNavProps } from '@/atoms/sideNav/SideNav';
import type { Props as GiSideNavItemProps } from '@/atoms/sideNav/SideNavItem';
import type { IconId } from '@/icon/icon';

export type SideNavItemProps = Omit<
  GiSideNavItemProps,
  'selected' | 'expanded' | 'expandedContentId' | 'expandedContent' | 'expandedLabel'
> & {
  value: string;
  open?: boolean;
  expandable?: boolean;
  primary?: boolean;
  href?: string;
  ariaLabel?: string;
  /** Text label or composed ReactNode for the item content. When a string, auto-wraps in a Paragraph with `gi-flex-1`. When a ReactNode, rendered as-is (client controls layout). */
  label?: ReactNode;
  /** Pass a ReactNode (e.g. `<MailIcon />`). String IconId values are deprecated. */
  icon?: ReactNode | IconId;
  /** Interactive controls (e.g. IconButton) rendered as siblings to the button/link. */
  actions?: ReactNode;
  /** When true, the first child element (e.g. NextLink) replaces the default `<a>`. */
  asChild?: boolean;
  /** @deprecated No longer needed, level is auto-detected from nesting depth. */
  secondary?: boolean;
};

export type SideNavProps = GiSideNavProps & {
  value?: string;
  onChange?: (value: string) => void;
  /** @deprecated Use dataTestId instead */
  dataTestid?: string;
};
