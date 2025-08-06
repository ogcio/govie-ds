'use client';
import React, {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { cn } from '../cn.js';
import { HintText } from '../hint-text/hint-text.js';
import { translate as t } from '../i18n/utility.js';
import { Icon, IconId } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';

export type TextAreaProps = React.DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  rows?: number;
  cols?: number;
  autoComplete?: string;
  maxChars?: number;
  halfFluid?: boolean;
  iconStart?: IconId;
  clearButtonEnabled?: boolean;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      value,
      rows = 4,
      cols = 100,
      autoComplete = 'on',
      maxChars,
      halfFluid = false,
      iconStart,
      className,
      clearButtonEnabled,
      onChange,
      ...props
    },
    externalRef,
  ) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [remainingChars, setRemainingChars] = useState<undefined | number>(
      maxChars,
    );

    // Forward ref to the actual textarea element
    useImperativeHandle(externalRef, () => inputRef.current!);

    // Only use internal state when component is uncontrolled
    const [internalValue, setInternalValue] = useState<string>('');
    const isControlled = value !== undefined;
    const currentValue: string = isControlled ? String(value) : internalValue;

    useEffect(() => {
      if (maxChars !== undefined) {
        setRemainingChars(maxChars - currentValue.length);
      }
    }, [currentValue, maxChars]);

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;

      // Only update internal state if uncontrolled
      if (!isControlled) {
        setInternalValue(newValue);
      }

      // Always call the external onChange handler
      if (onChange) {
        onChange(event);
      }
    };

    const handleOnResetClick = () => {
      if (inputRef?.current) {
        // Clear the input
        const clearEvent = {
          target: { ...inputRef.current, value: '' },
          currentTarget: inputRef.current,
        } as React.ChangeEvent<HTMLTextAreaElement>;

        // Update internal state if uncontrolled
        if (!isControlled) {
          setInternalValue('');
        }

        // Focus the input
        inputRef.current.focus();

        // Call onChange handler with cleared value
        if (onChange) {
          onChange(clearEvent);
        }
      }
    };

    return (
      <>
        <div className="gi-textarea-container">
          <div
            className={cn('gi-textarea-inner', {
              'gi-input-half-width': halfFluid,
            })}
          >
            {iconStart && (
              <div className="gi-text-area-icon-start">
                <Icon icon={iconStart} size="md" disabled={props.disabled} />
              </div>
            )}
            <textarea
              rows={rows}
              cols={cols}
              autoComplete={autoComplete}
              className={cn(className, 'gi-textarea')}
              ref={inputRef}
              data-icon-start={!!iconStart}
              data-clear-enabled={clearButtonEnabled}
              maxLength={maxChars}
              value={currentValue}
              onChange={handleOnChange}
              {...props}
            />
            {clearButtonEnabled ? (
              <div className="gi-text-area-end-element">
                <IconButton
                  disabled={props.disabled}
                  icon={{
                    icon: 'close',
                  }}
                  onClick={handleOnResetClick}
                  variant="flat"
                  size="small"
                  appearance="dark"
                />
              </div>
            ) : null}
          </div>
        </div>

        {maxChars && (
          <div className="gi-textarea-remaining-chars">
            <HintText
              text={t('textarea.remainingChars', {
                remainingChars,
                defaultValue: `You have ${remainingChars} characters remaining`,
              })}
            />
          </div>
        )}
      </>
    );
  },
);

TextArea.displayName = 'TextArea';
