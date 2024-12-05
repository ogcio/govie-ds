import React from 'react';
import { cn } from '../cn.js';

interface TableDataProps extends React.PropsWithChildren {
  className?: string;
  colSpan?: number;
}

export function TableData({ children, className, colSpan }: TableDataProps) {
  const baseClasses = 'gi-table-td';
  return (
    <td className={cn(baseClasses, className)} colSpan={colSpan}>
      {children}
    </td>
  );
}
