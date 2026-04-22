import type { PropsWithChildren } from 'react';
import type { Props as ButtonProps } from '../atoms/Button';
import type { ButtonSize } from '../button/types.js';

export type ButtonGroupProps = PropsWithChildren<{
  name: string;
  size?: ButtonSize;
  appearance?: ButtonProps['appearance'];
  onChange?: (value: string) => void;
  defaultValue?: string;
  value?: string;
  role?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  className?: string;
}>;

export type ButtonGroupItemProps = PropsWithChildren<{
  value: string;
  role?: string;
  'aria-checked'?: boolean;
  'aria-label'?: string;
}>;

export type ButtonGroupContextType = {
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
  name: string;
  size: ButtonSize;
  appearance?: ButtonProps['appearance'];
  onChange?: (value: string) => void;
  groupId: string;
};
