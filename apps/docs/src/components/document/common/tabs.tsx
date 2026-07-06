import { LinkButton } from '@ogcio/design-system-react';
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
                href={tab.href}
                appearance="default"
                variant={isCurrent ? 'primary' : 'flat'}
                ariaCurrent={isCurrent ? 'page' : undefined}
              >
                {tab.title}
              </LinkButton>
            </li>
          );
        })}
      </ul>
      {children}
    </div>
  );
}
