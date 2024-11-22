import { Link } from '../link/link.js';
import type { BreadcrumbLinkProps, BreadcrumbProps } from './types.js';

export const BreadcrumbEllipsis = () => (
  <div className="gi-breadcrumb-ellipsis" aria-hidden="true">
    <div />
    <div />
    <div />
  </div>
);

export const BreadcrumbLink = ({
  href,
  children,
  ...ariaProps
}: BreadcrumbLinkProps) => (
  <Link noColor href={href} aria-label={`${children} page`} {...ariaProps}>
    {children}
  </Link>
);

export const BreadcrumbCurrentLink = ({
  href,
  children,
}: BreadcrumbLinkProps) => (
  <BreadcrumbLink href={href} aria-current="page">
    {children}
  </BreadcrumbLink>
);

export const Breadcrumbs = ({ children }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumbs" className="gi-breadcrumbs">
      <ol role="list">
        {children.map((Component, index) => (
          <li role="listitem" key={`breadcrumb_item_${index}`}>
            {Component}
          </li>
        ))}
      </ol>
    </nav>
  );
};
