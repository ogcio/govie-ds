import {
  ChangeEvent,
  DetailedHTMLProps,
  HTMLAttributes,
  OptgroupHTMLAttributes,
  OptionHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';
import { InputTextProps } from '../input-text/type.js';

/**
 * @deprecated Use `SelectNextProps` instead of `SelectProps`.
 */
export type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
/**
 * @deprecated Use `SelectItemNextProps` instead of `SelectItemProps`.
 */
export type SelectItemProps = DetailedHTMLProps<
  OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>;

export type SelectGroupItemProps = DetailedHTMLProps<
  OptgroupHTMLAttributes<HTMLOptGroupElement>,
  HTMLOptGroupElement
>;

export type SelectMenuProps = {
  children: ReactNode;
  className?: string;
  onChange?: (value: string) => void;
  enableSearch?: boolean;
  isLoading?: boolean;
  showNoData?: boolean;
};

export type SelectMenuOptionReactElement = ReactElement<{
  value: string;
  onChange?: (value: string) => void;
  children?: ReactNode;
  enableSearch?: boolean;
}>;

export type SelectMenuGroupReactElement =
  ReactElement<SelectMenuGroupOptionProps>;

export type SelectMenuOptionProps = {
  children: ReactNode;
  value: string;
  selected?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  dataTestid?: string;
  className?: string;
  hidden?: boolean;
  enableSearch?: boolean;
  isHighlighted?: boolean;
  index: number;
};
export type SelectMenuGroupOptionProps = {
  children: ReactNode;
  className?: string;
  label: string;
};

export type SelectNextOptionItemElement = ReactElement<
  SelectMenuOptionProps & {
    selectedValue: string;
  }
>;
export type SelectNextGroupItemElement =
  ReactElement<SelectMenuGroupOptionProps>;
export type SelectNextProps = PropsWithChildren<
  {
    name?: string;
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
    onMenuClose?: () => void;
    defaultValue?: string;
    value?: string;
    enableSearch?: boolean;
    disabled?: boolean;
    placeholder?: string;
  } & Omit<HTMLAttributes<HTMLDivElement>, `onChange`>
>;

export type SelectNextOptionProps = PropsWithChildren<{
  className?: string;
  value: string;
  hidden?: boolean;
  disabled?: boolean;
}>;

export type SelectNextGroupProps = PropsWithChildren<{
  className?: string;
  label?: string;
  children: ReactNode;
}>;

export type SelectTableCellProps = Omit<SelectProps, 'children'> & {
  options: { label: string; value: string }[];
  error?: boolean;
};

export type SelectNextTableCellProps = SelectNextProps & {
  options: { label: string; value: string }[];
  error?: boolean;
} & Pick<InputTextProps, 'iconEnd' | 'iconStart'>;
