import { TdHTMLAttributes } from 'react';
import { cn } from '../cn.js';
import { TableAlign, VerticalAlign } from './table.js';

interface TableDataProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
  valign?: VerticalAlign;
}

export function TableData({
  align = 'left',
  valign = 'middle',
  className,
  children,
  ...props
}: TableDataProps) {
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
    <td
      className={cn(
        alignmentClass,
        verticalAlignmentClass,
        'gi-table-td',
        className,
      )}
      {...props}
    >
      {children}
    </td>
  );
}
