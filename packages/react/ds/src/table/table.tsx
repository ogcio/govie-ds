import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../cn.js';

export type TableAlign = 'left' | 'center' | 'right';

const tableVariants = tv({
  base: 'gi-table',
  variants: {
    layout: {
      auto: 'gi-table-auto',
      fixed: 'gi-table-fixed',
    },
  },
});

export type TableProps = VariantProps<typeof tableVariants> & {
  dataTestid?: string;
} & React.TableHTMLAttributes<HTMLTableElement>;

export function Table({
  layout = 'auto',
  dataTestid,
  children,
  ...props
}: React.PropsWithChildren<TableProps>) {
  const layoutClasses = tableVariants({ layout });
  return (
    <table
      className={cn(layoutClasses)}
      role="table"
      data-testid={dataTestid}
      {...props}
    >
      {children}
    </table>
  );
}
