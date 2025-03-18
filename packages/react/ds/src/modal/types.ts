import { ReactElement } from 'react';
import { ButtonProps, ButtonSize, ButtonVariant } from '../button/types.js';
import { IconButtonProps } from '../icon-button/icon-button.js';
import { ModalBody, ModalFooter, ModalTitle } from './modal.js';

export type ModalPositions = 'center' | 'left' | 'right' | 'bottom';
export type ModalFooterOrientation = 'vertical' | 'horizontal';

export type ModalChildren =
  | Array<
      ReactElement<typeof ModalTitle | typeof ModalBody | typeof ModalFooter>
    >
  | ReactElement<typeof ModalTitle | typeof ModalBody | typeof ModalFooter>;

export type ModalWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  position?: ModalPositions;
  closeButtonLabel?: string;
  className?: string;
  closeOnClick?: boolean;
  closeOnOverlayClick?: boolean;
  children: ModalChildren;
  closeButtonSize?: ButtonSize;
  dataTestId?: string;
};

export type ModalProps = {
  className?: string;
  closeButtonLabel?: string;
  triggerButton: React.ReactElement;
  children: ModalChildren;
  startsOpen?: boolean;
  closeOnClick?: boolean;
  closeOnOverlayClick?: boolean;
  dataTestId?: string;
};

export type ModalCloseButtonProps = {
  label?: string;
} & Omit<IconButtonProps, 'className' | 'icon' | 'variant' | 'appearance'>;

export type ModalFooterButton = {
  label: string;
  variant: ButtonVariant;
} & ButtonProps;

export type ModalFooterProps = {
  className?: string;
  orientation?: ModalFooterOrientation;
  children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[];
};
