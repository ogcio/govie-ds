'use client';
import { cn } from '@/lib/cn';
import { SideNav, SideNavItem } from '@govie-ds/react';

export type SideNavigationItem = {
  id: string;
  name: string;
  href?: string;
  isActive?: boolean;
  children?: SideNavigationItem[];
};

export function SideNavigation({
  items,
  onSelect = () => {},
  value,
  className,
}: {
  items: SideNavigationItem[];
  onSelect?: (id: string) => void;
  value?: string;
  className?: string;
}) {
  return (
    <SideNav className={cn(className)} onChange={onSelect} value={value}>
      {items.map((item) => (
        <SideNavItem
          key={item.id}
          value={item.id}
          label={item.name}
          href={item.href}
          primary
          expandable={!!item.children?.length}
          open
        >
          {item.children?.map((child) => (
            <SideNavItem
              key={child.id}
              value={child.id}
              label={child.name}
              href={child.href}
              secondary
            />
          ))}
        </SideNavItem>
      ))}
    </SideNav>
  );
}
