import React from 'react';

export function Column({
  children,
  ...props
}: React.PropsWithChildren<React.TableHTMLAttributes<HTMLTableColElement>>) {
  return <col {...props}>{children}</col>;
}
