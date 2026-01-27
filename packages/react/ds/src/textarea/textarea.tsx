'use client';
import React, {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useImperativeHandle,
  useEffect,
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

    // Sync character count from the actual DOM value
    const syncRemainingChars = () => {
      if (maxChars !== undefined && inputRef.current) {
        setRemainingChars(maxChars - inputRef.current.value.length);
      }
    };

    // Sync character count when controlled value changes
    useEffect(() => {
      if (isControlled && maxChars !== undefined) {
        setRemainingChars(maxChars - String(value).length);
      }
    }, [value, maxChars, isControlled]);

    /**
     * Uncontrolled Mode: Sync character count and detect programmatic value changes.
     *
     * WHY THIS IS NEEDED:
     * When using React Hook Form with the `register` pattern (uncontrolled),
     * RHF manipulates the textarea's value directly via refs (e.g., when calling `reset()`).
     * These programmatic changes bypass React's onChange handler, so our character count
     * would become out of sync with the actual textarea value.
     *
     * HOW IT WORKS:
     * We use two mechanisms to detect value changes:
     *
     * 1. VALUE SETTER OVERRIDE (for RHF and direct element.value assignments):
     *    We override the native `value` property setter on this specific textarea element.
     *    When any code (including RHF) sets `element.value = "..."`, our custom setter:
     *      a. Calls the original native setter to actually update the DOM
     *      b. Updates the remaining character count to stay in sync
     *
     * 2. FORM RESET EVENT LISTENER (for native form.reset()):
     *    Native form.reset() bypasses the value setter - it uses browser internals.
     *    We listen for the 'reset' event on the parent form and sync after it completes.
     *
     * TECHNICAL DETAILS:
     * - We get the original property descriptor from HTMLTextAreaElement.prototype
     * - We define a new property on this specific element instance (not the prototype)
     * - The custom setter wraps the original, adding our sync logic
     * - On cleanup, we restore the original descriptor to avoid memory leaks
     * - For native forms, we find the parent <form> and listen for 'reset' events
     *
     * EXAMPLE SCENARIOS:
     *
     * RHF reset():
     * 1. User types "hello" → onChange fires → remainingChars = maxChars - 5
     * 2. User clicks RHF reset button → RHF sets element.value = "" via ref
     * 3. Our setter intercepts this → remainingChars = maxChars - 0 = maxChars
     * 4. Character count correctly shows full capacity again
     *
     * Native form.reset():
     * 1. User types "hello" → onChange fires → remainingChars = maxChars - 5
     * 2. User clicks native reset/clear → form.reset() is called
     * 3. Browser resets all form elements (bypasses our setter)
     * 4. Our 'reset' event listener fires → syncs remainingChars after reset completes
     * 5. Character count correctly shows full capacity again
     *
     * FUTURE REFACTOR:
     * This logic will be removed when the character count (HintText) is decoupled
     * from TextArea and used as a separate composable component alongside it.
     * At that point, the parent component will be responsible for managing the
     * character count state and passing it to both TextArea and HintText.
     */
    useEffect(() => {
      const element = inputRef.current;
      if (!element || maxChars === undefined || isControlled) {
        return;
      }
      syncRemainingChars();

      // Get the native value property descriptor from the prototype
      const descriptor = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        'value',
      );
      if (!descriptor) {
        return;
      }

      // Override the value property on this specific element instance
      Object.defineProperty(element, 'value', {
        get() {
          return descriptor.get?.call(this);
        },
        set(newValue) {
          // Call the original setter to update the DOM
          descriptor.set?.call(this, newValue);
          // Sync our character count state
          if (maxChars !== undefined) {
            setRemainingChars(maxChars - (newValue?.length || 0));
          }
        },
        configurable: true,
      });

      // Listen for native form reset events
      // form.reset() bypasses the value setter, so we need this separate handler
      const form = element.closest('form');
      const handleFormReset = () => {
        // Use setTimeout to sync after the browser completes the reset
        setTimeout(syncRemainingChars, 0);
      };
      form?.addEventListener('reset', handleFormReset);

      // Cleanup: restore the original property descriptor and remove event listener
      return () => {
        Object.defineProperty(element, 'value', descriptor);
        form?.removeEventListener('reset', handleFormReset);
      };
    }, [maxChars, isControlled]);

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      syncRemainingChars();
      if (onChange) {
        onChange(event);
      }
    };

    const handleOnResetClick = () => {
      if (inputRef.current) {
        inputRef.current.value = '';
        syncRemainingChars();

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
              onChange={handleOnChange}
              {...(isControlled ? { value: String(value) } : {})}
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
