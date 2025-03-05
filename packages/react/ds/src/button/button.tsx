'use client';
import React from 'react';
import { cn } from '../cn.js';
import {
  isButtonDisabled,
  getSizeClass,
  getVariantAppearanceClass,
} from './helpers.js';
import { ButtonProps } from './types.js';

// Extend `React.InputHTMLAttributes<HTMLButtonElement>` so that
// the component can accept all the standard attributes and events that an `<button>` element can handle.

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      appearance,
      size,
      disabled,
      className,
      dataTestid,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        disabled={disabled}
        data-testid={dataTestid}
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
