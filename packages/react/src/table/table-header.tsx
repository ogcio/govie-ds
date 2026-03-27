'use client';
import { ThHTMLAttributes, Children } from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import { TableAlign, VerticalAlign } from './table.js';

type SortedType = 'asc' | 'desc' | false;

export type TableHeaderSize =
  | 'xs-fixed'
  | 'sm-fixed'
  | 'md-fixed'
  | 'lg-flex'
  | 'fluid';

interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
  valign?: VerticalAlign;
  sorted?: SortedType;
  onSort?: (event: React.MouseEvent) => void;
  size?: TableHeaderSize;
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
  size,
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

  const sizeClass = size ? `gi-table-th-${size}` : undefined;

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

  const hasChildren = Children.count(children) > 0;

  let role;
  if (sorted && isChildrenString) {
    role = 'button';
  } else if (!hasChildren) {
    role = 'cell'; // Header without children will raise accessibility warnings
  }
  return (
    <th
      className={cn(
        alignmentClass,
        verticalAlignmentClass,
        'gi-table-th',
        sizeClass,
        className,
        { 'gi-w-12': !isChildrenString },
      )}
      role={role}
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
