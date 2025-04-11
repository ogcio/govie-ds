'use client';
import React, { useState } from 'react';
import { Button } from '../button.js';
import { ButtonSize } from '../types.js';

type ButtonGroupContextType = {
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
  name: string;
  size: ButtonSize;
  onChange?: (value: string) => void;
};

const ButtonGroupContext = React.createContext<
  ButtonGroupContextType | undefined
>(undefined);

type ButtonGroupItemProps = {
  value: string;
  children: React.ReactNode;
};

export const ButtonGroupItem: React.FC<ButtonGroupItemProps> = ({
  value,
  children,
}) => {
  const context = React.useContext(ButtonGroupContext);

  if (!context) {
    throw new Error('ButtonGroupItem must be used within a ButtonGroup');
  }

  const { selectedValue, setSelectedValue, name, size, onChange } = context;

  const handleClick = () => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <Button
      variant={selectedValue === value ? 'primary' : 'secondary'}
      size={size}
      appearance="dark"
      onClick={handleClick}
      id={`${name}-${value}`}
    >
      {children}
    </Button>
  );
};

type ButtonGroupProps = {
  name: string;
  size?: ButtonSize;
  onChange?: (value: string) => void;
  defaultValue?: string;
  children?: React.ReactNode;
};

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  name,
  size = 'medium',
  onChange,
  defaultValue,
  children,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue,
  );

  return (
    <ButtonGroupContext.Provider
      value={{ selectedValue, setSelectedValue, name, size, onChange }}
    >
      <div className="gi-btn-group">{children}</div>
    </ButtonGroupContext.Provider>
  );
};
