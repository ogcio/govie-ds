import React from 'react';

export function TableRow({
  children,
  ...props
}: React.TableHTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props}>{children}</tr>;
}
