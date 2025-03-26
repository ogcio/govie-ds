'use client';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';
import type { InputActionButtonProps, InputProps } from './type.js';

const InputTextWithClear = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, ...props }, externalRef) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(externalRef, () => inputRef.current!);

    const handleOnReset = () => {
      if (inputRef?.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }

      const newInputEvent = {
        target: inputRef.current,
        currentTarget: inputRef.current,
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      if (onChange) {
        onChange(newInputEvent);
      }
    };

    return (
      <Input
        {...props}
        ref={inputRef}
        inputActionButton={{
          icon: 'close',
          onClick: handleOnReset,
        }}
      />
    );
  },
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      prefix,
      inputActionButton,
      suffix,
      halfFluid = false,
      className,
      type = 'text',
      iconStart,
      iconEnd,
      disabled,
      inputClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn(className, 'gi-input-text-container')}>
        {prefix && (
          <div className="gi-input-text-prefix" data-disabled={disabled}>
            {prefix}
          </div>
        )}
        <div
          className={cn('gi-input-text-inner', {
            'gi-input-half-width': halfFluid,
          })}
        >
          {iconStart && (
            <div className="gi-input-text-icon-start" data-prefix={!!prefix}>
              <Icon icon={iconStart} size="md" disabled={disabled} />
            </div>
          )}
          <input
            type={type}
            data-icon-start={!!iconStart}
            data-icon-end={!!iconEnd}
            data-end-element={!!inputActionButton}
            data-prefix={!!prefix}
            data-suffix={!!suffix}
            className={cn(inputClassName, 'gi-input-text')}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {iconEnd && (
            <div
              className="gi-input-text-icon-end"
              data-end-element={!!inputActionButton}
              data-suffix={!!suffix}
            >
              <Icon icon={iconEnd} size="md" disabled={disabled} />
            </div>
          )}
          {inputActionButton && (
            <div className="gi-input-text-end-element" data-suffix={!!suffix}>
              <InputActionButton {...inputActionButton} disabled={disabled} />
            </div>
          )}
        </div>
        {suffix && (
          <div className="gi-input-text-suffix" data-disabled={disabled}>
            {suffix}
          </div>
        )}
      </div>
    );
  },
);

export const InputActionButton = ({
  onClick,
  ariaLabel,
  icon,
  dataTestId,
  ...props
}: InputActionButtonProps) => {
  return (
    <IconButton
      {...props}
      icon={{
        icon,
      }}
      data-testid={dataTestId}
      aria-label={ariaLabel || ''}
      onClick={onClick}
      variant="flat"
      size="small"
      appearance="dark"
    />
  );
};

export const InputText = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', clearButtonEnabled, ...props }, ref) => {
    if (clearButtonEnabled) {
      return <InputTextWithClear ref={ref} type={type} {...props} />;
    }

    return <Input ref={ref} type={type} {...props} />;
  },
);

InputText.displayName = 'InputText';
