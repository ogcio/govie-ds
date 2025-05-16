import type React from 'react';
import { Fragment } from 'react';
import { Tabs } from '../common/tabs';

const tabs = [
  {
    id: 'design',
    title: 'Design',
    href: '../design/',
  },
  {
    id: 'html',
    title: 'HTML',
    href: '../html/',
  },
  {
    id: 'react',
    title: 'React',
    href: '../react/',
  },
];

export function Section({
  current,
  children,
}: {
  current: string;
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Tabs tabs={tabs} current={current}>
        {children}
      </Tabs>
    </Fragment>
  );
}
