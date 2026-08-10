import { LinkButton } from '@ogcio/design-system-react';
import NextLink from 'next/link';
export type Tab = {
  id: string;
  title: string;
  href: string;
};

// TODO: remake using the <Tabs> component

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
      <ul className="flex gi-not-prose">
        {tabs.map((tab) => {
          const isCurrent = tab.id === current;
          return (
            <li key={tab.title} className="flex">
              <LinkButton
                asChild
                appearance="default"
                variant={isCurrent ? 'primary' : 'flat'}
                ariaCurrent={isCurrent ? 'page' : undefined}
              >
                <NextLink href={tab.href}>{tab.title}</NextLink>
              </LinkButton>
            </li>
          );
        })}
      </ul>
      {children}
    </div>
  );
}
