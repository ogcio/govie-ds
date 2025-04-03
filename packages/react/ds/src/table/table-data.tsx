import { TdHTMLAttributes } from 'react';
import { cn } from '../cn.js';
import { TableAlign } from './table.js';

interface TableDataProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
}

export function TableData({
  align = 'left',
  className,
  children,
  ...props
}: TableDataProps) {
  const alignmentClass = {
    left: 'gi-text-left',
    center: 'gi-text-center',
    right: 'gi-text-right',
  }[align];

  return (
    <td className={cn('gi-table-td', alignmentClass, className)} {...props}>
      {children}
    </td>
  );
}
