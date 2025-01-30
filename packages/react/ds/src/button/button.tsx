'use client';
import { cn } from '../cn.js';
import {
  isButtonDisabled,
  getSizeClass,
  getVariantAppearanceClass,
} from './helpers.js';
import { ButtonProps } from './types.js';

export const Button = ({
  variant,
  appearance,
  size,
  disabled,
  children,
  onClick,
  type,
  form,
  value,
  className,
  ariaLabel,
  ariaDescribedBy,
  ariaPressed,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      form={form}
      value={value}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-pressed={ariaPressed}
      data-testid={`govieButton-${appearance}-${variant}-${size}-${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      className={cn(
        'gi-btn',
        getVariantAppearanceClass({ disabled, variant, appearance }),
        getSizeClass(size),
        isButtonDisabled({ disabled, variant, appearance }),
        className,
      )}
    >
      {children}
    </button>
  );
};
