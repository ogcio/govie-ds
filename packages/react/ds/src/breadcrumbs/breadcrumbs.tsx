import React from 'react';
import { Link } from '../link/link.js';

export type BreadcrumbProps = {
  links: { label: string; href: string }[];
};

export const Breadcrumbs = ({ links = [] }: BreadcrumbProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="gi-breadcrumbs"
      data-testid="govie-breadcrumbs"
    >
      <ol role="list">
        {links.map(({ href, label }, index) => (
          <li
            role="listitem"
            aria-label={`${label} page`}
            key={`breadcrumb_item_${index}`}
            data-testid={`breadcrumb_item_${index}`}
          >
            <Link
              href={href}
              {...(window.location.pathname === href
                ? { 'aria-current': 'page' }
                : {})}
            >
              {label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};
