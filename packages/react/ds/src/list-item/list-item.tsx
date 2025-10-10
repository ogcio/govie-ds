import { AnchorHTMLAttributes } from 'react';
import { cn } from '../cn.js';
import Anchor from '../primitives/anchor.js';

export type ListItemProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label?: string;
  action?: () => void;
  href?: string;
  external?: boolean;
  bold?: boolean;
  slot?: React.ReactNode;
};

export function ListItem({
  label,
  href,
  external,
  bold,
  slot,
  className,
  ...props
}: ListItemProps) {
  return (
    <Anchor
      aria-label={label}
      href={href}
      className={cn(className, 'gi-list-item', { 'gi-font-bold': bold })}
      external={external}
      asChild={!!slot}
      {...props}
    >
      {slot || <span className="gi-text-sm gi-ml-1">{label}</span>}
    </Anchor>
  );
}
