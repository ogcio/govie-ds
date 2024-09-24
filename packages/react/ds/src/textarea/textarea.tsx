import React from 'react';
import { ErrorText, ErrorTextProps } from '../error-text/error-text.js';
import { HintText, HintTextProps } from '../hint-text/hint-text.js';
import { Label, LabelProps } from '../label/label.js';

// Extend `React.TextareaHTMLAttributes<HTMLTextAreaElement>` so that
// the component can accept all the standard attributes and events that a `<textarea>` element can handle.
export type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    ref?: React.Ref<HTMLTextAreaElement>;
    rows?: number;
    cols?: number;
    autoComplete?: string;
    errorText?: ErrorTextProps;
    hintText?: HintTextProps;
    label?: LabelProps;
  };

// Use React.forwardRef to support refs properly
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      rows = 4, // default row count
      cols = 100, // default column count
      autoComplete = 'on', // default autoComplete behavior
      label,
      errorText,
      hintText,
      id,
      ...props
    },
    ref,
  ) => {
    const hasError = errorText && errorText.content;
    return (
      <div
        className={`gi-pt-2 gi-mb-4 ${hasError ? 'gi-px-4 gi-border-solid gi-border-l-lg gi-border-red-600' : ''}`}
      >
        {label && (
          <Label size={label.size} htmlFor={id}>
            {label.content}
          </Label>
        )}

        {hintText && (
          <HintText size={hintText.size}>{hintText.content}</HintText>
        )}

        {hasError && errorText && (
          <ErrorText size={errorText.size}>{errorText.content}</ErrorText>
        )}
        <div className="gi-flex gi-items-center">
          <textarea
            id={id} // Bind the id for label association
            rows={rows}
            cols={cols}
            autoComplete={autoComplete}
            className={`${hasError ? 'gi-border-red-600' : 'gi-border-gray-950'} gi-flex-initial gi-border-sm gi-border-solid gi-box-border gi-p-1 focus:gi-outline focus:gi-outline-[3px] focus:gi-border-lg focus:gi-border-gray-950 focus:gi-outline-yellow-400 focus:gi-outline-offset-0 xs:gi-text-md gi-text-sm gi-resize-y gi-min-h-10`}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  },
);

// Set the displayName for debugging purposes
TextArea.displayName = 'TextArea';
