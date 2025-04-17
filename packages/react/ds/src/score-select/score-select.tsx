'use client';
import React from 'react';
import {
  ButtonGroup,
  ButtonGroupItem,
} from '../button/button-group/button-group.js';
import { FormField } from '../forms/form-field.js';
import { ScoreSelectProps } from './type.js';

export const ScoreSelect: React.FC<ScoreSelectProps> = ({
  name,
  size = 'medium',
  options,
  defaultValue,
  label,
  hint,
  leftLabel,
  rightLabel,
  onChange,
}) => {
  const controlId = React.useId();
  const labelId = `${controlId}-label`;
  const hintId = hint ? `${controlId}-hint` : undefined;

  return (
    <FormField
      className="gi-w-full"
      label={{ text: label, id: labelId }}
      hint={hint ? { text: hint, id: hintId } : undefined}
    >
      <div
        className="gi-score-select-button-group"
        role="group"
        aria-labelledby={labelId}
        aria-describedby={hintId}
      >
        {leftLabel && rightLabel && options.length > 2 && (
          <div className="gi-score-select-labels-responsive" aria-hidden="true">
            <div>
              {options[0]?.label} – {leftLabel}
            </div>
            <div>
              {options.at(-1)?.label} – {rightLabel}
            </div>
          </div>
        )}
        <ButtonGroup
          name={name}
          size={size}
          defaultValue={defaultValue}
          onChange={(value) => onChange?.(value)}
          role="radiogroup"
          aria-labelledby={labelId}
          aria-describedby={hintId}
        >
          {options.map((option) => (
            <ButtonGroupItem
              key={option.value}
              value={option.value}
              role="radio"
              aria-checked={defaultValue === option.value}
              aria-label={`${option.label}${leftLabel && option.value === options[0]?.value ? ` - ${leftLabel}` : ''}${rightLabel && option.value === options.at(-1)?.value ? ` - ${rightLabel}` : ''}`}
            >
              {option.label}
            </ButtonGroupItem>
          ))}
        </ButtonGroup>

        {(leftLabel || rightLabel) && (
          <div className="gi-score-select-labels" aria-hidden="true">
            <div>{leftLabel}</div>
            <div>{rightLabel}</div>
          </div>
        )}
      </div>
    </FormField>
  );
};
