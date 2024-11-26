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
      ? children.map((label, index) => <p key={`${label}_${index}`}>{label}</p>)
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
    <dl data-border={withBorder?.toString()} role="listitem" {...props}>
      <dt>{label}</dt>
      {children}
    </dl>
  );
};

const SummaryList = ({ children }: SummaryListProps) => {
  return (
    <div className="gi-summary-list" role="list" aria-label="Summary list">
      {children}
    </div>
  );
};

export default SummaryList;
