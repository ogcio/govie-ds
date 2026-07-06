'use client';
import { cn } from '@/lib/cn';
import { Link } from '@ogcio/design-system-react/next';
import NextLink from 'next/link';
export function Card({
  title,
  children,
  isDark = false,
  link,
}: {
  title?: string;
  children: React.ReactNode;
  link?: {
    href: string;
    label: string;
  };
  isDark?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-xl bg-gray-50 p-lg rounded"
      style={{ backgroundColor: isDark ? '#000' : undefined }}
    >
      {title ? (
        <p
          className={cn(
            'mb-0 font-tertiary text-2xs',
            isDark ? 'text-white' : 'text-gray-600',
          )}
        >
          {title}
        </p>
      ) : null}
      <div className="flex flex-col gap-md">
        <div>{children}</div>
        {link ? (
          <div className="flex justify-center">
            <Link
              asChild
              variant="inline"
              className="gi-not-prose"
              href={link.href}
            >
              <NextLink href={link.href}>{link.label}</NextLink>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
