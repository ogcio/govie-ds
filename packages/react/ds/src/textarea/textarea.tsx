'use client';
import React, { ChangeEvent, TextareaHTMLAttributes, useState } from 'react';
import { cn } from '../cn.js';
import { HintText } from '../hint-text/hint-text.js';

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
};

export const TextArea = ({
  rows = 4,
  cols = 100,
  autoComplete = 'on',
  maxChars,
  ref,
  halfFluid = false,
  ...props
}: TextAreaProps) => {
  const [remainingChars, setRemainingChars] = useState<undefined | number>(
    maxChars,
  );

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;

    if (maxChars) {
      setRemainingChars(maxChars - (value as string)?.length || 0);
    }
  };

  return (
    <div className={cn('gi-textarea-layout-container')}>
      <div className="gi-textarea-container">
        <textarea
          rows={rows}
          cols={cols}
          autoComplete={autoComplete}
          className={cn('gi-textarea', {
            'gi-input-half-width': halfFluid,
          })}
          ref={ref}
          maxLength={maxChars}
          onChange={handleOnChange}
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
