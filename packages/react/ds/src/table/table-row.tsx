import React from 'react';

interface TableRowProps extends React.PropsWithChildren {
  className?: string;
}

export function TableRow({ children, className }: TableRowProps) {
  return <tr className={className}>{children}</tr>;
}
