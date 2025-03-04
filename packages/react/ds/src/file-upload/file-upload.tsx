import React from 'react';

// Extend `React.InputHTMLAttributes<HTMLInputElement>` so that
// the component can accept all the standard attributes and events that an `<input>` element can handle.
export type FileUploadProps = React.InputHTMLAttributes<HTMLInputElement>;

// Use React.forwardRef to support refs properly
export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (props, ref) => {
    return (
      <input
        className="gi-file-upload-input"
        type="file"
        ref={ref}
        {...props}
      />
    );
  },
);

// Set the displayName for debugging purposes
FileUpload.displayName = 'FileUpload';
