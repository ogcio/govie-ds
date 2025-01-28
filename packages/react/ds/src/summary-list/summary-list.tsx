import { Link } from '../link/link.js';
import type {
  SummaryListActionProps,
  SummaryListProps,
  SummaryListValueProps,
  SummaryListRowProps,
} from './types.js';

export const SummaryListValue = ({ children }: SummaryListValueProps) => (
  <dd className="gi-summary-list-value">{children}</dd>
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

SummaryList.displayName = 'SummaryList';
SummaryListRow.displayName = 'SummaryRow';
SummaryListAction.displayName = 'SummaryListAction';
