import Link from "next/link";
import { cn } from "@/lib/cn";

export type MainMenuItem = {
  id: string;
  name: string;
  href: string;
  isActive: boolean;
};

export function MainMenu({ items }: { items: MainMenuItem[] }) {
  return (
    <nav aria-label="Main navigation">
      <ul className="hidden sm:flex sm:gap-2xl">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "py-lg",
              item.isActive ? "border-gold-500 border-b-lg" : null
            )}
          >
            <Link
              href={item.href}
              className={cn(
                "inline-block text-md text-gray-700 font-semibold",
                "focus:bg-yellow-400",
                "hover:text-gray-900 hover:underline hover:underline-offset-md hover:decoration-md"
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
