'use client';
import { useId, forwardRef, type ReactNode } from 'react';
import { cn } from '../cn.js';
import { HintText } from '../hint-text/hint-text.js';
import { Input } from '../primitives/input.js';

import {
  InputCheckboxSizeEnum,
  type InputCheckboxSizeEnumType,
  type InputCheckboxProps,
  InputCheckboxTableCellProps,
} from './types.js';

const getSizeClass = (size: InputCheckboxSizeEnumType): string => {
  switch (size) {
    case InputCheckboxSizeEnum.Large: {
      return 'gi-input-checkbox-large';
    }
    case InputCheckboxSizeEnum.Small: {
      return 'gi-input-checkbox-small';
    }
    default: {
      return 'gi-input-checkbox-medium';
    }
  }
};

export const getCheckboxWidth = (size?: InputCheckboxSizeEnumType) => {
  if (size === InputCheckboxSizeEnum.Large) {
    return 'gi-w-11';
  }
  if (size === InputCheckboxSizeEnum.Small) {
    return 'gi-w-6';
  }
  return 'gi-w-8';
};

export const InputCheckbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
  (
    {
      id,
      size = InputCheckboxSizeEnum.Medium,
      label,
      children,
      hint,
      indeterminate = false,
      containerProps,
      ...props
    },
    ref,
  ) => {
    const CheckboxId = id || useId();
    const hasRichContent = !!children;
    const labelContent = children ?? label;

    return (
      <>
        <div
          className={cn('gi-input-checkbox-container', {
            '!gi-items-start': hasRichContent,
          })}
          {...containerProps}
        >
          <Input
            type="checkbox"
            ref={ref}
            id={CheckboxId}
            className={cn(getSizeClass(size), {
              'gi-checkbox-indeterminate': indeterminate,
            })}
            aria-labelledby={labelContent ? `${CheckboxId}-label` : undefined}
            {...props}
          />

          {labelContent && (
            <label
              id={`${CheckboxId}-label`}
              htmlFor={hasRichContent ? undefined : CheckboxId}
              className={cn({
                'gi-rich-label': hasRichContent,
              })}
            >
              {labelContent}
            </label>
          )}
        </div>

        {hint && (
          <div className="gi-input-checkbox-hint-container">
            <div>
              <div className={getCheckboxWidth(size)} />
            </div>
            <HintText id={`${CheckboxId}-hint`} text={hint} />
          </div>
        )}
      </>
    );
  },
);

export const InputCheckboxTableCell: React.FC<InputCheckboxTableCellProps> = ({
  error,
  ...props
}) => (
  <InputCheckbox
    {...props}
    size="sm"
    containerProps={{
      'data-table-cell': true,
      'data-table-cell-error-state': error?.toString(),
    }}
  />
);

InputCheckbox.displayName = 'InputCheckbox';
InputCheckboxTableCell.displayName = 'InputCheckboxTableCell';
