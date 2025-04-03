import { ThHTMLAttributes } from 'react';
import { cn } from '../cn.js';
import { TableAlign } from './table.js';

interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
}

export function TableHeader({
  align = 'left',
  className,
  children,
  ...props
}: TableHeaderProps) {
  const alignmentClass = {
    left: 'gi-text-left',
    center: 'gi-text-center',
    right: 'gi-text-right',
  }[align];

  return (
    <th className={cn('gi-table-th', alignmentClass, className)} {...props}>
      {children}
    </th>
  );
}
