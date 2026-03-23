import { tv } from 'tailwind-variants';
import type { Props } from './types';

const styles = tv({
  base: 'gi-font-bold gi-font-primary',
  variants: {
    size: {
      xl: 'gi-text-4xl md:gi-text-5xl xl:gi-text-6xl',
      lg: 'gi-text-2xl md:gi-text-3xl xl:gi-text-4xl',
      md: 'gi-text-lg md:gi-text-xl xl:gi-text-2xl',
      sm: 'gi-text-lg xl:gi-text-xl',
      xs: 'gi-text-md',
      '2xs': 'gi-text-sm',
    } satisfies Record<NonNullable<Props['size']>, string>,
  },
});

export default styles;
