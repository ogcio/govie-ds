import { cn } from '../cn.js';
import { ComboboxProps } from './types.js';

export const Combobox = ({
  children,
  className,
  dataTestid,
}: ComboboxProps) => {
  return (
    <div
      className={cn('gi-combobox-container', className)}
      data-testid={dataTestid}
    >
      {children}
    </div>
  );
};
