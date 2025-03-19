'use client';
import React, { useState } from 'react';
import { cn } from '../cn.js';
import { Icon, IconId } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';

export type InputActionButtonProps = {
  icon: IconId;
  onClick: any;
  disabled?: boolean;
  ariaLabel?: string;
  dataTestId?: string;
  ref?: React.Ref<HTMLButtonElement>;
};

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  inputClassName?: string;
  iconStart?: IconId;
  iconEnd?: IconId;
  inputActionButton?: InputActionButtonProps;
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

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
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
      <div className={cn(className, 'gi-text-input-container')}>
        {prefix && (
          <div className="gi-text-input-prefix" data-disabled={disabled}>
            {prefix}
          </div>
        )}
        <div className="gi-text-input-inner">
          {iconStart && (
            <div className="gi-text-input-icon-start" data-prefix={!!prefix}>
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
            className={cn(inputClassName, 'gi-text-input', {
              'gi-input-half-width': halfFluid,
            })}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {iconEnd && (
            <div
              className="gi-text-input-icon-end"
              data-end-element={!!inputActionButton}
              data-suffix={!!suffix}
            >
              <Icon icon={iconEnd} size="md" disabled={disabled} />
            </div>
          )}
          {inputActionButton && (
            <div className="gi-text-input-end-element" data-suffix={!!suffix}>
              <InputActionButton {...inputActionButton} disabled={disabled} />
            </div>
          )}
        </div>
        {suffix && (
          <div className="gi-text-input-suffix" data-disabled={disabled}>
            {suffix}
          </div>
        )}
      </div>
    );
  },
);

export type TextInputPasswordProps = Omit<
  TextInputProps,
  'type' | 'inputActionButton' | 'prefix' | 'suffix' | 'iconStart' | 'iconEnd'
>;

export const TextInputPassword = (props: TextInputPasswordProps) => {
  const [inputProps, setInputProps] = useState<{
    type: 'password' | 'text';
    icon: IconId;
  }>({
    icon: 'visibility',
    type: 'password',
  });

  const handleOnClickVisibility = () => {
    const isVisible = inputProps.type === 'text';
    setInputProps({
      type: isVisible ? 'password' : 'text',
      icon: isVisible ? 'visibility' : 'visibility_off',
    });
  };

  return (
    <TextInput
      {...props}
      type={inputProps.type}
      inputActionButton={{
        icon: inputProps.icon,
        onClick: handleOnClickVisibility,
      }}
    />
  );
};

TextInput.displayName = 'TextInput';
