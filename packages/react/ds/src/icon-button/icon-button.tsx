'use client';
import { forwardRef } from 'react';
import {
  isButtonDisabled,
  getVariantAppearanceClass,
  getButtonIconSizeClass,
} from '../button/helpers.js';
import { ButtonProps } from '../button/types.js';
import { cn } from '../cn.js';
import { Icon, IconProps } from '../icon/icon.js';

export type IconButtonProps = Omit<ButtonProps, 'children'> & {
  icon: Omit<IconProps, 'size'>;
  className?: string;
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
      className = '',
      type = 'button',
      dataTestid,
      ...props
    },
    ref,
  ) => {
    const iconSize = size === 'small' ? 'sm' : 'md';

    return (
      <button
        ref={ref}
        type={type}
        aria-disabled={disabled}
        disabled={disabled}
        role="button"
        onClick={onClick}
        data-testid={dataTestid}
        {...props}
        className={cn(
          'gi-btn',
          getVariantAppearanceClass({ disabled, variant, appearance }),
          getButtonIconSizeClass(size),
          isButtonDisabled({ disabled, variant, appearance }),
          className,
        )}
      >
        <Icon size={iconSize} {...icon} />
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
