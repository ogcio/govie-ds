import React from 'react';
import { cn } from '../cn.js';

export function TableData({
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  const baseClasses = 'gi-table-td';
  return (
    <td className={cn(baseClasses, props.className)} {...props}>
      {children}
    </td>
  );
}
