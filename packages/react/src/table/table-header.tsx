'use client';
import type { ThHTMLAttributes } from 'react';
import { Children } from 'react';
import { cn } from '@/cn.js';
import type { TableAlign, VerticalAlign } from './table.js';
import SwapVertical from '@/atoms/icons/SwapVertical';
import { ICON_SIZE as size } from '@/atoms/constants';
import ArrowUpward from '@/atoms/icons/ArrowUpward';
import ArrowDownward from '@/atoms/icons/ArrowDownward';

type SortedType = 'asc' | 'desc' | false;

export type TableHeaderSize = 'xs-fixed' | 'sm-fixed' | 'md-fixed' | 'lg-flex' | 'fluid';

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
  switch (sorted) {
    case false:
      return <SwapVertical size={size.SM} className="gi-shrink-0" />;
    case 'asc':
      return <ArrowUpward size={size.SM} className="gi-shrink-0" />;
    default:
      return <ArrowDownward size={size.SM} className="gi-shrink-0" />;
  }
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
      className={cn(alignmentClass, verticalAlignmentClass, 'gi-table-th', sizeClass, className, {
        'gi-w-12': !isChildrenString,
      })}
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
