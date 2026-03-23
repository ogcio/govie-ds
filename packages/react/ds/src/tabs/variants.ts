import { tv } from 'tailwind-variants';

export const tabItemVariants = tv({
  base: [
    'group',
    'gi-cursor-pointer gi-relative gi-px-1 gi-leading-6',
    'gi-flex gi-gap-2',
    'hover:gi-text-color-icon-system-neutral-interactive-hover hover:gi-bg-color-surface-system-neutral-interactive-hover hover:gi-fill-color-text-system-neutral-interactive-default',
    'gi-focus-state-outline focus:gi-shadow-[inset_0_0_0_2px] focus:gi-border-none focus:gi-border-transparent focus:gi-bg-color-surface-system-neutral-interactive-hover focus:gi-text-color-text-system-neutral-interactive-default focus:gi-rounded-sm focus:gi-z-1',
  ],
  variants: {
    size: {
      md: 'gi-text-md gi-py-4',
      sm: 'gi-text-sm gi-py-2',
    },
    checked: {
      false:
        'gi-text-color-text-system-neutral-interactive-muted gi-fill-color-text-system-neutral-interactive-muted',
      true: [
        'gi-bg-white gi-no-underline gi-font-bold',
        // Selected tab: keep interactive-default text/fill even when focus moves elsewhere
        'gi-text-color-text-system-neutral-interactive-default gi-fill-color-text-system-neutral-interactive-default',
      ],
    },
    stretch: {
      true: 'gi-flex-1',
    },
    labelAlignment: {
      start: 'gi-justify-start',
      center: 'gi-justify-center',
      end: 'gi-justify-end',
    },
  },
  defaultVariants: {
    size: 'md',
    checked: false,
  },
});
