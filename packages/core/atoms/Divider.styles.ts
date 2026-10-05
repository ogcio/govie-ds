import { tv } from 'tailwind-variants';
import { Orientation } from './constants';

export default tv({
  base: 'gi-border-color-border-system-neutral-muted gi-border-0',
  variants: {
    orientation: {
      [Orientation.HORIZONTAL]: 'gi-border-t-xs gi-w-full',
      [Orientation.VERTICAL]: 'gi-border-l-xs gi-self-stretch gi-h-auto',
    },
  },
  defaultVariants: {
    orientation: Orientation.HORIZONTAL,
  },
});
