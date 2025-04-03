'use client';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { cn } from '../cn.js';
import { Icon, IconId } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';

export type InputActionButtonProps = {
  icon: IconId;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
  clearButtonEnabled?: boolean;
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

export const InputTextWithClear = forwardRef<HTMLInputElement, TextInputProps>(
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
      <InputText
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

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type = 'text', clearButtonEnabled, ...props }, ref) => {
    if (clearButtonEnabled) {
      return <InputTextWithClear ref={ref} type={type} {...props} />;
    }

    return <InputText ref={ref} type={type} {...props} />;
  },
);

const InputText = forwardRef<HTMLInputElement, TextInputProps>(
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
        <div
          className={cn('gi-text-input-inner', {
            'gi-input-half-width': halfFluid,
          })}
        >
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
            className={cn(inputClassName, 'gi-text-input')}
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

TextInput.displayName = 'TextInput';
