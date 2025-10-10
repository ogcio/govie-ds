import { Link } from '../link/link.js';
import { useSummaryListContext } from './summary-list-context.js';
import { SummaryListActionProps } from './types.js';

export const SummaryListAction = ({
  children,
  ...props
}: SummaryListActionProps) => {
  useSummaryListContext();
  return <Link {...props}>{children}</Link>;
};

SummaryListAction.displayName = 'SummaryListAction';
Object.defineProperty(SummaryListAction, 'componentType', {
  value: 'SummaryListAction',
  writable: false,
  enumerable: false,
});
