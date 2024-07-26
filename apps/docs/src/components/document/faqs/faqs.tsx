import { Heading } from '@govie-react/ds';
import React from 'react';
import { Tabs } from '../common/tabs';

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
    <Tabs tabs={tabs} current={current}>
      {children}
    </Tabs>
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
