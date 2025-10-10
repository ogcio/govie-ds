import { useSummaryListContext } from './summary-list-context.js';
import { SummaryListValueProps } from './types.js';

export const SummaryListValue = ({
  children,
  ...props
}: SummaryListValueProps) => {
  useSummaryListContext();
  return <td {...props}>{children}</td>;
};

SummaryListValue.displayName = 'SummaryListValue';
Object.defineProperty(SummaryListValue, 'componentType', {
  value: 'SummaryListValue',
  writable: false,
  enumerable: false,
});
