import { tv } from 'tailwind-variants';

export const alertVariants = tv({
  slots: {
    base: 'gi-relative gi-flex gi-flex-row gi-p-3 gi-border-xs gi-rounded-sm gi-gap-2 gi-max-w-[640px] [width:inherit]',
    container: 'gi-flex gi-flex-col gi-items-start gi-grow gi-pr-2',
    heading: 'gi-text-2md gi-font-bold',
    dismiss: 'gi-absolute gi-top-2 gi-right-2',
  },
  variants: {
    variant: {
      info: {
        base: 'gi-bg-color-surface-intent-info-default gi-border-color-border-intent-info-subtle gi-text-color-text-intent-info-default',
        icon: 'gi-text-color-icon-intent-info-default',
      },
      success: {
        base: 'gi-bg-color-surface-intent-success-default gi-border-color-border-intent-success-subtle gi-text-color-text-intent-success-default',
        icon: 'gi-text-color-icon-intent-success-default',
      },
      warning: {
        base: 'gi-bg-color-surface-intent-warning-default gi-border-color-border-intent-warning-subtle gi-text-color-text-intent-warning-default',
        icon: 'gi-text-color-icon-intent-warning-default',
      },
      danger: {
        base: 'gi-bg-color-surface-intent-error-default gi-border-color-border-intent-error-subtle gi-text-color-text-intent-error-default',
        icon: 'gi-text-color-icon-intent-error-default',
      },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});
