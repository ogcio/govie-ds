'use client';
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
    return <Icon inline icon="swap_vert" size="sm" />;
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

  const handleSort = (event: any) => {
    if (onSort && isChildrenString) {
      event.preventDefault();
      onSort(event);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSort(event);
    }
  };

  return (
    <th
      className={cn(
        alignmentClass,
        verticalAlignmentClass,
        'gi-table-th',
        className,
        { 'gi-w-12': !isChildrenString },
      )}
      role={onSort ? 'button' : undefined}
      data-sorted={!!onSort}
      data-header-string={isChildrenString}
      tabIndex={onSort && isChildrenString ? 0 : -1}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div
        className={cn(alignmentClass, {
          'gi-flex gi-gap-1 gi-h-full gi-items-center': isChildrenString,
          'gi-justify-center': align === 'center',
          'gi-justify-start': align === 'left',
          'gi-justify-end': align === 'right',
        })}
        onClick={handleSort}
        onKeyDown={handleKeyDown}
      >
        {children}
        {!!onSort && getSortedIcon(isChildrenString, sorted)}
      </div>
    </th>
  );
}
