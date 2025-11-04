import { tv } from 'tailwind-variants';

export const alertVariants = tv({
  slots: {
    base: 'gi-alert-base',
    baseDismissible: 'gi-alert-base-dismissible',
    container: 'gi-alert-container',
    heading: 'gi-alert-title',
    dismiss: 'gi-alert-dismiss',
  },
  variants: {
    variant: {
      info: {
        base: 'gi-alert-info',
        baseDismissible: 'gi-alert-info',
      },
      danger: {
        base: 'gi-alert-danger',
        baseDismissible: 'gi-alert-danger',
      },
      success: {
        base: 'gi-alert-success',
        baseDismissible: 'gi-alert-success',
      },
      warning: {
        base: 'gi-alert-warning',
        baseDismissible: 'gi-alert-warning',
      },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});
