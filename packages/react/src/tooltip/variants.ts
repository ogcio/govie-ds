import { tv } from 'tailwind-variants';

export const tooltipVariants = tv({
  slots: {
    wrapper: 'gi-relative gi-inline-block gi-overflow-visible gi-text-lg',
    tooltip: [
      'gi-absolute gi-z-[100] gi-block',
      'gi-bg-color-surface-system-neutral-layer11 gi-text-color-text-tone-light-default',
      'gi-text-sm gi-text-left gi-px-3 gi-py-2 gi-rounded-sm',
      'gi-opacity-100 gi-transition-opacity gi-duration-300',
      'gi-w-max gi-max-w-[324px]',
    ],
  },
  variants: {
    position: {
      top: {
        tooltip: [
          'gi-bottom-full gi-left-1/2 gi-translate-x-[-50%] gi-translate-y-[-0.75rem]',
          "after:gi-content-[''] after:gi-absolute after:gi-left-1/2 after:gi-translate-x-[-50%]",
          'after:gi-border-x-[9px] after:gi-border-x-transparent',
          'after:gi-border-t-[9px] after:gi-border-t-color-surface-system-neutral-layer11',
          'after:gi-bottom-[-0.45rem]',
        ],
      },
      bottom: {
        tooltip: [
          'gi-top-full gi-left-1/2 gi-translate-x-[-50%] gi-translate-y-[0.75rem]',
          "after:gi-content-[''] after:gi-absolute after:gi-left-1/2 after:gi-translate-x-[-50%]",
          'after:gi-border-x-[9px] after:gi-border-x-transparent',
          'after:gi-border-b-[9px] after:gi-border-b-color-surface-system-neutral-layer11',
          'after:gi-top-[-0.45rem]',
        ],
      },
      left: {
        tooltip: [
          'gi-right-full gi-top-1/2 gi-translate-y-[-50%] gi-translate-x-[-0.75rem]',
          "after:gi-content-[''] after:gi-absolute after:gi-top-1/2 after:gi-translate-y-[-50%]",
          'after:gi-border-y-[9px] after:gi-border-y-transparent',
          'after:gi-border-l-[9px] after:gi-border-l-color-surface-system-neutral-layer11',
          'after:gi-right-[-0.45rem]',
        ],
      },
      right: {
        tooltip: [
          'gi-left-full gi-top-1/2 gi-translate-y-[-50%] gi-translate-x-[0.75rem]',
          "after:gi-content-[''] after:gi-absolute after:gi-top-1/2 after:gi-translate-y-[-50%]",
          'after:gi-border-y-[9px] after:gi-border-y-transparent',
          'after:gi-border-r-[9px] after:gi-border-r-color-surface-system-neutral-layer11',
          'after:gi-left-[-0.45rem]',
        ],
      },
    },
  },
  defaultVariants: {
    position: 'top',
  },
});
