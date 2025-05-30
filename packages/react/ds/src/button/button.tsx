'use client';
import { forwardRef } from 'react';
import { cn } from '../cn.js';
import {
  isButtonDisabled,
  getSizeClass,
  getVariantAppearanceClass,
} from './helpers.js';
import { ButtonProps } from './types.js';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      appearance,
      size,
      disabled,
      className,
      children,
      dataTestid,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        {...props}
        data-testid={dataTestid || 'govie-button'}
        ref={ref}
        aria-disabled={disabled}
        disabled={disabled}
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
  },
);

Button.displayName = 'Button';
