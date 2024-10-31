'use client';
import React, {
  ChangeEvent,
  TextareaHTMLAttributes,
  useId,
  useState,
} from 'react';
import { ErrorText, ErrorTextProps } from '../error-text/error-text.js';
import { HintText, HintTextProps } from '../hint-text/hint-text.js';
import { Label, LabelProps } from '../label/label.js';

// Extend `React.TextareaHTMLAttributes<HTMLTextAreaElement>` so that
// the component can accept all the standard attributes and events that a `<textarea>` element can handle.
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
};

// Use React.forwardRef to support refs properly
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      rows = 4, // default row count
      cols = 100, // default column count
      autoComplete = 'on', // default autoComplete behavior
      maxChars,
      label,
      error,
      hint,
      id,
      ...props
    },
    ref,
  ) => {
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
        className={`gi-pt-2 gi-mb-4 ${error?.text ? 'gi-px-4 gi-border-solid gi-border-l-lg gi-border-red-600' : ''}`}
      >
        {label?.text && (
          <Label
            text={label.text}
            size={label.size}
            htmlFor={id}
            id={labelId}
            className={!hint?.text && !error?.text ? 'gi-mb-2' : ''}
          />
        )}

        {hint?.text && (
          <HintText text={hint.text} size={hint.size} id={hintId} />
        )}

        {error?.text && (
          <ErrorText text={error.text} size={error.size} id={errorId} />
        )}

        <div className="gi-flex gi-items-center">
          <textarea
            id={id}
            rows={rows}
            cols={cols}
            autoComplete={autoComplete}
            className={`${error?.text ? 'gi-textarea-error' : 'gi-textarea'}`}
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
            <HintText
              text={`You have ${remainingChars} characters remaining`}
            />
          </div>
        )}
      </div>
    );
  },
);

// Set the displayName for debugging purposes
TextArea.displayName = 'TextArea';
