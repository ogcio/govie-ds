import { tv } from 'tailwind-variants';
import { MaxWidth } from './constants';

export default tv({
  base: 'gi-container gi-mx-auto',
  variants: {
    inset: {
      true: 'gi-py-4 md:gi-py-6 lg:gi-py-8',
    },
    // `gi-container` already applies the responsive gutters (16px, 24px at md, 32px at lg) from `@ogcio/design-system-tailwind`, so only the opt-out variant is needed
    gutters: {
      false: 'gi-px-0',
    },
    maxWidth: {
      default: 'gi-max-w-full 2xl:gi-max-w-screen-2xl',
      sm: 'gi-max-w-screen-sm',
      md: 'gi-max-w-screen-md',
      lg: 'gi-max-w-screen-lg',
      xl: 'gi-max-w-screen-xl',
      '2xl': 'gi-max-w-screen-2xl',
      full: 'gi-max-w-full',
    },
  },
  defaultVariants: {
    inset: false,
    gutters: true,
    maxWidth: MaxWidth.DEFAULT,
  },
});
