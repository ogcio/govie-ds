'use client';

import { cn } from '@/lib/cn';

export function ComponentPreview({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex w-full min-h-32 border border-gray-200 shadow-sm shadow-gray-200 p-2 items-center justify-center',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ComponentPreviewItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={cn(
        'flex w-32 h-32 border border-gray-200 shadow-sm shadow-gray-200 p-2 items-center justify-center',
        className,
      )}
    >
      {children}
    </li>
  );
}

export function ComponentPreviewLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-wrap gap-2 p-0 gi-not-prose', className)}>
      {children}
    </ul>
  );
}
