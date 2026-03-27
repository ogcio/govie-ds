import { tv } from 'tailwind-variants';

export const tabItemVariants = tv({
  slots: {
    base: [
      'group',
      'gi-cursor-pointer gi-relative gi-px-1 gi-leading-6',
      'gi-flex gi-gap-2',
      'hover:gi-text-color-icon-system-neutral-interactive-hover hover:gi-bg-color-surface-system-neutral-interactive-hover hover:gi-fill-color-text-system-neutral-interactive-default',
      'gi-focus-state-outline focus:gi-shadow-[inset_0_0_0_2px] focus:gi-border-none focus:gi-border-transparent focus:gi-bg-color-surface-system-neutral-interactive-hover focus:gi-text-color-text-system-neutral-interactive-default focus:gi-rounded-sm focus:gi-z-1',
    ],
    border: [
      'gi-h-[2px] gi-absolute gi-bottom-0 gi-left-0 gi-w-full',
      'group-focus:!gi-bg-transparent',
    ],
  },
  variants: {
    size: {
      md: {
        base: 'gi-text-md gi-py-4',
      },
      sm: {
        base: 'gi-text-sm gi-py-2',
      },
    },
    checked: {
      false: {
        base: 'gi-text-color-text-system-neutral-interactive-muted gi-fill-color-text-system-neutral-interactive-muted',
      },
      true: {
        base: [
          'gi-bg-white gi-no-underline gi-font-bold',
          'gi-text-color-text-system-neutral-interactive-default gi-fill-color-text-system-neutral-interactive-default',
        ],
      },
    },
    stretch: {
      true: {
        base: 'gi-flex-1',
      },
    },
    labelAlignment: {
      start: {
        base: 'gi-justify-start',
      },
      center: {
        base: 'gi-justify-center',
      },
      end: {
        base: 'gi-justify-end',
      },
    },
    appearance: {
      default: {},
      dark: {},
    },
  },
  compoundVariants: [
    {
      checked: true,
      appearance: 'default',
      class: {
        border: 'gi-bg-color-border-tone-primary-accent-selected',
      },
    },
    {
      checked: true,
      appearance: 'dark',
      class: {
        border: 'gi-bg-color-text-system-neutral-interactive-default',
      },
    },
    {
      checked: false,
      class: {
        border:
          'group-hover:gi-bg-color-surface-system-neutral-interactive-hover',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    checked: false,
    appearance: 'default',
  },
});
