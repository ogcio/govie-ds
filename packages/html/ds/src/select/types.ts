import { ErrorTextProps } from '../error-text/types';
import { HintTextProps } from '../hint-text/types';
import { LabelProps } from '../label/types';

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
