'use client';
import { forwardRef } from 'react';
import type { CoreButtonProps } from '../atoms/CoreButton.js';
import {
  isButtonDisabled,
  getVariantAppearanceClass,
  getButtonIconSizeClass,
} from '../button/helpers.js';
import { cn } from '../cn.js';
import { Icon, IconProps } from '../icon/icon.js';

export type IconButtonProps = Omit<
  CoreButtonProps,
  | 'children'
  | 'ariaLabel'
  | 'ariaLabelledBy'
  | 'ariaDescribedBy'
  | 'ariaChecked'
  | 'ariaPressed'
  | 'ariaExpanded'
  | 'ariaControls'
  | 'ariaHasPopup'
  | 'ariaBusy'
  | 'size'
> & {
  icon: Omit<IconProps, 'size'>;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
  'aria-label'?: string;
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
      'aria-label': ariaLabel,
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
        aria-label={ariaLabel}
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
