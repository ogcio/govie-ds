import React from 'react';
import { cn } from '../cn.js';

type CaptionProps = {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
} & React.HTMLAttributes<HTMLTableCaptionElement>;

export function Caption({ children, size = 'lg', ...props }: CaptionProps) {
  return (
    <caption
      className={cn(`gi-table-caption-text gi-text-${size}`, props.className)}
      {...props}
    >
      {children}
    </caption>
  );
}
