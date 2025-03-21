import { ErrorTextProps } from '../error-text/error-text.schema';
import { HintTextProps } from '../hint-text/hint-text.schema';
import { LabelProps } from '../label/label.schema';

export type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
  items: (SelectItemProps | SelectGroupItemProps)[];
  dataTestid?: string;
};

export type SelectItemProps = React.DetailedHTMLProps<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>;

export type SelectGroupItemProps = React.DetailedHTMLProps<
  React.OptgroupHTMLAttributes<HTMLOptGroupElement>,
  HTMLOptGroupElement
> & {
  items: SelectItemProps[];
};
