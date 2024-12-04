import React from 'react';
import { cn } from '../cn.js';

interface TableDataProps extends React.PropsWithChildren {
  className?: string;
  colSpan?: number;
}

export function TableData({ children, className, colSpan }: TableDataProps) {
  return (
    <td className={cn('gi-table-td', className || '')} colSpan={colSpan}>
      {children}
    </td>
  );
}
