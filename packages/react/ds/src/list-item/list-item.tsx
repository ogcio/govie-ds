import { cn } from '../cn.js';
import Anchor from '../primitives/anchor.js';

export type ListItemProps = {
  label?: string;
  action?: () => void;
  href?: string;
  external?: boolean;
  bold?: boolean;
  customLink?: React.ReactNode;
};

export function ListItem({
  label,
  href,
  external,
  bold,
  customLink,
}: ListItemProps) {
  return (
    <Anchor
      aria-label={label}
      href={href}
      className="gi-list-item"
      external={external}
      asChild={!!customLink}
    >
      <span className={cn('gi-text-sm', 'gi-ml-1', { 'gi-font-bold': bold })}>
        {customLink || label}
      </span>
    </Anchor>
  );
}
