import { Fragment } from 'react';
import { Link } from '../link/link.js';
import type {
  SummaryListActionProps,
  SummaryListProps,
  SummaryListValueProps,
  SummaryListRowProps,
} from './types.js';

export const SummaryListValue = ({ children }: SummaryListValueProps) => (
  <dd className="gi-summary-list-value">
    {Array.isArray(children)
      ? children.reduce<React.ReactNode[]>((previous, label, index) => {
          if (index > 0) {
            previous.push(<br key={`br_${index}`} />);
          }
          previous.push(<Fragment key={`${label}_${index}`}>{label}</Fragment>);
          return previous;
        }, [])
      : children}
  </dd>
);

export const SummaryListAction = ({
  href,
  children,
}: SummaryListActionProps) => (
  <dd className="gi-summary-list-actions">
    <Link href={href} aria-label={`Link action: ${children}`}>
      {children}
    </Link>
  </dd>
);

export const SummaryListRow = ({
  children,
  label,
  withBorder,
  ...props
}: SummaryListRowProps) => {
  return (
    <dl data-border={withBorder?.toString()} {...props}>
      <dt>{label}</dt>
      {children}
    </dl>
  );
};

export const SummaryList = ({ children }: SummaryListProps) => {
  return (
    <div className="gi-summary-list" aria-label="Summary list">
      {children}
    </div>
  );
};

SummaryListRow.displayName = 'SummaryList';
