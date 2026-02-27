import React from 'react';
import { cn } from '../cn.js';

export function TableRow({
  children,
  ...props
}: React.TableHTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn(props.className, 'gi-overflow-hidden gi-align-middle')} {...props}>
      {children}
    </tr>
  );
}
