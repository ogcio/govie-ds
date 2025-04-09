'use client';
import React, { useState } from 'react';
import { FormField } from '../../forms/form-field.js';
import { Button } from '../button.js';
import { ButtonSize } from '../types.js';
type Option = {
  label: string;
  value: string;
};

type ButtonGroupProps = {
  options: Option[];
  name: string;
  label: string;
  hint?: string;
  size?: ButtonSize;
  onChange?: (value: string) => void;
  defaultValue?: string;
};

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  options,
  name,
  label,
  hint,
  size,
  onChange,
  defaultValue,
}) => {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);

  const handleClick = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <FormField
      className="gi-w-full"
      label={{
        text: label,
        htmlFor: name,
      }}
      hint={hint ? { text: hint } : undefined}
    >
      <div className="gi-flex gi-flex-wrap gi-gap-2 gi-pt-2 gi-justify-between">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={selected === option.value ? 'primary' : 'secondary'}
            size={size || 'medium'}
            appearance="dark"
            onClick={() => handleClick(option.value)}
            id={`${name}-${option.value}`}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </FormField>
  );
};
