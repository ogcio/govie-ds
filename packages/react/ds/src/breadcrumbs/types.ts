import type { LinkProps } from '../link/link.js';
import {
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
} from './breadcrumbs.js';

export type BreadcrumbLinkProps = Pick<LinkProps, 'href' | 'children'> &
  React.AriaAttributes;

export type BreadcrumbProps = {
  children: React.ReactElement<
    | typeof BreadcrumbLink
    | typeof BreadcrumbCurrentLink
    | typeof BreadcrumbEllipsis
  >[];
};
