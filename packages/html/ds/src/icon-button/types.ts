import { ButtonProps } from '../button/types';
import { IconProps } from '../icon/icon.schema';

export type IconButtonProps = Omit<ButtonProps, 'children'> & {
  icon: Omit<IconProps, 'size'>;
  className?: string;
};
