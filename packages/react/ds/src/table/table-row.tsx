import React from 'react';

export function TableRow({
  children,
  ...props
}: React.PropsWithChildren<React.TableHTMLAttributes<HTMLTableRowElement>>) {
  return <tr {...props}>{children}</tr>;
}
