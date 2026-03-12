import { ComponentPropsWithoutRef } from 'react';
import { VariantProps } from 'tailwind-variants';
import { type IconProps } from '../icon/icon.js';
import { alertVariants } from './variants.js';
export type AlertProps = ComponentPropsWithoutRef<'div'> & {
  variant?: VariantProps<typeof alertVariants>['variant'];
  title?: string;
  dismissible?: boolean;
  className?: string;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showIcon?: boolean;
  iconProps?: Omit<IconProps, 'icon'>;
};
