import React from 'react';

export function TableBody({
  children,
  ...props
}: React.PropsWithChildren<
  React.TableHTMLAttributes<HTMLTableSectionElement>
>) {
  return <tbody {...props}>{children}</tbody>;
}
