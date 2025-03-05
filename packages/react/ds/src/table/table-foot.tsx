import React from 'react';

export function TableFoot({
  children,
  ...props
}: React.PropsWithChildren<
  React.TableHTMLAttributes<HTMLTableSectionElement>
>) {
  return <tfoot {...props}>{children}</tfoot>;
}
