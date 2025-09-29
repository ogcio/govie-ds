'use client';

import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { cn } from '../cn.js';
import { Icon, IconId } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';
import { Input as PrimitiveInput } from '../primitives/input.js';
import type {
  InputActionButtonProps,
  InputTextProps,
  InputTextTableCellProps,
} from './type.js';

const InputTextWithClear = forwardRef<HTMLInputElement, InputTextProps>(
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
        __origin: 'clear_button',
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      if (onChange) {
        onChange(newInputEvent);
      }
    };

    return (
      <Input
        {...props}
        onChange={onChange}
        ref={inputRef}
        inputActionButton={{
          icon: 'close',
          onClick: handleOnReset,
        }}
      />
    );
  },
);

const Input = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      prefix,
      inputActionButton,
      inputActionPosition = 'beforeSuffix',
      suffix,
      halfFluid = false,
      className,
      type = 'text',
      iconStart,
      iconStartClassName,
      onIconStartClick,
      iconEnd,
      iconEndClassName,
      onIconEndClick,
      disabled,
      inputClassName,
      iconEndRef,
      containerProps,
      ...props
    },
    ref,
  ) => {
    const renderActionButton = useMemo(() => {
      if (inputActionButton && inputActionPosition === 'beforeSuffix') {
        return (
          <div
            className="gi-input-text-action-before-suffix"
            data-suffix={!!suffix}
            data-has-icon-end={!!iconEnd}
          >
            <InputActionButton {...inputActionButton} disabled={disabled} />
          </div>
        );
      }
      return null;
    }, [inputActionButton]);

    return (
      <div
        className={cn(className, 'gi-input-text-container')}
        {...containerProps}
      >
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
            <div
              className={cn('gi-input-text-icon-start', iconStartClassName)}
              onClick={onIconStartClick}
              data-prefix={!!prefix}
            >
              {typeof iconStart === 'string' ? (
                <Icon
                  icon={iconStart as IconId}
                  size="md"
                  disabled={disabled}
                />
              ) : (
                iconStart
              )}
            </div>
          )}
          <PrimitiveInput
            type={type}
            data-icon-start={!!iconStart}
            data-icon-end={!!iconEnd}
            data-end-element={!!inputActionButton}
            data-prefix={!!prefix}
            data-suffix={!!suffix}
            data-testid={props.dataTestId}
            className={cn('gi-input-text', inputClassName)}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {iconEnd && (
            <div
              className={cn('gi-input-text-icon-end', iconEndClassName)}
              data-end-element={
                !!inputActionButton && inputActionPosition === 'afterSuffix'
              }
              data-suffix={!!suffix}
              onClick={onIconEndClick}
              ref={iconEndRef}
            >
              {typeof iconEnd === 'string' ? (
                <Icon icon={iconEnd as IconId} size="md" disabled={disabled} />
              ) : (
                iconEnd
              )}
            </div>
          )}
          {renderActionButton}
        </div>
        {inputActionButton && inputActionPosition === 'afterSuffix' && (
          <div className="gi-input-text-end-element" data-suffix={!!suffix}>
            <InputActionButton {...inputActionButton} disabled={disabled} />
          </div>
        )}
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

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ type = 'text', clearButtonEnabled, ...props }, ref) => {
    const showInputTextWithClearButton =
      clearButtonEnabled || type === 'search';

    if (showInputTextWithClearButton) {
      return <InputTextWithClear ref={ref} type={type} {...props} />;
    }

    return <Input ref={ref} type={type} {...props} />;
  },
);

InputText.displayName = 'InputText';

export const InputTextTableCell = forwardRef<
  HTMLInputElement,
  InputTextTableCellProps
>(({ type = 'text', error, ...props }, ref) => (
  <InputText
    {...props}
    containerProps={{
      'data-table-cell': true,
      'data-table-cell-error-state': error?.toString(),
    }}
    autoComplete="off"
    ref={ref}
    type={type}
  />
));
