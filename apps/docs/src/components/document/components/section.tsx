import { Heading } from '@govie-ds/react';
import type React from 'react';
import { Fragment } from 'react';
import { Tabs } from '../common/tabs';
import { getComponents } from '@/lib/components';

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
  componentId,
  children,
}: {
  current: string;
  componentId: string;
  children: React.ReactNode;
}) {
  // const components = getComponents();

  // const component = components.filter((component) =>
  //   component.id.includes(componentId),
  // );

  // if (component.length === 0) {
  //   return <Fragment />;
  // }

  // const componentName = component[0].name;
  return (
    <Fragment>
      <Tabs tabs={tabs} current={current}>
        {children}
      </Tabs>
    </Fragment>
  );
}
