import { ComponentPropsWithoutRef } from 'react';
import { VariantProps } from 'tailwind-variants';
import { alertVariants } from './variants.js';

export type AlertProps = ComponentPropsWithoutRef<'div'> & {
  variant?: VariantProps<typeof alertVariants>['variant'];
  title?: string;
  dismissible?: boolean;
  className?: string;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showIcon?: boolean;
};
