import { tv } from 'tailwind-variants';
import { baseClasses, ButtonSize, sizeVariants } from './Button.styles';

export default tv({
  extend: baseClasses,
  base: ['gi-gap-2', 'gi-no-underline', 'hover:gi-no-underline'],
  variants: {
    size: sizeVariants,
  },
  defaultVariants: {
    size: ButtonSize.MD,
  },
});
