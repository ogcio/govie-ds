'use client';
import { ComponentType, type JSX, useState } from 'react';
import { type VariantProps } from 'tailwind-variants';
import { CheckCircle, Info, Warning, Error } from '../atoms/icons';
import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';
import { type IconProps, type IconSize } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';
import { type AlertProps } from './types.js';
import { alertVariants } from './variants.js';

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;

const SIZE_MAP: Record<IconSize, string> = {
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

const ALERT_VARIANT_ICONS: Record<
  AlertVariant,
  ComponentType<{ size: string; className: string }>
> = {
  warning: Warning,
  success: CheckCircle,
  danger: Error,
  info: Info,
};

const AlertIcon = ({
  variant,
  size = 'md',
  disabled,
  inline,
  className,
}: VariantProps<typeof alertVariants> & Omit<IconProps, 'icon'>): JSX.Element => {
  const fontSize = SIZE_MAP[size ?? 'md'];
  const svgClass = cn(
    { 'gi-block': !inline, 'gi-inline-block': inline },
    'gi-shrink-0',
    disabled && 'gi-fill-gray-700',
    className,
  );
  const Icon = ALERT_VARIANT_ICONS[variant ?? 'info'];
  return <Icon className={svgClass} size={fontSize} />;
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
  return (
    <div
      className={cn(baseVariant(), className, 'gi-not-prose')}
      role="alert"
      aria-live="assertive"
      {...props}
    >
      {showIcon ? <AlertIcon variant={variant} {...iconProps} /> : null}

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
