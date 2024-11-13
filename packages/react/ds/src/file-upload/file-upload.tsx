import React from 'react';
import { ErrorText, ErrorTextProps } from '../error-text/error-text.js';
import { HintText, HintTextProps } from '../hint-text/hint-text.js';
import { Label, LabelProps } from '../label/label.js';

// Extend `React.InputHTMLAttributes<HTMLInputElement>` so that
// the component can accept all the standard attributes and events that an `<input>` element can handle.
export type FileUploadProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: ErrorTextProps;
  hint?: HintTextProps;
  label?: LabelProps;
};

// Use React.forwardRef to support refs properly
export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ label, hint, error, id, ...props }, ref) => {
    return (
      <div
        className={`gi-file-upload-container ${error?.text && 'gi-error-state'}`}
      >
        {label?.text && (
          <Label
            text={label.text}
            size={label.size}
            htmlFor={id}
            className={!hint?.text && !error?.text ? 'gi-mb-2' : 'gi-mb-1'}
          >
            {label.children}
          </Label>
        )}

        {hint?.text && <HintText text={hint.text} size={hint.size} />}

        {error?.text && <ErrorText text={error.text} size={error.size} />}

        <input
          id={id}
          className="gi-file-upload-input"
          type="file"
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

// Set the displayName for debugging purposes
FileUpload.displayName = 'FileUpload';
