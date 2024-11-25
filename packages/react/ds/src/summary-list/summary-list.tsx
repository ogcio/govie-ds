import { cloneElement, ReactElement } from 'react';
import type {
  SummaryListActionProps,
  SummaryListProps,
  SummaryListTitleProps,
  SummaryListValueProps,
  SummaryListRowProps,
} from './types.js';
import { Link } from '../link/link.js';

export const SummaryListTitle = ({ children }: SummaryListTitleProps) => (
  <dt>{children}</dt>
);

export const SummaryListValue = ({ children }: SummaryListValueProps) => (
  <dd className="gi-summary-list-value">
    {Array.isArray(children)
      ? children.map((label, i) => <p key={`${label}_${i}`}>{label}</p>)
      : children}
  </dd>
);

export const SummaryListAction = ({
  href,
  children,
}: SummaryListActionProps) => (
  <dd className="gi-summary-list-actions">
    <Link href={href}>{children}</Link>
  </dd>
);

export const SummaryListRow = ({
  children,
  withBorder,
  ...props
}: SummaryListRowProps) => {
  return (
    <dl data-border={withBorder?.toString()} {...props} role="listitem">
      {children}
    </dl>
  );
};

const SummaryList = ({ children }: SummaryListProps) => {
  return (
    <div className="gi-summary-list" role="list">
      {children}
    </div>
  );
};

export default SummaryList;
