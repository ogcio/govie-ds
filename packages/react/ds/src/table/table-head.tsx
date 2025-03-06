import React from 'react';

export function TableHead({
  children,
  ...props
}: React.TableHTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props}>{children}</thead>;
}
