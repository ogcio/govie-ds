import type { FC } from 'react';
import clsx from 'clsx';
import type { SelectGroupItemProps, SelectItemProps, SelectTableCellProps, SelectProps } from './types.js';
import KeyboardArrowDownIcon from '@/atoms/icons/KeyboardArrowDown';

export const SelectGroupItem = ({ children, ...props }: SelectGroupItemProps) => (
  <optgroup {...props} role="group">
    {children}
  </optgroup>
);

export const SelectItem = ({ children, ...props }: SelectItemProps) => (
  <option
    className={clsx('gi-select-option', props.className)}
    aria-selected={props.selected ? 'true' : 'false'}
    {...props}
  >
    {children}
  </option>
);

export const SelectNative: FC<SelectProps & { containerProps?: any }> = ({
  children,
  className,
  containerProps,
  ...props
}) => {
  return (
    <div className="gi-select-container" {...containerProps}>
      <select className={clsx('gi-select', className)} {...props}>
        {children}
      </select>
      <KeyboardArrowDownIcon
        className={clsx('gi-select-icon', {
          'gi-text-color-icon-system-neutral-interactive-disabled': !!props.disabled,
        })}
      />
    </div>
  );
};

export const SelectTableCell = ({ options, defaultValue, onChange, error, ...props }: SelectTableCellProps) => {
  return (
    <SelectNative
      {...props}
      containerProps={{
        'data-table-cell': 'true',
        'data-table-cell-error-state': error?.toString(),
      }}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {options.map(({ value, label }) => (
        <SelectItem key={`${value}-${label}`} value={value}>
          {label}
        </SelectItem>
      ))}
    </SelectNative>
  );
};
