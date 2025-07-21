'use client';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from 'react';
import { Button } from '../button/button.js';
import { ButtonAppearance, ButtonSize } from '../button/types.js';
import { useDomId } from '../hooks/use-dom-id.js';

type ButtonGroupContextType = {
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
  name: string;
  size: ButtonSize;
  appearance?: ButtonAppearance;
  onChange?: (value: string) => void;
  groupId: string;
};

const ButtonGroupContext = createContext<ButtonGroupContextType | undefined>(
  undefined,
);

type ButtonGroupItemProps = PropsWithChildren<{
  value: string;
  role?: string;
  'aria-checked'?: boolean;
  'aria-label'?: string;
}>;

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
      size={size}
      appearance={appearance}
      onClick={handleClick}
      id={itemId}
      role={customRole || 'radio'}
      aria-checked={ariaChecked === undefined ? isSelected : ariaChecked}
      aria-label={ariaLabel}
      type="button"
    >
      {children}
    </Button>
  );
};

type ButtonGroupProps = PropsWithChildren<{
  name: string;
  size?: ButtonSize;
  appearance?: ButtonAppearance;
  onChange?: (value: string) => void;
  defaultValue?: string;
  value?: string;
  role?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}>;

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
}) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue,
  );

  const selectedValue = value !== undefined ? value : internalValue;

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
      }}
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
