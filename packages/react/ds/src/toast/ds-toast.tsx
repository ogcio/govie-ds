'use client';
import { tv, type VariantProps } from 'tailwind-variants';
import { Icon, IconId } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';
import { Link } from '../link/link.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { ToastProps } from './types.js';

const toastVariants = tv({
  slots: {
    base: 'gi-toast-base',
    baseDismissible: 'gi-toast-base-dismissible',
    container: 'gi-toast-container',
    heading: 'gi-toast-title',
    dismiss: 'gi-toast-dismiss',
  },
  variants: {
    variant: {
      info: {
        base: 'gi-toast-info',
        baseDismissible: 'gi-toast-info',
      },
      danger: {
        base: 'gi-toast-danger',
        baseDismissible: 'gi-toast-danger',
      },
      success: {
        base: 'gi-toast-success',
        baseDismissible: 'gi-toast-success',
      },
      warning: {
        base: 'gi-toast-warning',
        baseDismissible: 'gi-toast-warning',
      },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

const icon = ({ variant }: VariantProps<typeof toastVariants>) => {
  let icon;
  switch (variant) {
    case 'warning': {
      icon = 'warning';
      break;
    }
    case 'success': {
      icon = 'check_circle';
      break;
    }
    case 'danger': {
      icon = 'error';
      break;
    }
    default: {
      icon = 'info';
    }
  }
  return icon as IconId;
};

function Toast({
  title,
  description,
  action,
  variant = 'info',
  dismissible,
  onClose,
  dataTestid,
}: ToastProps) {
  const { base, heading, container, dismiss, baseDismissible } = toastVariants({
    variant,
  });

  const baseVariant = dismissible ? baseDismissible : base;

  return (
    <div
      className={baseVariant()}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      aria-label={title}
      data-testid={dataTestid}
    >
      <Icon icon={icon({ variant })} />
      <div className={container()}>
        <p className={heading()}>{title}</p>
        <Paragraph ariaLabel={description}>{description}</Paragraph>
        {action && (
          <div className="gi-toast-action">
            <Link href={action.href} noColor size="md">
              {action.label}
            </Link>
          </div>
        )}
      </div>
      {dismissible && (
        <IconButton
          onClick={onClose}
          className={dismiss()}
          size="small"
          appearance="dark"
          variant="flat"
          icon={{ icon: 'close' }}
          aria-label="Close toast"
        />
      )}
    </div>
  );
}

export { Toast, toastVariants };
