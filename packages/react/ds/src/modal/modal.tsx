'use client';
import {
  cloneElement,
  ReactNode,
  Children,
  isValidElement,
  ReactElement,
  useState,
} from 'react';
import { Button } from '../button/button.js';
import { cn } from '../cn.js';
import { Heading } from '../heading/heading.js';
import { Icon } from '../icon/icon.js';
import type {
  ModalCloseButtonProps,
  ModalProps,
  ModalWrapperProps,
} from './types.js';

export const ModalCloseButton = ({
  label,
  ...props
}: ModalCloseButtonProps) => (
  <Button
    onClick={props.onClick}
    variant="flat"
    size="large"
    appearance="dark"
    className="gi-modal-icon"
    {...props}
  >
    <>
      {label}
      <Icon icon="close" />
    </>
  </Button>
);
ModalCloseButton.id = Symbol('ModalCloseButton');

export const ModalWrapper = ({
  isOpen,
  onClose,
  position = 'center',
  className,
  children,
}: ModalWrapperProps) => {
  let closeButton = null;

  const sortedChildren = Children.toArray(children).sort((a, b) => {
    if (!isValidElement(a) || !isValidElement(b)) {
      return 0;
    }
    const typeOrder = [ModalTitle, ModalBody, ModalFooter];
    const indexA = typeOrder.indexOf(a.type as any);
    const indexB = typeOrder.indexOf(b.type as any);

    return indexA - indexB;
  });

  const renderChildren = Children.map(sortedChildren, (child) => {
    if (isValidElement(child) && child.type?.id === ModalCloseButton.id) {
      closeButton = cloneElement(
        child as ReactElement<ModalCloseButtonProps | any>,
        {
          onClick: onClose,
        },
      );
      return null;
    }
    return child;
  });

  return (
    <div
      className={cn('gi-modal', {
        'gi-modal-open': isOpen,
        'gi-modal-close': !isOpen,
      })}
      data-testid="modal"
      data-element="modal"
      onClick={(event) => {
        const target = event.target as HTMLDivElement;
        if (target.dataset.element === 'modal') {
          onClose();
        }
      }}
    >
      <div
        data-testid="modal-container"
        className={cn(className, {
          'gi-modal-container-center': position === 'center',
          'gi-modal-container-left': position === 'left',
          'gi-modal-container-right': position === 'right',
        })}
      >
        {closeButton}
        <div className="gi-flex gi-flex-col gi-h-full">{renderChildren}</div>
      </div>
    </div>
  );
};

export const ModalTitle = ({ children }: { children: string }) => (
  <Heading as="h2">{children}</Heading>
);

export const ModalBody = ({ children }: { children: ReactNode }) => (
  <div className="gi-modal-body">{children}</div>
);

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

export const Modal = ({
  children,
  triggerButton,
  className,
  startsOpen,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(!!startsOpen);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const renderCloneTrigger = cloneElement(triggerButton as ReactElement<any>, {
    'data-testid': 'modal-trigger-button-container',
    onClick: handleOpen,
  });

  return (
    <>
      {renderCloneTrigger}
      <ModalWrapper
        isOpen={isOpen}
        onClose={handleClose}
        position={'center'}
        className={className}
      >
        {children}
      </ModalWrapper>
    </>
  );
};
