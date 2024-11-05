import { Heading } from '@govie-ds/react';
import type React from 'react';
import { Fragment } from 'react';
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
    <Fragment>
      <Heading>FAQs</Heading>
      <Tabs tabs={tabs} current={current}>
        {children}
      </Tabs>
    </Fragment>
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
      <Heading as='h2' size="md">
        {question}
      </Heading>
      <div>{children}</div>
    </div>
  );
}
