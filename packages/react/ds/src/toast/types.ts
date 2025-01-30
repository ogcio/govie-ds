import { LinkProps } from '../link/link.js';

export type ToastHorizontalPosition = 'left' | 'center' | 'right';
export type ToastVerticalPosition = 'top' | 'center' | 'bottom';
export type ToastVariant = 'success' | 'info' | 'warning' | 'danger';

export interface ToastPosition {
  x: ToastHorizontalPosition;
  y: ToastVerticalPosition;
}

export interface ToastProps {
  title: string;
  variant?: ToastVariant;
  description?: string;
  action?: React.ReactElement<LinkProps>;
  dismissible?: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  duration?: number;
  position?: ToastPosition;
}
