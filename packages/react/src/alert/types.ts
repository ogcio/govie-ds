import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'tailwind-variants';
import type { alertVariants } from './variants.js';

export type AlertProps = ComponentPropsWithoutRef<'div'> & {
  variant?: VariantProps<typeof alertVariants>['variant'];
  title?: string;
  dismissible?: boolean;
  className?: string;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showIcon?: boolean;
};
