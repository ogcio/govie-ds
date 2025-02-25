import type { LinkProps } from '../link/link.js';
import {
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
} from './breadcrumbs.js';

export type BreadcrumbLinkProps = Pick<LinkProps, 'href' | 'children'> &
  React.AriaAttributes;

type BreadcrumbChildrenType = React.ReactElement<
  | typeof BreadcrumbLink
  | typeof BreadcrumbCurrentLink
  | typeof BreadcrumbEllipsis
>;

export type BreadcrumbProps = {
  iconStart?: boolean;
  children: BreadcrumbChildrenType[] | BreadcrumbChildrenType;
};
