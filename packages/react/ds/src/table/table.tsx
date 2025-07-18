import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../cn.js';

export type TableAlign = 'left' | 'center' | 'right';
export type VerticalAlign = 'top' | 'middle' | 'bottom';

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
  rowSize?: 'sm' | 'md' | 'lg';
  stripped?: boolean;
  noBorder?: boolean;
} & React.TableHTMLAttributes<HTMLTableElement>;

export function Table({
  layout = 'auto',
  rowSize = 'md',
  stripped = false,
  noBorder = false,
  dataTestid,
  children,
  className,
  ...props
}: React.PropsWithChildren<TableProps>) {
  const layoutClasses = tableVariants({ layout });
  return (
    <table
      className={cn(layoutClasses, className)}
      role="table"
      data-testid={dataTestid}
      data-row-size={rowSize}
      data-stripped={stripped.toString()}
      data-no-border={noBorder.toString()}
      {...props}
    >
      {children}
    </table>
  );
}
