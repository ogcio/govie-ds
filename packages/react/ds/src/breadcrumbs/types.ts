import { PropsWithChildren } from 'react';
import {
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
} from './breadcrumbs.js';

type BreadcrumbLinkBaseProps = PropsWithChildren<{
  asChild?: false;
  href: string;
}> &
  React.AriaAttributes;

type BreadcrumbLinkAsChildProps = PropsWithChildren<{
  asChild: true;
  href?: string;
}> &
  React.AriaAttributes;

export type BreadcrumbLinkProps =
  | BreadcrumbLinkBaseProps
  | BreadcrumbLinkAsChildProps;

type BreadcrumbChildrenType = React.ReactElement<
  | typeof BreadcrumbLink
  | typeof BreadcrumbCurrentLink
  | typeof BreadcrumbEllipsis
>;

export type BreadcrumbProps = {
  iconStart?: boolean;
  children: BreadcrumbChildrenType[] | BreadcrumbChildrenType;
};
