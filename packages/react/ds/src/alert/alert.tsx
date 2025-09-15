'use client';
import { useState, type ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';
import { Icon, IconId } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';

const alertVariants = tv({
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

type AlertProps = {
  variant?: VariantProps<typeof alertVariants>['variant'];
  title: string;
  children?: ReactNode;
  dismissible?: boolean;
  dataTestid?: string;
  className?: string;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const icon = ({ variant }: VariantProps<typeof alertVariants>) => {
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

function Alert({
  title,
  children,
  variant = 'info',
  dismissible,
  onClose,
  dataTestid,
  className,
}: AlertProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const { base, heading, container, dismiss, baseDismissible } = alertVariants({
    variant,
  });

  const baseVariant = dismissible ? baseDismissible : base;

  if (isDismissed) {
    return null;
  }
  return (
    <div
      className={cn(baseVariant(), className, 'gi-not-prose')}
      data-testid={dataTestid}
      role="alert"
      aria-live="assertive"
    >
      <Icon
        icon={icon({ variant })}
        ariaHidden
        className="gi-alert-icon"
        data-variant={variant}
      />
      <div className={container()}>
        <p className={heading()}>{title}</p>
        {children}
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
          aria-label={t('alert.dismissAlert', {
            defaultValue: 'Dismiss alert',
          })}
        />
      )}
    </div>
  );
}

export { Alert, alertVariants };
export type { AlertProps };
