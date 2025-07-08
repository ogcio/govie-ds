import { ErrorTextProps } from '../error-text/types';
import { HintTextProps } from '../hint-text/types';
import { LabelProps } from '../label/types';

export type SelectProps = {
  id: string;
  name: string;
  label?: LabelProps;
  hint?: HintTextProps;
  error?: ErrorTextProps;
  items: (SelectItemProps | SelectGroupItemProps)[];
  dataTestid?: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  enableSearch?: boolean;
};

export type SelectItemProps = {
  value: string;
  label: string;
  disabled?: boolean;
  hidden?: boolean;
  selected?: boolean;
};

export type SelectGroupItemProps = {
  items: SelectItemProps[];
  label: string;
};
