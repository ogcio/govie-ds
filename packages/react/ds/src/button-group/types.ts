import { PropsWithChildren } from 'react';
import { CoreButtonProps } from '../atoms/CoreButton';

export type ButtonGroupProps = PropsWithChildren<{
  name: string;
  size?: CoreButtonProps['size'];
  appearance?: CoreButtonProps['appearance'];
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
  size: CoreButtonProps['size'];
  appearance?: CoreButtonProps['appearance'];
  onChange?: (value: string) => void;
  groupId: string;
};
