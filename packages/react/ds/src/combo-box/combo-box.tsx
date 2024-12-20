import { cn } from '../cn.js';
import { ComboboxProps } from './types.js';

export const Combobox = ({ children, className }: ComboboxProps) => {
  return (
    <div className={cn('gi-combobox-container', className)}>{children}</div>
  );
};
