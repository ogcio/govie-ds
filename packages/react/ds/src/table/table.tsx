import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../cn.js';

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
  ariaRowCount?: number;
  ariaColCount?: number;
};

export function Table({
  layout = 'auto',
  ariaRowCount,
  ariaColCount,
  children,
}: React.PropsWithChildren<TableProps>) {
  const layoutClasses = tableVariants({ layout });
  return (
    <table
      className={cn(layoutClasses)}
      role="table"
      aria-label="Table"
      aria-rowcount={ariaRowCount}
      aria-colcount={ariaColCount}
    >
      {children}
    </table>
  );
}
