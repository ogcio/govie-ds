'use client';
import React, {
  ChangeEvent,
  TextareaHTMLAttributes,
  useId,
  useState,
} from 'react';
import { cn } from '../cn.js';
import { ErrorText, ErrorTextProps } from '../error-text/error-text.js';
import { HintText, HintTextProps } from '../hint-text/hint-text.js';
import { Label, LabelProps } from '../label/label.js';

export type TextAreaProps = React.DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  ref?: React.Ref<HTMLTextAreaElement>;
  rows?: number;
  cols?: number;
  autoComplete?: string;
  error?: ErrorTextProps;
  hint?: HintTextProps;
  label?: LabelProps;
  maxChars?: number;
  dataTestid?: string;
};

export const TextArea = ({
  rows = 4,
  cols = 100,
  autoComplete = 'on',
  maxChars,
  label,
  error,
  hint,
  id,
  ref,
  dataTestid,
  ...props
}: TextAreaProps) => {
  const [remainingChars, setRemainingChars] = useState<undefined | number>(
    maxChars,
  );

  const uniqueId = useId();
  const labelId = `${uniqueId}-label`;
  const hintId = hint?.text ? `${uniqueId}-hint` : undefined;
  const errorId = error?.text ? `${uniqueId}-error` : undefined;

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;

    if (maxChars) {
      setRemainingChars(maxChars - (value as string)?.length || 0);
    }
  };

  return (
    <div
      className={cn('gi-textarea-layout-container', {
        'gi-error-state': !!error?.text,
      })}
      data-testid={dataTestid}
    >
      {label?.text && (
        <Label
          text={label.text}
          size={label.size}
          htmlFor={id}
          id={labelId}
          className={cn({
            'gi-mb-2': !hint?.text && !error?.text,
            'gi-mb-1': hint?.text || error?.text,
          })}
        />
      )}

      {hint?.text && <HintText text={hint.text} size={hint.size} id={hintId} />}
      {error?.text && (
        <ErrorText text={error.text} size={error.size} id={errorId} />
      )}

      <div className="gi-textarea-container">
        <textarea
          id={id}
          rows={rows}
          cols={cols}
          autoComplete={autoComplete}
          className={cn('gi-textarea', { 'gi-textarea-error': !!error?.text })}
          ref={ref}
          maxLength={maxChars}
          onChange={handleOnChange}
          aria-labelledby={labelId}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ')}
          {...props}
        />
      </div>

      {maxChars && (
        <div className="gi-textarea-remaining-chars">
          <HintText text={`You have ${remainingChars} characters remaining`} />
        </div>
      )}
    </div>
  );
};

TextArea.displayName = 'TextArea';
