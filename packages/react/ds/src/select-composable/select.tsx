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
}: SelectGroupItemProps) => <optgroup {...props}>{children}</optgroup>;

export const SelectItem = ({ children, ...props }: SelectItemProps) => (
  <option className={cn('gi-select-option', props.className)} {...props}>
    {children}
  </option>
);

export const Select = ({ children, ...props }: SelectProps) => (
  <select className={cn('gi-select', props.className)} {...props}>
    {children}
  </select>
);
