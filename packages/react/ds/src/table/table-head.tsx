import clsx from 'clsx';
import React from 'react';

export type TableHeadSize =
  | 'xs-fixed'
  | 'sm-fixed'
  | 'md-fixed'
  | 'lg-flex'
  | 'fluid';

export interface TableHeadProps
  extends React.TableHTMLAttributes<HTMLTableSectionElement> {
  size?: TableHeadSize;
}

export function TableHead({
  children,
  size,
  className,
  ...props
}: TableHeadProps) {
  const sizeClass = size ? `gi-table-th-${size}` : undefined;

  return (
    <thead {...props} className={clsx(sizeClass, className)}>
      {children}
    </thead>
  );
}
