import React from 'react';
import { cn } from '../cn.js';

export function TableHeader(
  props: React.ThHTMLAttributes<HTMLTableCellElement>,
) {
  return (
    <th className={cn('gi-table-th', props.className)} {...props}>
      {props.children}
    </th>
  );
}
