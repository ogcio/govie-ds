'use client';
import { SideNavigation } from './side-navigation';
import { useSideNavigationItems } from '@/components/navigation/use-side-navigation-items';

export function SideNavigationConnected() {
  const sideNavigationItems = useSideNavigationItems();

  if (sideNavigationItems.length === 0) {
    return null;
  }

  return (
    <aside className="hidden sm:block w-full max-w-48 flex-auto">
      <SideNavigation items={sideNavigationItems} />
    </aside>
  );
}
