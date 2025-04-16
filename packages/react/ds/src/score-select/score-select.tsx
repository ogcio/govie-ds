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
  middleLabel,
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

        {(leftLabel || middleLabel || rightLabel) && (
          <div className="gi-score-select-labels">
            <div className="gi-text-left">{leftLabel}</div>
            <div className="gi-text-center">{middleLabel}</div>
            <div className="gi-text-right">{rightLabel}</div>
          </div>
        )}
      </div>
    </FormField>
  );
};
