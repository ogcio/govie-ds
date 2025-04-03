'use client';
import React, {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { cn } from '../cn.js';
import { HintText } from '../hint-text/hint-text.js';
import { translate as t } from '../i18n/util.js';
import { Icon, IconId } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';

export type TextAreaProps = React.DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  ref?: React.Ref<HTMLTextAreaElement>;
  rows?: number;
  cols?: number;
  autoComplete?: string;
  maxChars?: number;
  halfFluid?: boolean;
  iconStart?: IconId;
};

export const TextArea = forwardRef(
  (
    {
      rows = 4,
      cols = 100,
      autoComplete = 'on',
      maxChars,
      halfFluid = false,
      iconStart,
      className,
      ...props
    }: TextAreaProps,
    externalRef,
  ) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [remainingChars, setRemainingChars] = useState<undefined | number>(
      maxChars,
    );

    useImperativeHandle(externalRef, () => inputRef.current!);

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const {
        target: { value },
      } = event;

      if (maxChars) {
        setRemainingChars(maxChars - (value as string)?.length || 0);
      }

      if (props.onChange) {
        props.onChange(event);
      }
    };

    const handleOnResetClick = () => {
      if (inputRef?.current) {
        inputRef.current.value = '';
        inputRef.current.focus();

        const newInputEvent = {
          target: inputRef.current,
          currentTarget: inputRef.current,
        } as unknown as React.ChangeEvent<HTMLTextAreaElement>;

        if (props.onChange) {
          props.onChange(newInputEvent);
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
              maxLength={maxChars}
              onChange={handleOnChange}
              {...props}
            />
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
