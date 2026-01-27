'use client';
import React, {
  forwardRef,
  TextareaHTMLAttributes,
  useImperativeHandle,
  useRef,
} from 'react';
import { cn } from '../cn.js';
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
   * @deprecated The maxChars prop no longer renders remaining character count hint.
   * Use maxLength instead and render your own HintText component if needed.
   */
  maxChars?: number;
  halfFluid?: boolean;
  iconStart?: IconId;
  clearButtonEnabled?: boolean;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
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

    useImperativeHandle(externalRef, () => inputRef.current!);

    const handleOnResetClick = () => {
      if (inputRef.current) {
        inputRef.current.value = '';

        // Dispatch native input event to trigger form library updates
        const nativeEvent = new Event('input', { bubbles: true });
        inputRef.current.dispatchEvent(nativeEvent);

        // Also call onChange if provided (for controlled components)
        if (onChange) {
          const syntheticEvent = {
            target: inputRef.current,
            currentTarget: inputRef.current,
            type: 'change',
            bubbles: true,
          } as React.ChangeEvent<HTMLTextAreaElement>;
          onChange(syntheticEvent);
        }

        inputRef.current.focus();
      }
    };

    return (
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
            onChange={onChange}
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
    );
  },
);

TextArea.displayName = 'TextArea';
