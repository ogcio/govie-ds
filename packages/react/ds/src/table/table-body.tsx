import React from 'react';

export function TableBody({
  children,
  ...props
}: React.TableHTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props}>{children}</tbody>;
}
