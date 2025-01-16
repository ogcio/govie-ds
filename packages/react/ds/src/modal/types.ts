import { Fragment, ReactElement } from 'react';
import { IconButtonType } from '../icon-button/icon-button.js';
import { ModalBody, ModalFooter, ModalTitle } from './modal.js';

export type ModalChildren =
  | Array<
      ReactElement<typeof ModalTitle | typeof ModalBody | typeof ModalFooter>
    >
  | ReactElement<typeof Fragment>;

export type ModalWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  position?: 'center' | 'left' | 'right' | 'bottom';
  closeButtonLabel?: string;
  className?: string;
  children: ModalChildren;
};

export type ModalProps = {
  className?: string;
  closeButtonLabel?: string;
  triggerButton: React.ReactElement;
  children: ModalChildren;
  startsOpen?: boolean;
};

export type ModalCloseButtonProps = {
  label?: string;
} & Omit<
  IconButtonType,
  'size' | 'className' | 'icon' | 'variant' | 'appearance'
>;
