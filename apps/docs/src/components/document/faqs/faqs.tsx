import { Heading } from '@govie-react/ds';
import React, { Fragment } from 'react';
import { Tabs } from '../common/tabs';
import { Text } from '@/components/typography/text';

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
      <Text as="h2" className="max-w-[36ch]">
        {question}
      </Text>
      <div>{children}</div>
    </div>
  );
}
