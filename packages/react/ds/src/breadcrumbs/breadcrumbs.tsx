import { translate as t } from '../i18n/utility.js';
import { Icon } from '../icon/icon.js';
import { Link } from '../link/link.js';
import type { BreadcrumbLinkProps, BreadcrumbProps } from './types.js';

export const BreadcrumbEllipsis = () => (
  <div aria-hidden="true">
    <Icon className="gi-text-gray-700" icon="more_horiz" />
  </div>
);

export const BreadcrumbLink = ({
  href,
  children,
  asChild,
  ...ariaProps
}: BreadcrumbLinkProps) => (
  <Link
    noColor
    asChild={asChild}
    href={href}
    aria-label={`${children} page`}
    size="sm"
    className="gi-breadcrumbs-link "
    {...ariaProps}
  >
    {children}
  </Link>
);

export const BreadcrumbCurrentLink = (props: BreadcrumbLinkProps) => (
  <BreadcrumbLink {...props} aria-current="page" />
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
