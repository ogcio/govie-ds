import { ReactElement } from 'react';
import { IconButtonType } from '../icon-button/icon-button.js';
import {
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalTitle,
} from './modal.js';

export type ModalChildren = Array<
  ReactElement<
    | typeof ModalCloseButton
    | typeof ModalTitle
    | typeof ModalBody
    | typeof ModalFooter
  >
>;

export type ModalWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  position?: 'center' | 'left' | 'right';
  className?: string;
  children: ModalChildren;
};

export type ModalProps = {
  className?: string;
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
