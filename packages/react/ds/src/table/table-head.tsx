import React from 'react';

export function TableHead({
  children,
  ...props
}: React.PropsWithChildren<
  React.TableHTMLAttributes<HTMLTableSectionElement>
>) {
  return <thead {...props}>{children}</thead>;
}
