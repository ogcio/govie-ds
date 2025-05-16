import { cn } from '../cn.js';

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type SelectItemProps = React.DetailedHTMLProps<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>;

type SelectGroupItemProps = React.DetailedHTMLProps<
  React.OptgroupHTMLAttributes<HTMLOptGroupElement>,
  HTMLOptGroupElement
>;

export const SelectGroupItem = ({
  children,
  ...props
}: SelectGroupItemProps) => (
  <optgroup {...props} role="group">
    {children}
  </optgroup>
);

export const SelectItem = ({
  children,
  className,
  ...props
}: SelectItemProps) => (
  <option
    className={cn('gi-select-option', className)}
    aria-selected={props.selected ? 'true' : 'false'}
    {...props}
  >
    {children}
  </option>
);

export const Select = ({ children, className, ...props }: SelectProps) => {
  return (
    <select className={cn('gi-select', className)} {...props}>
      {children}
    </select>
  );
};
