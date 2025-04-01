import { ButtonProps, ButtonSize } from '../button/types.js';
import { HeadingProps } from '../heading/types.js';

export type DrawerPosition = 'left' | 'right' | 'bottom';

export type DrawerWrapperProps = {
  isOpen: boolean;
  onClose?: () => void;
  position?: DrawerPosition;
  closeButtonSize?: ButtonSize;
} & Omit<DrawerProps, 'triggerButton'>;

export type DrawerSize = 'sm' | 'md' | 'lg';
export type DrawerProps = {
  className?: string;
  closeButtonLabel?: string;
  triggerButton: ButtonProps;
  title?: HeadingProps;
  body: string;
  footer: string;
  startsOpen?: boolean;
  closeOnClick?: boolean;
  closeOnOverlayClick?: boolean;
  dataTestId?: string;
};
