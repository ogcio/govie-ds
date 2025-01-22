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
import { Heading, HeadingProps } from '../heading/heading.js';
import { Icon } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';
import type {
  ModalCloseButtonProps,
  ModalProps,
  ModalWrapperProps,
} from './types.js';

const ModalCloseButton = ({ label, ...props }: ModalCloseButtonProps) =>
  label ? (
    <Button
      onClick={props.onClick}
      variant="flat"
      size="small"
      appearance="dark"
      className="gi-modal-icon"
      {...props}
    >
      <>
        {label}
        <Icon icon="close" size="sm" />
      </>
    </Button>
  ) : (
    <IconButton
      className="gi-modal-icon"
      icon={{
        icon: 'close',
      }}
      onClick={props.onClick}
      variant="flat"
      size="small"
      appearance="dark"
      {...props}
    />
  );

const isModalTitle = (child: any): boolean => {
  if (!isValidElement(child)) {
    return false;
  }
  const childType = child.type as any;
  // @ts-expect-error The TS error says there is no _owner but there is
  return childType === ModalTitle || child?._owner?.name === 'ModalTitle';
};

export const ModalWrapper = ({
  isOpen,
  onClose,
  position = 'center',
  closeButtonLabel,
  className,
  children,
}: ModalWrapperProps) => {
  const childrenArray = Children.toArray(children);

  const modalTitle = childrenArray.find((child) => isModalTitle(child));
  const otherChildren = childrenArray.filter((child) => !isModalTitle(child));

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
        className={cn(
          'gi-modal-container',
          {
            'gi-modal-container-center': position === 'center',
            'gi-modal-container-left': position === 'left',
            'gi-modal-container-right': position === 'right',
            'gi-modal-container-bottom': position === 'bottom',
          },
          className,
        )}
      >
        <div>
          {modalTitle}
          <ModalCloseButton onClick={onClose} label={closeButtonLabel} />
        </div>
        <div>{otherChildren}</div>
      </div>
    </div>
  );
};

export const ModalTitle = ({ children, as = 'h4', ...props }: HeadingProps) => (
  <div className="gi-flex-1">
    <Heading as={as} {...props}>
      {children}
    </Heading>
  </div>
);

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={cn('gi-modal-body', className)}>{children}</div>;

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={cn('gi-modal-footer', className)}>{children}</div>;

export const Modal = ({
  children,
  triggerButton,
  className,
  startsOpen,
  closeButtonLabel,
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
        position="center"
        className={className}
        closeButtonLabel={closeButtonLabel}
      >
        {children}
      </ModalWrapper>
    </>
  );
};
