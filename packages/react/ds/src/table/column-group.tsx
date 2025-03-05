import React from 'react';

export function ColumnGroup({
  children,
  ...props
}: React.TableHTMLAttributes<HTMLTableColElement>) {
  return <colgroup {...props}>{children}</colgroup>;
}
