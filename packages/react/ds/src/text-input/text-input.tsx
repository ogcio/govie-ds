import React from 'react';
import { cn } from '../cn.js';

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?:
    | 'text'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'tel'
    | 'time'
    | 'url'
    | 'week';
  halfFluid?: boolean;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    { prefix, suffix, halfFluid = false, className, type = 'text', ...props },
    ref,
  ) => {
    return (
      <div className={cn(className, 'gi-text-input-container-inner')}>
        {prefix && <div className="gi-text-input-prefix">{prefix}</div>}
        <input
          type={type}
          className={cn('gi-text-input', {
            // 'gi-border-red-600': !!error?.text,
            'gi-input-half-width': halfFluid,
          })}
          ref={ref}
          {...props}
        />
        {suffix && <div className="gi-text-input-suffix">{suffix}</div>}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
