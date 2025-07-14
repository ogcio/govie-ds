import { FC } from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import type {
  SelectGroupItemProps,
  SelectItemProps,
  SelectTableCellProps,
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

export const SelectNative: FC<SelectProps & { containerProps?: any }> = ({
  children,
  className,
  containerProps,
  ...props
}) => {
  return (
    <div className="gi-select-container" {...containerProps}>
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

export const SelectTableCell = ({
  options,
  defaultValue,
  onChange,
  error,
  ...props
}: SelectTableCellProps) => {
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
