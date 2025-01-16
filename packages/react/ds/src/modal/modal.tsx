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
  ) : (
    <IconButton
      icon={{
        icon: 'close',
      }}
      onClick={props.onClick}
      variant="flat"
      size="large"
      appearance="dark"
      className="gi-modal-icon"
      {...props}
    />
  );

export const ModalWrapper = ({
  isOpen,
  onClose,
  position = 'center',
  closeButtonLabel,
  className,
  children,
}: ModalWrapperProps) => {
  const renderChildren = Children.toArray(children).sort((a, b) => {
    if (!isValidElement(a) || !isValidElement(b)) {
      return 0;
    }
    const typeOrder = [ModalTitle, ModalBody, ModalFooter];
    const indexA = typeOrder.indexOf(a.type as any);
    const indexB = typeOrder.indexOf(b.type as any);

    return indexA - indexB;
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
        <ModalCloseButton onClick={onClose} label={closeButtonLabel} />
        <div className="gi-flex gi-flex-col gi-h-full">{renderChildren}</div>
      </div>
    </div>
  );
};

export const ModalTitle = ({ children, as = 'h2', ...props }: HeadingProps) => (
  <Heading as={as} {...props}>
    {children}
  </Heading>
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
}) => <div className={cn('modal-footer', className)}>{children}</div>;

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
