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
    innerContainer: 'gi-flex gi-justify-between gi-w-full',
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
  showIcon = true,
  dismissible,
  onClose,
  dataTestid,
  slotAction,
}: ToastProps) {
  const { base, heading, container, innerContainer, dismiss, baseDismissible } =
    toastVariants({
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
      {showIcon ? (
        <Icon
          icon={icon({ variant })}
          className="gi-toast-icon"
          data-variant={variant}
        />
      ) : null}

      <div className={container()}>
        <div className={innerContainer()}>
          <p className={heading()}>{title}</p>
          {dismissible && (
            <div className={dismiss()}>
              <IconButton
                onClick={onClose}
                size="small"
                appearance="dark"
                variant="flat"
                icon={{ icon: 'close' }}
                aria-label="Close toast"
              />
            </div>
          )}
        </div>
        <Paragraph ariaLabel={description}>{description}</Paragraph>
        {(action || slotAction) && (
          <div className="gi-toast-action">
            <Link href={action?.href} noColor size="md" asChild={!!slotAction}>
              {slotAction || action?.label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export { Toast, toastVariants };
