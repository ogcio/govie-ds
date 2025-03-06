import React from 'react';

export function Column({
  children,
  ...props
}: React.TableHTMLAttributes<HTMLTableColElement>) {
  return <col {...props}>{children}</col>;
}
