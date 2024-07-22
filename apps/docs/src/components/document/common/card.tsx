import { Link } from '@/components/typography/link';
import { cn } from '@/lib/cn';

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
            <Link href={link.href}>{link.label}</Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
