import { Icon } from '../icon/icon.js';
import { Link } from '../link/link.js';
import type { BreadcrumbLinkProps, BreadcrumbProps } from './types.js';
import { translate as t } from '../i18n/util.js';

export const BreadcrumbEllipsis = () => (
  <div aria-hidden="true">
    <Icon className="gi-text-gray-700" icon="more_horiz" />
  </div>
);

export const BreadcrumbLink = ({
  href,
  children,
  ...ariaProps
}: BreadcrumbLinkProps) => (
  <Link
    noColor
    href={href}
    aria-label={`${children} page`}
    size="sm"
    {...ariaProps}
  >
    <span className="gi-breadcrumbs-link">{children}</span>
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

export const Breadcrumbs = ({ children, iconStart }: BreadcrumbProps) => {
  return (
    <nav
      aria-label={t('breadcrumbs.breadcrumbs', { defaultValue: 'Breadcrumbs' })}
      className="gi-breadcrumbs"
    >
      {iconStart && (
        <Icon aria-label="chevron-left" icon="chevron_left" size="sm" />
      )}
      <ol role="list">
        {Array.isArray(children) ? (
          children.map((Component, index) => (
            <li role="listitem" key={`breadcrumb_item_${index}`}>
              {Component}
            </li>
          ))
        ) : (
          <li role="listitem">{children}</li>
        )}
      </ol>
    </nav>
  );
};
