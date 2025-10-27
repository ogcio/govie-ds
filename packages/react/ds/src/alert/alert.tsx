'use client';
import { useState } from 'react';
import { type VariantProps } from 'tailwind-variants';
import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';
import { Icon, IconId } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';
import { type AlertProps } from './types.js';
import { alertVariants } from './variants.js';

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
  showIcon = true,
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
      {showIcon ? (
        <Icon
          icon={icon({ variant })}
          ariaHidden
          className="gi-alert-icon"
          data-variant={variant}
        />
      ) : null}

      <div
        className={cn(container(), {
          'gi-gap-1': title,
        })}
      >
        {title && <p className={heading()}>{title}</p>}
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

export { Alert };
