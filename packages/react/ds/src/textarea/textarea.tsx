'use client';
import React, {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useImperativeHandle,
  useLayoutEffect,
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

    const isControlled = value !== undefined;

    // Sync remainingChars with actual DOM value on every render
    // This catches programmatic value changes (e.g., RHF reset())
    useLayoutEffect(() => {
      if (maxChars === undefined || !inputRef.current) {
        return;
      }
      const currentLength = inputRef.current.value.length;
      const newRemaining = maxChars - currentLength;
      if (newRemaining !== remainingChars) {
        setRemainingChars(newRemaining);
      }
    });

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (maxChars !== undefined) {
        setRemainingChars(maxChars - event.target.value.length);
      }
      if (onChange) {
        onChange(event);
      }
    };

    const handleOnResetClick = () => {
      if (inputRef.current) {
        inputRef.current.value = '';

        if (maxChars !== undefined) {
          setRemainingChars(maxChars);
        }

        const event = {
          target: inputRef.current,
          currentTarget: inputRef.current,
          type: 'change',
          bubbles: true,
        } as unknown as React.ChangeEvent<HTMLTextAreaElement>;

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
