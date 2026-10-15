import { tv } from 'tailwind-variants';
import { baseClasses } from './Button.styles';
import { Size } from './constants';

export default tv({
  extend: baseClasses,
  base: ['gi-justify-center'],
  variants: {
    size: {
      sm: 'gi-h-8 gi-w-8',
      md: 'gi-h-10 gi-w-10',
      lg: 'gi-h-12 gi-w-12',
      xl: 'gi-h-14 gi-w-14',
    },
  },
  defaultVariants: {
    size: Size.MD,
  },
});
