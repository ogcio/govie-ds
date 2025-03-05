import React from 'react';

export function TableFoot({
  children,
  ...props
}: React.TableHTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot {...props}>{children}</tfoot>;
}
