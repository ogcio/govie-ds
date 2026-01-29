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
  /**
   * @deprecated Use the `maxLength` + `CharacterCount` component instead for displaying remaining characters.
   * `maxChars` works correctly in controlled mode (when passing `value`), but in uncontrolled mode
   * (e.g., with React Hook Form), the character count may not update correctly after `reset()`.
   * For uncontrolled usage, use `CharacterCount` with `watch()` or state to track the current value length.
   */
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
      name,
      ...props
    },
    externalRef,
  ) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [remainingChars, setRemainingChars] = useState<undefined | number>(
      maxChars,
    );

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
      if (!isControlled) {
        setInternalValue(newValue);
      }
      if (onChange) {
        onChange(event);
      }
    };

    const handleOnResetClick = () => {
      if (inputRef.current) {
        if (!isControlled) {
          setInternalValue('');
        }

        const event = {
          target: { name, value: '' },
          currentTarget: { name, value: '' },
          type: 'change',
          bubbles: true,
        } as React.ChangeEvent<HTMLTextAreaElement>;

        if (onChange) {
          onChange(event);
        }

        inputRef.current.focus();
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
              name={name}
              rows={rows}
              cols={cols}
              autoComplete={autoComplete}
              className={cn(className, 'gi-textarea')}
              ref={inputRef}
              data-icon-start={!!iconStart}
              data-clear-enabled={clearButtonEnabled}
              maxLength={maxChars}
              {...(isControlled ? { value: String(value) } : {})}
              onChange={handleOnChange}
              {...props}
            />
            {clearButtonEnabled ? (
              <div className="gi-text-area-end-element">
                <IconButton
                  type="button"
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
