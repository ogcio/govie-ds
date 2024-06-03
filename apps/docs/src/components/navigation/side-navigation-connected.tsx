'use client';
import { useSideNavigationItems } from '@/components/navigation/use-side-navigation-items';
import { SideNavigation } from './side-navigation';

export function SideNavigationConnected() {
  const sideNavigationItems = useSideNavigationItems();

  if (sideNavigationItems.length === 0) {
    return null;
  }

  return (
    <aside className="hidden sm:block">
      <SideNavigation items={sideNavigationItems} />
    </aside>
  );
}
