import Link from 'next/link';
import { cn } from '@/lib/cn';

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
    <ul className="flex flex-col gap-lg [&_ul]:ml-lg whitespace-nowrap">
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(
            'pl-md flex flex-col gap-md justify-center',
            item.isActive ? 'border-gold-400' : 'border-transparent',
            item.href ? 'border-l-md' : null,
          )}
        >
          {item.href ? (
            <Link
              href={item.href}
              onClick={() => onSelect(item.id)}
              className={cn(
                'py-sm text-blue-700 text-sm hover:text-blue-800',
                'focus:bg-yellow-400',
                'hover:underline hover:underline-offset-md hover:underline-thickness-lg',
              )}
            >
              {item.name}
            </Link>
          ) : (
            <p className="text-gray-800 text-md my-md">{item.name}</p>
          )}
          {item.children && item.children.length > 0 ? (
            <SideNavigation items={item.children} onSelect={onSelect} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}
