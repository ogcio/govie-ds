import { cn } from '../cn.js';
import { Anchor } from '../primitives/anchor.js';

export type ListItemProps = {
  label: string;
  action?: () => void;
  href?: string;
  external?: boolean;
  bold?: boolean;
};

export function ListItem({ label, href, external, bold }: ListItemProps) {
  return (
    <Anchor
      aria-label={label}
      href={href}
      className="gi-list-item"
      external={external}
    >
      <span className={cn('gi-text-sm', 'gi-ml-1', { 'gi-font-bold': bold })}>
        {label}
      </span>
    </Anchor>
  );
}
