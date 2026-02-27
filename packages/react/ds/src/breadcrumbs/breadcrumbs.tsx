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
    className="gi-text-ellipsis gi-whitespace-nowrap gi-line-clamp-1"
    {...ariaProps}
  >
    {children}
  </Link>
);

export const BreadcrumbCurrentLink = (props: BreadcrumbLinkProps) => (
  <BreadcrumbLink {...props} aria-current="page" />
);

const BreadcrumbSeparator = () => (
  <span className="gi-px-3 gi-text-gray-500">/</span>
);

export const Breadcrumbs = ({ children, iconStart }: BreadcrumbProps) => {
  const items = Array.isArray(children) ? children : [children];

  return (
    <nav
      aria-label={t('breadcrumbs.breadcrumbs', { defaultValue: 'Breadcrumbs' })}
      className="gi-flex gi-items-center gi-gap-1 [&>ol]:gi-flex [&>ol]:gi-list-none [&>ol]:gi-flex-wrap [&>ol]:[&>li]:gi-flex [&>ol]:[&>li]:gi-items-center [&>ol>li:not(:first-child)]:gi-mx-0"
    >
      <ol role="list">
        {iconStart && (
          <li role="listitem" className="gi-pr-1">
            <Icon aria-label="chevron-left" icon="chevron_left" size="sm" />
          </li>
        )}
        {items.map((component, index) => (
          <li role="listitem" key={`breadcrumb_item_${index}`}>
            {component}
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </li>
        ))}
      </ol>
    </nav>
  );
};
