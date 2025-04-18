'use client';
import React, { PropsWithChildren, useState } from 'react';
import { Button } from '../button.js';
import { ButtonSize } from '../types.js';

type ButtonGroupContextType = {
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
  name: string;
  size: ButtonSize;
  onChange?: (value: string) => void;
  groupId: string;
};

const ButtonGroupContext = React.createContext<
  ButtonGroupContextType | undefined
>(undefined);

type ButtonGroupItemProps = PropsWithChildren<{
  value: string;
  role?: string;
  'aria-checked'?: boolean;
  'aria-label'?: string;
}>;

export const ButtonGroupItem: React.FC<ButtonGroupItemProps> = ({
  value,
  children,
  role: customRole,
  'aria-checked': ariaChecked,
  'aria-label': ariaLabel,
}) => {
  const context = React.useContext(ButtonGroupContext);

  if (!context) {
    throw new Error('ButtonGroupItem must be used within a ButtonGroup');
  }

  const { selectedValue, setSelectedValue, size, onChange, groupId } = context;
  const isSelected = selectedValue === value;

  const handleClick = () => {
    setSelectedValue(value);
    onChange?.(value);
  };

  const itemId = `${groupId}-${value}`;

  return (
    <Button
      variant={isSelected ? 'primary' : 'secondary'}
      size={size}
      appearance="dark"
      onClick={handleClick}
      id={itemId}
      role={customRole || 'radio'}
      aria-checked={ariaChecked === undefined ? isSelected : ariaChecked}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
};

type ButtonGroupProps = PropsWithChildren<{
  name: string;
  size?: ButtonSize;
  onChange?: (value: string) => void;
  defaultValue?: string;
  role?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}>;

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  name,
  size = 'medium',
  onChange,
  defaultValue,
  children,
  role: customRole,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue,
  );

  const groupId = React.useId();

  return (
    <ButtonGroupContext.Provider
      value={{ selectedValue, setSelectedValue, name, size, onChange, groupId }}
    >
      <div
        className="gi-btn-group"
        role={customRole || 'radiogroup'}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
};
