import { tv } from 'tailwind-variants';
import { Size, Whitespace } from './constants';

export default tv({
  base: 'gi-font-primary gi-not-prose',
  variants: {
    size: {
      sm: 'gi-text-sm',
      md: 'gi-text-md',
      lg: 'gi-text-lg',
      xl: 'gi-text-lg xs:gi-text-xl',
    },
    whitespace: {
      normal: 'gi-whitespace-normal',
      pre: 'gi-whitespace-pre',
      'pre-wrap': 'gi-whitespace-pre-wrap',
      'break-spaces': 'gi-whitespace-break-spaces',
    },
  },
  defaultVariants: {
    size: Size.MD,
    whitespace: Whitespace.NORMAL,
  },
});
