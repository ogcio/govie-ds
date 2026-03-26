import { ComponentPropsWithoutRef, ReactElement } from 'react';
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

type ModalWrapperOwnProps = {
  closeOnEscape?: boolean;
  isOpen: boolean;
  onClose: () => void;
  position?: ModalPositions;
  closeButtonSize?: ButtonSize;
};

export type ModalWrapperProps = ModalWrapperOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'role'> &
  Omit<ModalProps, 'triggerButton'>;

export type ModalSize = 'sm' | 'md' | 'lg';
export type ModalProps = React.AriaAttributes & {
  className?: string;
  closeButtonLabel?: string;
  triggerButton: React.ReactElement;
  children: ModalChildren;
  startsOpen?: boolean;
  closeOnClick?: boolean;
  closeOnOverlayClick?: boolean;
  dataTestId?: string;
  size?: ModalSize;
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
  dataTestId?: string;
  dataModalSize?: ModalSize;
  children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[];
  stacked?: boolean;
};

export type ModalHeaderProps = Pick<
  ModalWrapperProps,
  'closeButtonLabel' | 'closeOnClick' | 'onClose' | 'closeButtonSize' | 'size'
> & { modalTitle: React.ReactNode };
