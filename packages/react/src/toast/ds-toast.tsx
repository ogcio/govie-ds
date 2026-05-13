'use client';
import { tv, type VariantProps } from 'tailwind-variants';
import Paragraph from '@/atoms/Paragraph';
import type { IconId } from '@/icon/icon.js';
import { Icon } from '@/icon/icon.js';
import { IconButton } from '@/icon-button/icon-button.js';
import { Link } from '@/link/link.js';
import type { ToastProps } from './types.js';

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
  slotAction,
}: ToastProps) {
  const { base, heading, container, innerContainer, dismiss } = toastVariants({
    variant,
  });

  return (
    <div className={base()}>
      {showIcon ? <Icon icon={icon({ variant })} className="gi-toast-icon" data-variant={variant} /> : null}

      <div className={container()}>
        <div className={innerContainer()}>
          <p className={heading()}>{title}</p>
          {dismissible && (
            <div className={dismiss()}>
              <IconButton
                onClick={onClose}
                size="sm"
                appearance="dark"
                variant="flat"
                icon={{ icon: 'close' }}
                aria-label="Close toast"
              />
            </div>
          )}
        </div>
        <Paragraph>{description}</Paragraph>
        {(action || slotAction) && (
          <div className="gi-text-gray-950 gi-mt-1">
            <Link href={action?.href} noColor size="md" asChild={!!slotAction}>
              {slotAction || action?.label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const toastVariants = tv({
  slots: {
    base: 'gi-relative gi-flex-row gi-flex gi-p-3 gi-border-xs gi-rounded-sm gi-gap-2',
    container: 'gi-flex gi-flex-col gi-items-start gi-gap-1 gi-grow gi-pr-0',
    heading: 'gi-text-2md gi-font-bold',
    dismiss: 'gi-h-full gi-relative gi-top-[-8px]',
    innerContainer: 'gi-flex gi-justify-between gi-w-full',
  },
  variants: {
    variant: {
      info: {
        base: 'gi-bg-color-surface-intent-info-default gi-border-color-border-intent-info-subtle gi-text-color-text-intent-info-default',
      },
      danger: {
        base: 'gi-bg-color-surface-intent-error-default gi-border-color-border-intent-error-subtle gi-text-color-text-intent-error-default',
      },
      success: {
        base: 'gi-bg-color-surface-intent-success-default gi-border-color-border-intent-success-subtle gi-text-color-text-intent-success-default',
      },
      warning: {
        base: 'gi-bg-color-surface-intent-warning-default gi-border-color-border-intent-warning-subtle gi-text-color-text-intent-warning-default',
      },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export { Toast, toastVariants };
