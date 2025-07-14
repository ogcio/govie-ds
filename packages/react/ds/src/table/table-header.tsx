import { ThHTMLAttributes } from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import { TableAlign, VerticalAlign } from './table.js';

type SortedType = 'asc' | 'desc' | false;

interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
  valign?: VerticalAlign;
  sorted?: SortedType;
  onSort?: (event: React.MouseEvent) => void;
}

const getSortedIcon = (isChildrenString: boolean, sorted: SortedType) => {
  if (!isChildrenString) {
    return null;
  }

  if (!sorted) {
    return <Icon inline icon="unfold_more" size="sm" />;
  }
  return (
    <Icon
      inline
      icon={sorted === 'asc' ? 'arrow_upward' : 'arrow_downward'}
      size="sm"
    />
  );
};

export function TableHeader({
  align = 'left',
  valign = 'middle',
  className,
  sorted = false,
  onSort,
  children,
  ...props
}: TableHeaderProps) {
  const isChildrenString = typeof children === 'string';
  const alignmentClass = {
    left: 'gi-text-left',
    center: 'gi-text-center',
    right: 'gi-text-right',
  }[align];

  const verticalAlignmentClass = {
    top: 'gi-align-top',
    middle: 'gi-align-middle',
    bottom: 'gi-align-bottom',
  }[valign];

  const handleSort = (event: React.MouseEvent) => {
    if (onSort && isChildrenString) {
      event.preventDefault();
      onSort(event);
    }
  };

  return (
    <th
      className={cn(
        alignmentClass,
        verticalAlignmentClass,
        'gi-table-th',
        className,
      )}
      role={onSort ? 'button' : undefined}
      tabIndex={onSort && isChildrenString ? 0 : -1}
      data-sorted={!!onSort}
      data-header-string={isChildrenString}
      {...props}
    >
      <div
        className={cn({
          'gi-flex gi-items-center gi-gap-1': isChildrenString,
        })}
        onClick={handleSort}
      >
        {children}
        {!!onSort && getSortedIcon(isChildrenString, sorted)}
      </div>
    </th>
  );
}
