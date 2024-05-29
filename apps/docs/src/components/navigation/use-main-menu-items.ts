import { usePathname } from "next/navigation";
import { mainMenuItems } from "./menu-items";

export function useMainMenuItems() {
  const pathname = usePathname();

  // TODO: review showing main menu on the home page
  if (pathname === "/") {
    return [];
  }

  return mainMenuItems.map((item) => {
    const pathnameParts = pathname.split("/").filter(Boolean);
    return { ...item, isActive: item.href === `/${pathnameParts[0]}/` };
  });
}
