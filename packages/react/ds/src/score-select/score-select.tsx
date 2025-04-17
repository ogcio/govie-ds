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
  return (
    <FormField
      className="gi-w-full"
      label={{ text: label }}
      hint={hint ? { text: hint } : undefined}
    >
      <div className="gi-score-select-button-group">
        {leftLabel && rightLabel && options.length > 2 && (
          <div className="gi-score-select-labels-responsive">
            <div>
              {options[0]?.label} – {leftLabel}
            </div>
            <div>
              {options[options.length - 1]?.label} – {rightLabel}
            </div>
          </div>
        )}
        <ButtonGroup
          name={name}
          size={size}
          defaultValue={defaultValue}
          onChange={(value) => onChange?.(value)}
        >
          {options.map((option) => (
            <ButtonGroupItem key={option.value} value={option.value}>
              {option.label}
            </ButtonGroupItem>
          ))}
        </ButtonGroup>

        {(leftLabel || rightLabel) && (
          <div className="gi-score-select-labels">
            <div>{leftLabel}</div>
            <div>{rightLabel}</div>
          </div>
        )}
      </div>
    </FormField>
  );
};
