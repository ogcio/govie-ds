import { ButtonProps, ButtonSize } from '../button/types.js';
import { HeadingProps } from '../heading/types.js';

export type ModalPositions = 'center' | 'left' | 'right' | 'bottom';

export type ModalWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  position?: ModalPositions;
  closeButtonSize?: ButtonSize;
} & Omit<ModalProps, 'triggerButton'>;

export type ModalSize = 'sm' | 'md' | 'lg';
export type ModalProps = React.AriaAttributes & {
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
  size?: ModalSize;
};
