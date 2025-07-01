'use client';
import { cn } from '@/lib/cn';
import { SideNav, SideNavItem } from '@ogcio/design-system-react';
import NextLink from 'next/link';

export type SideNavigationItem = {
  id: string;
  name: string;
  href?: string;
  isActive?: boolean;
  children?: SideNavigationItem[];
};

export function SideNavigation({
  items,
  activeItem,
  onSelect = () => {},
  className,
}: {
  items: SideNavigationItem[];
  activeItem: SideNavigationItem | undefined;
  onSelect?: (id: string) => void;
  value?: string;
  className?: string;
}) {
  return (
    <SideNav
      className={cn(className)}
      onChange={onSelect}
      value={activeItem?.id}
    >
      {items.map((item) => (
        <SideNavItem
          primary
          open
          key={item.id}
          value={item.id}
          label={item.name}
          href={item.href}
          expandable={!!item.children?.length}
        >
          {item.children?.map((child) => (
            <SideNavItem
              secondary
              key={child.id}
              value={child.id}
              label={child.name}
              href={child.href}
              asChild
            >
              <NextLink href={child.href || '#'}>{child.name}</NextLink>
            </SideNavItem>
          ))}
        </SideNavItem>
      ))}
    </SideNav>
  );
}
