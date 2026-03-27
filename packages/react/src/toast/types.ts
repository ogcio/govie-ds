import { ComponentPropsWithoutRef } from 'react';

export type ToastHorizontalPosition = 'left' | 'center' | 'right';
export type ToastVerticalPosition = 'top' | 'center' | 'bottom';
export type ToastVariant = 'success' | 'info' | 'warning' | 'danger';
export type ToastAnimation = 'fadeinup' | 'fadeinleft' | 'fadeinright';

export type ToastPosition = {
  x: ToastHorizontalPosition;
  y: ToastVerticalPosition;
};

export type ToastProps = ComponentPropsWithoutRef<'div'> & {
  title: string;
  variant?: ToastVariant;
  animation?: ToastAnimation;
  description?: string;
  action?: {
    href: string;
    label: string;
  };
  dismissible?: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  duration?: number;
  position?: ToastPosition;
  slotAction?: React.ReactNode;
  showIcon?: boolean;
};
