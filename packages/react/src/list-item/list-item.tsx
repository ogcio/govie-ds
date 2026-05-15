import type { AnchorHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';
import Anchor from '@/primitives/anchor.js';

export type ListItemProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label?: string;
  action?: () => void;
  href?: string;
  external?: boolean;
  bold?: boolean;
  slot?: React.ReactNode;
};

export function ListItem({ label, href, external, bold, slot, className, ...props }: ListItemProps) {
  return (
    <Anchor
      aria-label={label}
      href={href}
      className={styles({ bold, className })}
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
    'gi-block',
    'gi-py-4',
    'gi-border-color-border-system-neutral-subtle',
    'gi-border-b-xs',
    'gi-border-solid',
    'focus:gi-no-underline',
    'focus:gi-rounded-sm',
    'focus:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
    'focus-visible:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
    'focus-visible:gi-no-underline',
    'focus-visible:gi-rounded-sm',
    'focus-visible:gi-outline-none',
    'gi-text-sm',
    'hover:gi-underline',
    'hover:gi-underline-offset-sm',
    '[&>a:hover]:gi-underline',
    '[&>a:hover]:gi-underline-offset-sm',
  ],
  variants: {
    bold: {
      true: 'gi-font-bold',
    },
  },
});
