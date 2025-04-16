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
    { variant, appearance, size, disabled, className, children, ...props },
    ref,
  ) => {
    return (
      <button
        {...props}
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
