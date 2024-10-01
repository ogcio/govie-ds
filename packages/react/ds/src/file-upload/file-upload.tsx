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
        className={`gi-pt-2 gi-mb-4 ${error?.text ? 'gi-px-4 gi-border-solid gi-border-l-lg gi-border-red-600' : ''}`}
      >
        {label?.text && (
          <Label text={label.text} size={label.size} htmlFor={id}>
            {label.children}
          </Label>
        )}

        {hint?.text && <HintText text={hint.text} size={hint.size} />}

        {error?.text && <ErrorText text={error.text} size={error.size} />}

        <input
          id={id}
          className="xs:gi-text-md gi-text-sm gi-leading-10 xs:!gi-leading-5 gi-p-[3px] gi-max-w-[100%] gi-border-transparent gi-flex-initial gi-ml-[-5px] gi-border-sm gi-border-solid gi-box-border focus:gi-outline focus:gi-outline-[3px] focus:gi-border-lg focus:gi-border-gray-950 focus:gi-outline-yellow-400 focus:gi-outline-offset-0 gi-z-1"
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
