import { cn } from '../cn.js';
import Anchor from '../primitives/anchor.js';

export type ListItemProps = {
  label?: string;
  action?: () => void;
  href?: string;
  external?: boolean;
  bold?: boolean;
  slot?: React.ReactNode;
};

export function ListItem({ label, href, external, bold, slot }: ListItemProps) {
  return (
    <Anchor
      aria-label={label}
      href={href}
      className={cn('gi-list-item', { 'gi-font-bold': bold })}
      external={external}
      asChild={!!slot}
    >
      {slot || label}
    </Anchor>
  );
}
