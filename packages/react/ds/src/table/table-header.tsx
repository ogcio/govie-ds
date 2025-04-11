import { ThHTMLAttributes } from 'react';
import { cn } from '../cn.js';
import { TableAlign, VerticalAlign } from './table.js';

interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
  valign?: VerticalAlign;
}

export function TableHeader({
  align = 'left',
  valign = 'middle',
  className,
  children,
  ...props
}: TableHeaderProps) {
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

  return (
    <th
      className={cn(
        alignmentClass,
        verticalAlignmentClass,
        'gi-table-th',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}
