'use client';
import { ComponentType, useState } from 'react';
import { CheckCircle, Info, Warning, Error, IconProps } from '../atoms/icons';
import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';
import { IconButton } from '../icon-button/icon-button.js';
import { type AlertProps } from './types.js';
import { alertVariants } from './variants.js';

export const ALERT_VARIANT_ICONS: Record<string, ComponentType<IconProps>> = {
  warning: (props) => <Warning {...props} />,
  success: (props) => <CheckCircle {...props} />,
  danger: (props) => <Error {...props} />,
  info: (props) => <Info {...props} />,
};

function Alert({
  title,
  children,
  variant = 'info',
  showIcon = true,
  iconProps,
  dismissible,
  onClose,
  className,
  ...props
}: AlertProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const { base, heading, container, dismiss, baseDismissible } = alertVariants({
    variant,
  });

  const baseVariant = dismissible ? baseDismissible : base;

  if (isDismissed) {
    return null;
  }

  const AlertIcon = ALERT_VARIANT_ICONS[variant ?? 'info'];
  return (
    <div
      className={cn(baseVariant(), className, 'gi-not-prose')}
      role="alert"
      aria-live="assertive"
      {...props}
    >
      {showIcon ? <AlertIcon className="gi-shrink-0 gi-block" /> : null}

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
