import { FC } from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import type {
  SelectGroupItemProps,
  SelectItemProps,
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
      <Icon className="gi-select-icon" icon="keyboard_arrow_down" />
    </div>
  );
};
