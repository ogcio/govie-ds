'use client';
import { forwardRef } from 'react';
import CoreButton, { type CoreButtonProps } from '../atoms/CoreButton.js';
import { Icon, IconProps } from '../icon/icon.js';

export type IconButtonProps = Omit<CoreButtonProps, 'children'> & {
  icon: Omit<IconProps, 'size'>;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant,
      appearance,
      size,
      disabled,
      onClick,
      type = 'button',
      dataTestid,
      ariaLabel,
      ...props
    },
    ref,
  ) => {
    const iconSize = size === 'small' ? 'sm' : 'md';

    return (
      <CoreButton
        ref={ref}
        type={type}
        aria-disabled={disabled}
        disabled={disabled}
        role="button"
        onClick={onClick}
        data-testid={dataTestid}
        variant={variant}
        appearance={appearance}
        ariaLabel={ariaLabel}
        {...props}
      >
        <Icon size={iconSize} {...icon} />
      </CoreButton>
    );
  },
);

IconButton.displayName = 'IconButton';
