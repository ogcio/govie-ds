import { cn } from '../cn.js';
import { ComboboxProps } from './types.js';

export const Combobox = ({
  children,
  className,
  dataTestid,
}: ComboboxProps) => {
  return (
    <div
      className={cn('gi-max-w-[400px]', className)}
      data-testid={dataTestid}
    >
      {children}
    </div>
  );
};
