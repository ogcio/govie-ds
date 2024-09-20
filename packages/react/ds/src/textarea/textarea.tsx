import React from 'react';

// Extend `React.TextareaHTMLAttributes<HTMLTextAreaElement>` so that
// the component can accept all the standard attributes and events that a `<textarea>` element can handle.
export type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    ref?: React.Ref<HTMLTextAreaElement>;
    hasError?: boolean;
    rows?: number;
    cols?: number;
    autoComplete?: string;
  };

// Use React.forwardRef to support refs properly
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      hasError,
      rows = 4, // default row count
      cols = 100, // default column count
      autoComplete = 'on', // default autoComplete behavior
      ...props
    },
    ref,
  ) => {
    return (
      <div className="gi-flex gi-items-center">
        <textarea
          rows={rows}
          cols={cols}
          autoComplete={autoComplete}
          className={`${hasError ? 'gi-border-red-600' : 'gi-border-gray-950'} gi-flex-initial gi-border-sm gi-border-solid gi-box-border gi-p-1 focus:gi-outline focus:gi-outline-[3px] focus:gi-border-lg focus:gi-border-gray-950 focus:gi-outline-yellow-400 focus:gi-outline-offset-0 xs:gi-text-md gi-text-sm gi-resize-y gi-min-h-10`}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

// Set the displayName for debugging purposes
TextArea.displayName = 'TextArea';
