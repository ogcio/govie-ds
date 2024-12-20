'use client';
import { cloneElement, useState } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { Icon } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';
import { LinkProps } from '../link/link.js';
import { Paragraph } from '../paragraph/paragraph.js';

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
        baseDismissible: 'gi-toast-success',
      },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

type DSToastProps = {
  variant?: VariantProps<typeof toastVariants>['variant'];
  title: string;
  description?: string;
  action?: React.ReactElement<LinkProps>;
  dismissible?: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

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
  return icon;
};

function Toast({
  title,
  description,
  action,
  variant = 'info',
  dismissible,
  onClose,
}: DSToastProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const { base, heading, container, dismiss, baseDismissible } = toastVariants({
    variant,
  });

  const baseVariant = dismissible ? baseDismissible : base;

  if (isDismissed) {
    return null;
  }
  return (
    <div className={baseVariant()} role="alert">
      <Icon icon={icon({ variant })} />
      <div className={container()}>
        <p className={heading()}>{title}</p>
        <Paragraph>{description}</Paragraph>
        {action && (
          <div className="gi-toast-action">
            {cloneElement(action, { noColor: true, size: 'md' })}
          </div>
        )}
      </div>
      {dismissible && (
        <IconButton
          onClick={(event) => {
            setIsDismissed(true);
            onClose?.(event);
          }}
          className={dismiss()}
          size="small"
          appearance="dark"
          variant="flat"
          icon={{ icon: 'close' }}
        />
      )}
    </div>
  );
}

export { Toast, toastVariants };
export type { DSToastProps };
