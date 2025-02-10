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

export type ExtendedButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ExtendedButtonProps>(
  (
    { variant, appearance, size, disabled, className, children, ...props },
    ref,
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        disabled={disabled}
        data-testid={`govieButton-${appearance}-${variant}-${size}-${disabled ? 'disabled' : ''}`}
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
