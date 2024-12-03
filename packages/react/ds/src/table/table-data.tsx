import React from 'react';

interface TableDataProps extends React.PropsWithChildren {
  className?: string;
  colSpan?: number;
}

export function TableData({ children, className, colSpan }: TableDataProps) {
  return (
    <td className={`gi-table-td ${className || ''}`} colSpan={colSpan}>
      {children}
    </td>
  );
}
