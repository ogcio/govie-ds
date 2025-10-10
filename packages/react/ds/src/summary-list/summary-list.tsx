import { Children, ReactElement } from 'react';
import { cn } from '../cn.js';
import { getSpecialComponentType } from '../utilities.js';
import { SummaryListProvider } from './summary-list-context.js';
import type {
  SummaryListHeaderProps,
  SummaryListProps,
  SummaryListRowProps,
} from './types.js';

export const SummaryList = ({
  children,
  className,
  withBorder,
  ...props
}: SummaryListProps) => {
  const allChildren = Children.toArray(children);
  const header = allChildren.filter(
    (child) => getSpecialComponentType(child) === 'SummaryListHeader',
  ) as ReactElement<SummaryListHeaderProps>[];
  const rows = allChildren.filter(
    (child) => getSpecialComponentType(child) === 'SummaryListRow',
  ) as ReactElement<SummaryListRowProps>[];

  return (
    <SummaryListProvider>
      <div
        className={cn('gi-summary-list', {
          'gi-border gi-border-color-border-system-neutral-muted': withBorder,
        })}
      >
        <table className={className} role="table" {...props}>
          {header ? <thead>{header}</thead> : null}
          <tbody>{rows}</tbody>
        </table>
      </div>
    </SummaryListProvider>
  );
};

SummaryList.displayName = 'SummaryList';
