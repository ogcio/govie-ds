'use client';

import type React from 'react';
import { Tabs } from '../common/tabs';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const baseTabs = [
  {
    id: 'design',
    title: 'Design',
    href: '../design/',
    excludes: [],
  },
  {
    id: 'html',
    title: 'HTML',
    href: '../html/',
    excludes: ['autocomplete', 'data-table'],
  },
  {
    id: 'react',
    title: 'React',
    href: '../react/',
    excludes: [],
  },
];

export function Section({
  current,
  children,
}: {
  current: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = useMemo(() => {
    return baseTabs.filter(
      (tab) => !tab.excludes.some((excluded) => pathname.includes(excluded)),
    );
  }, [pathname]);

  return (
    <Tabs tabs={tabs} current={current}>
      {children}
    </Tabs>
  );
}
