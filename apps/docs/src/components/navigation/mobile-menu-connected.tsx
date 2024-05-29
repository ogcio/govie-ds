"use client";
import Link from "next/link";
import { useSideNavigationItems } from "@/components/navigation/use-side-navigation-items";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./sheet";
import { useMainMenuItems } from "./use-main-menu-items";
import { SideNavigation } from "./side-navigation";

export function MobileMenuConnected({
  isOpen,
  onOpenChanged,
}: {
  isOpen: boolean;
  onOpenChanged: () => void;
}) {
  const mainMenuItems = useMainMenuItems();
  const sideNavigationItems = useSideNavigationItems();

  return (
    <Sheet open={isOpen} onOpenChange={() => onOpenChanged()}>
      <SheetContent side="left" className="bg-white flex flex-col gap-md">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-xl">
          {mainMenuItems.length === 0 ? null : (
            <ul className="flex flex-col gap-sm">
              {mainMenuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => onOpenChanged()}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <hr />
          {sideNavigationItems.length === 0 ? null : (
            <SideNavigation
              items={sideNavigationItems}
              onSelect={() => onOpenChanged()}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
