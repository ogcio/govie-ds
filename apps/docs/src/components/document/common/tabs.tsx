import NextLink from 'next/link';
import { cn } from '@/lib/cn';

export type Tab = {
  id: string;
  title: string;
  href: string;
};

export function Tabs({
  tabs,
  current,
  children,
}: {
  tabs: Tab[];
  current?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <ul className="flex gap-2xl my-xl border-b-xs border-gray-50">
        {tabs.map((tab) => {
          const isCurrent = tab.id === current;
          return (
            <li key={tab.title} className="flex">
              <NextLink
                href={tab.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn(
                  'inline-flex py-lg text-sm text-gray-500',
                  isCurrent ? 'border-gold-300' : 'border-transparent',
                  isCurrent
                    ? 'pointer-events-none'
                    : 'hover:border-gray-300 hover:text-gray-700',
                  'border-b-md',
                )}
              >
                {tab.title}
              </NextLink>
            </li>
          );
        })}
      </ul>
      {children}
    </div>
  );
}
