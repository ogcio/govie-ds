import { cn } from '@/lib/cn';
import Link from 'next/link';

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
}: {
  items: SideNavigationItem[];
  onSelect?: (id: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-md [&_ul]:ml-lg whitespace-nowrap">
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(
            'pl-md flex flex-col gap-md',
            item.isActive ? 'border-gold-400 border-l-md' : null,
          )}
        >
          {item.href ? (
            <Link
              href={item.href}
              onClick={() => onSelect(item.id)}
              className={cn(
                'text-blue-700 hover:text-blue-800',
                'focus:bg-yellow-400',
                'hover:underline hover:underline-offset-md hover:underline-thickness-lg',
              )}
            >
              {item.name}
            </Link>
          ) : (
            <h2 className="text-gray-800 text-lg">{item.name}</h2>
          )}
          {item.children ? (
            <SideNavigation items={item.children} onSelect={onSelect} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}
