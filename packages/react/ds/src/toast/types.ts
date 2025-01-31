import { LinkProps } from '../link/link.js';

export type ToastHorizontalPosition = 'left' | 'center' | 'right';
export type ToastVerticalPosition = 'top' | 'center' | 'bottom';
export type ToastVariant = 'success' | 'info' | 'warning' | 'danger';
export type ToastAnimation = 'fadeinup' | 'fadeinleft' | 'fadeinright';

export type ToastPosition = {
  x: ToastHorizontalPosition;
  y: ToastVerticalPosition;
};

export type ToastProps = {
  title: string;
  variant?: ToastVariant;
  animation?: ToastAnimation;
  description?: string;
  action?: React.ReactElement<LinkProps>;
  dismissible?: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  duration?: number;
  position?: ToastPosition;
};
