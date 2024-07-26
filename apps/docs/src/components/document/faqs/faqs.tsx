import { Heading } from '@govie-react/ds';
import NextLink from 'next/link';
import React from 'react';
import { cn } from '@/lib/cn';

const tabs = [
  {
    id: 'general',
    title: 'General',
    href: '/get-started/faqs/general/',
  },
  {
    id: 'design',
    title: 'Design',
    href: '/get-started/faqs/design/',
  },
  {
    id: 'components',
    title: 'Components',
    href: '/get-started/faqs/components/',
  },
];

export function Faqs({
  current,
  children,
}: {
  current: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <ul className="flex gap-2xl my-xl border-b-xs border-gray-50">
        {tabs.map((tab) => (
          <li key={tab.title} className="flex">
            {tab.id === current ? (
              <p className="text-gray-900 border-b-md border-gold-200">
                {tab.title}
              </p>
            ) : (
              <NextLink
                href={tab.href}
                className={cn(
                  'inline-flex py-lg border-b-md border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
                )}
              >
                {tab.title}
              </NextLink>
            )}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

export function Faq({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Heading as="h2">{question}</Heading>
      <div>{children}</div>
    </div>
  );
}
