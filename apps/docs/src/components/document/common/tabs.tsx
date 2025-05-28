import { GovieLink } from '@/components/navigation/custom-link';

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
      <ul className="flex gap-xl gi-not-prose">
        {tabs.map((tab) => {
          const isCurrent = tab.id === current;
          return (
            <li key={tab.title} className="flex">
              <GovieLink
                href={tab.href}
                aria-current={isCurrent ? 'page' : undefined}
                asButton={{
                  appearance: 'default',
                  variant: isCurrent ? 'primary' : 'flat',
                }}
              >
                {tab.title}
              </GovieLink>
            </li>
          );
        })}
      </ul>
      {children}
    </div>
  );
}
