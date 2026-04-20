'use client';

import type { FC } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import Button from '../atoms/Button';
import { normalizeSize } from '../utils/normalize-size.js';
import { cn } from '../cn.js';
import { useDomId } from '../hooks/use-dom-id.js';
import type {
  ButtonGroupContextType,
  ButtonGroupItemProps,
  ButtonGroupProps,
} from './types.js';

const ButtonGroupContext = createContext<ButtonGroupContextType | undefined>(
  undefined,
);

export const ButtonGroupItem: FC<ButtonGroupItemProps> = ({
  value,
  children,
  role: customRole,
  'aria-checked': ariaChecked,
  'aria-label': ariaLabel,
}) => {
  const context = useContext(ButtonGroupContext);

  if (!context) {
    throw new Error('ButtonGroupItem must be used within a ButtonGroup');
  }

  const {
    selectedValue,
    setSelectedValue,
    size,
    onChange,
    groupId,
    appearance,
  } = context;
  const isSelected = selectedValue === value;

  const handleClick = () => {
    setSelectedValue(value);
    onChange?.(value);
  };

  const itemId = `${groupId}-${value}`;

  return (
    <Button
      variant={isSelected ? 'primary' : 'secondary'}
      size={normalizeSize(size)}
      appearance={appearance}
      onClick={handleClick}
      id={itemId}
      role={customRole || 'radio'}
      ariaChecked={ariaChecked === undefined ? isSelected : ariaChecked}
      ariaLabel={ariaLabel}
      type="button"
    >
      {children}
    </Button>
  );
};

export const ButtonGroup: FC<ButtonGroupProps> = ({
  name,
  size = 'medium',
  appearance = 'dark',
  onChange,
  defaultValue,
  value,
  children,
  role: customRole,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  className,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue,
  );

  const selectedValue = value === undefined ? internalValue : value;

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const setSelectedValue = (newValue: string) => {
    // Only update internal state if not controlled
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const groupId = useDomId();

  return (
    <ButtonGroupContext.Provider
      value={{
        selectedValue,
        setSelectedValue,
        name,
        size,
        onChange,
        groupId,
        appearance,
        ...props,
      }}
    >
      <div
        className={cn(
          'gi-flex gi-flex-wrap gi-gap-3 [&_button]:gi-min-w-12 [&_button]:gi-justify-center',
          className,
        )}
        role={customRole || 'radiogroup'}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
};
