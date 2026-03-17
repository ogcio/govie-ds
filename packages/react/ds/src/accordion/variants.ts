import { tv } from 'tailwind-variants';

export const accordionVariants = tv({
  slots: {
    base: 'gi-focus-visible-state-outline-inner-shadow-sm',
    header: ' gi-flex gi-items-start gi-justify-between',
  },
  variants: {
    variant: {
      default: { header: 'gi-px-2 gi-py-4 gi-text-md gi-font-bold' },
      small: { header: 'gi-py-2 gi-px-2 gi-text-sm gi-font-bold' },
    },
    disabled: {
      false: {
        base: 'hover:gi-bg-gray-200 gi-focus-state-outline-inner-shadow-sm',
        header: 'gi-cursor-pointer',
      },
      true: {
        header: 'gi-cursor-not-allowed gi-text-gray-600',
      },
    },
  },
});
