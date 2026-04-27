import type { AnchorHTMLAttributes } from 'react';
import { cn } from '../cn.js';
import Anchor from '../primitives/anchor.js';
import { tv } from 'tailwind-variants';

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
      className={cn(className, styles({ bold }))}
      external={external}
      asChild={!!slot}
      {...props}
    >
      {slot || <span className="gi-text-sm gi-ml-1">{label}</span>}
    </Anchor>
  );
}

export const styles = tv({
  base: [
    'gi-block gi-py-4 gi-border-color-border-system-neutral-subtle',
    'gi-border-b-xs gi-border-solid !gi-text-sm',
    'gi-focus-state-outline gi-focus-visible-state-outline',
    // focus
    'focus:gi-shadow-[inset_0_0_0_2px]',
    'focus:gi-shadow-gray-950',
    'focus:gi-rounded-sm',
    'focus-visible:gi-shadow-[inset_0_0_0_2px]',
    'focus-visible:gi-shadow-gray-950',
    'focus-visible:gi-rounded-sm',
  ],
  variants: {
    bold: {
      true: 'gi-font-bold',
    },
  },
});
