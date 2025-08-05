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
        data-testid={dataTestid}
        ref={ref}
        aria-disabled={disabled}
        disabled={disabled}
        className={cn(
          'gi-btn',
          getVariantAppearanceClass({ disabled, variant, appearance }),
          isButtonDisabled({ disabled, variant, appearance }),
          getSizeClass(size),
          className,
        )}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
Object.defineProperty(Button, 'componentType', {
  value: 'Button',
  writable: false,
  enumerable: false,
});
