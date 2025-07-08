import { FC } from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import type {
  SelectGroupItemProps,
  SelectItemProps,
  SelectNativeTableCellProps,
  SelectProps,
} from './types.js';

export const SelectGroupItem = ({
  children,
  ...props
}: SelectGroupItemProps) => (
  <optgroup {...props} role="group">
    {children}
  </optgroup>
);

export const SelectItem = ({ children, ...props }: SelectItemProps) => (
  <option
    className={cn('gi-select-option', props.className)}
    aria-selected={props.selected ? 'true' : 'false'}
    {...props}
  >
    {children}
  </option>
);

export const SelectNative: FC<SelectProps> = ({
  children,
  className,
  ...props
}: SelectProps) => {
  return (
    <div className="gi-select-container">
      <select className={cn('gi-select', className)} {...props}>
        {children}
      </select>
      <Icon
        className="gi-select-icon"
        icon="keyboard_arrow_down"
        data-disabled={props?.disabled?.toString()}
      />
    </div>
  );
};

export const SelectNativeTableCell = ({
  options,
  defaultValue,
  onChange,
  error,
  ...props
}: SelectNativeTableCellProps) => {
  return (
    <SelectNative
      {...props}
      defaultValue={defaultValue}
      onChange={onChange}
      data-table-cell="true"
      data-table-cell-error-state={error?.toString()}
    >
      {options.map(({ value, label }) => (
        <SelectItem key={`${value}-${label}`} value={value}>
          {label}
        </SelectItem>
      ))}
    </SelectNative>
  );
};
