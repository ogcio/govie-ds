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
  <optgroup {...props} role="group" aria-labelledby={props.label || ''}>
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

export const Select = ({ children, ...props }: SelectProps) => {
  const ariaLabel = props['aria-label'] || props['aria-labelledby'] || '';
  return (
    <select
      className={cn('gi-select', props.className)}
      {...props}
      aria-label={ariaLabel}
    >
      {children}
    </select>
  );
};
