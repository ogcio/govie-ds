import { tv } from 'tailwind-variants';
export const iconStyles = tv({
  base: 'gi-shrink-0 gi-block',
  variants: {
    inline: {
      true: 'gi-inline-block',
      false: 'gi-block'
    },
    disabled: {
      true: 'gi-fill-gray-700'
    }
  }
})