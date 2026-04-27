'use client';
import { useId, forwardRef } from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '../cn.js';
import { HintText } from '../hint-text/hint-text.js';
import { Label } from '../label/label.js';
import { Input } from '../primitives/input.js';

import {
  InputCheckboxSizeEnum,
  type InputCheckboxSizeEnumType,
  type InputCheckboxProps,
  type InputCheckboxTableCellProps,
} from './types.js';

export const getCheckboxWidth = (size?: InputCheckboxSizeEnumType) => {
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
    const generatedId = useId();
    const CheckboxId = id || generatedId;
    const hasRichContent = !!children;
    const labelContent = children ?? label;

    const {
      container,
      checkbox,
      hintBefore,
      label: label_,
    } = styles({
      hasRichContent,
      indeterminate,
      size,
    });

    return (
      <>
        <div className={container()} {...containerProps}>
          <Input
            type="checkbox"
            ref={ref}
            id={CheckboxId}
            className={checkbox()}
            aria-labelledby={labelContent ? `${CheckboxId}-label` : undefined}
            {...props}
          />

          {labelContent && (
            <Label
              id={`${CheckboxId}-label`}
              htmlFor={hasRichContent ? undefined : CheckboxId}
              size={size}
              className={label_()}
            >
              {labelContent}
            </Label>
          )}
        </div>

        {hint && (
          <div className="gi-flex gi-gap-3">
            <div className="gi-h-auto">
              <div className={hintBefore()} />
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

const styles = tv({
  slots: {
    container: 'gi-gap-3 gi-flex gi-items-center',
    label: '',
    hintBefore: '',
    checkbox: [
      // base state
      'gi-rounded-sm',
      'gi-focus-state-outline',
      'gi-cursor-pointer',
      'gi-appearance-none',
      'gi-border-sm',
      'gi-border-solid',
      'gi-border-color-border-system-neutral-default',
      // hover state
      'hover:gi-outline',
      'hover:gi-outline-sm',
      'hover:gi-outline-gray-200',
      'hover:gi-outline-offset-0',
      // focus state
      'focus:gi-shadow-[inset_0_0_0_1px]',
      'focus:gi-shadow-color-border-system-neutral-interactive-hover',
      // disabled state
      'gi-input-disabled-state', // TODO: convert this one
      'disabled:hover:gi-outline-none',
      'disabled:before:gi-border-color-border-system-neutral-interactive-disabled-surface',
      'disabled:gi-border-color-border-system-neutral-interactive-disabled-surface',
      // checked state
      'checked:before:gi-block',
      'checked:before:gi--rotate-45',
      'checked:before:gi-relative',
      'checked:before:gi-border-l-lg',
      'checked:before:gi-border-b-lg',
      'checked:before:gi-border-color-border-system-neutral-default',
    ],
  },
  variants: {
    hasRichContent: {
      true: {
        container: 'gi-items-start',
      },
      false: {
        label: 'gi-cursor-pointer',
      },
    },
    indeterminate: {
      true: {
        checkbox: [
          'checked:before:gi-translate-y-0',
          'checked:before:gi-rotate-0',
        ],
      },
    },
    size: {
      [InputCheckboxSizeEnum.Small as string]: {
        hintBefore: 'gi-w-6',
        checkbox: [
          'gi-flex-none',
          'gi-w-6',
          'gi-h-6',
          'checked:before:gi-w-3',
          'checked:before:gi-h-[1px]',
          'checked:before:gi-left-1',
          'checked:before:gi-top-[9px]',
          'checked:before:gi-border-b-sm',
        ],
      },
      [InputCheckboxSizeEnum.Medium as string]: {
        hintBefore: 'gi-w-8',
        checkbox: [
          'gi-flex-none',
          'gi-w-8',
          'gi-h-8',
          'checked:before:gi-w-5',
          'checked:before:gi-h-[1px]',
          'checked:before:gi-left-1.5',
          'checked:before:gi-top-[13px]',
          'checked:before:gi-border-b-md',
        ],
      },
    },
  },
  compoundVariants: [
    {
      indeterminate: true,
      size: InputCheckboxSizeEnum.Small,
      checkbox: [
        'checked:before:gi-w-3',
        'checked:before:gi-h-[1px]',
        'checked:before:gi-left-1',
        'checked:before:gi-top-[9px]',
        'checked:before:gi-border-b-sm',
      ],
    },
    {
      indeterminate: true,
      size: InputCheckboxSizeEnum.Medium,
      checkbox: [
        'checked:before:gi-w-4',
        'checked:before:gi-h-[1px]',
        'checked:before:gi-left-1.5',
        'checked:before:gi-top-[13px]',
        'checked:before:gi-border-b-md',
      ],
    },
  ],
});

InputCheckbox.displayName = 'InputCheckbox';
InputCheckboxTableCell.displayName = 'InputCheckboxTableCell';
