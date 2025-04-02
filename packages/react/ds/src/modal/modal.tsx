'use client';
import React, {
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
import { Icon, IconSize } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';
import type {
  ModalCloseButtonProps,
  ModalFooterButton,
  ModalFooterProps,
  ModalProps,
  ModalWrapperProps,
} from './types.js';

const isModalComponent = (
  modalComponent: React.ElementType,
  modalTitle: string,
  child: React.ReactNode,
): boolean => {
  if (!isValidElement(child)) {
    return false;
  }
  const childType = child.type;
  // @ts-expect-error The TS error says there is no _owner but there is
  return childType === modalComponent || child?._owner?.name === modalTitle;
};

const VARIANT_ORDER: Record<ModalFooterButton['variant'], number> = {
  flat: 0,
  secondary: 1,
  primary: 2,
};

const ModalCloseButton = ({
  label,
  size = 'small',
  ...props
}: ModalCloseButtonProps) => {
  let iconSize: IconSize = 'sm';

  if (size === 'large' || size === 'medium') {
    iconSize = 'md';
  }

  return label ? (
    <Button
      onClick={props.onClick}
      variant="flat"
      size={size}
      appearance="dark"
      className="gi-modal-icon"
      aria-label={label}
      {...props}
    >
      <>
        {label}
        <Icon icon="close" size={iconSize} />
      </>
    </Button>
  ) : (
    <IconButton
      className="gi-modal-icon"
      icon={{
        icon: 'close',
      }}
      aria-label="Close modal"
      onClick={props.onClick}
      variant="flat"
      size={size}
      appearance="dark"
      {...props}
    />
  );
};

export const ModalWrapper = ({
  position = 'center',
  size = 'lg',
  closeOnClick = true,
  closeOnOverlayClick = true,
  isOpen,
  onClose,
  closeButtonLabel,
  className,
  children,
  closeButtonSize,
  dataTestId,
  ...props
}: ModalWrapperProps) => {
  const childrenArray = Children.toArray(children);

  const modalTitle = childrenArray.find((child) =>
    isModalComponent(ModalTitle, 'ModalTitle', child),
  );
  const modalFooter = childrenArray.find((child) =>
    isModalComponent(ModalFooter, 'ModalFooter', child),
  );

  const modalTitleClone = modalTitle
    ? React.cloneElement(modalTitle as ReactElement<HeadingProps>, {
        as: size === 'sm' ? 'h5' : 'h4',
      })
    : null;

  const otherChildren = childrenArray
    .map((child) =>
      modalFooter
        ? React.cloneElement(child as ReactElement<ModalFooterProps>, {
            dataModalSize: size,
          })
        : child,
    )
    .filter((child) => !isModalComponent(ModalTitle, 'ModalTitle', child));

  return (
    <div
      {...props}
      className={cn('gi-modal', {
        'gi-modal-open': isOpen,
        'gi-modal-close': !isOpen,
      })}
      data-testid={dataTestId || 'modal'}
      data-element="modal"
      role="dialog"
      aria-modal="true"
      aria-describedby="gi-modal-body"
      onClick={(event) => {
        const target = event.target as HTMLDivElement;
        if (
          target.dataset.element === 'modal' &&
          closeOnClick &&
          closeOnOverlayClick
        ) {
          onClose();
        }
      }}
    >
      <div
        data-testid="modal-container"
        data-size={size}
        data-position={position}
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
          {modalTitleClone}
          {closeOnClick && (
            <ModalCloseButton
              onClick={onClose}
              label={closeButtonLabel}
              size={closeButtonSize}
            />
          )}
        </div>
        <div
          className={cn({
            'gi-pb-6': !modalFooter,
          })}
        >
          {otherChildren}
        </div>
      </div>
    </div>
  );
};

export const ModalTitle = ({ children, as = 'h4', ...props }: HeadingProps) => (
  <div className="gi-flex-1" id="gi-modal-title">
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
}) => (
  <div id="gi-modal-body" className={cn('gi-modal-body', className)}>
    {children}
  </div>
);

export const ModalFooter = ({
  className,
  children,
  orientation,
  dataModalSize,
}: ModalFooterProps) => {
  const actionButtons = Array.isArray(children) ? children : [children];
  const filteredButtons = actionButtons.filter(
    (actionButton) =>
      React.isValidElement(actionButton) && actionButton.type === Button,
  );
  const sortedButtons = filteredButtons.sort((a, b) => {
    const variantA = a.props.variant ?? 'primary';
    const variantB = b.props.variant ?? 'primary';
    return (VARIANT_ORDER[variantA] || 0) - (VARIANT_ORDER[variantB] || 0);
  });

  const buttonClassName = cn({
    'gi-justify-center sm:gi-justify-start':
      !orientation && dataModalSize !== 'sm',
    'gi-justify-center': orientation === 'vertical' || dataModalSize === 'sm',
    'gi-justify-start': orientation === 'horizontal',
  });

  return (
    <div
      className={cn(className, {
        'gi-pt-6': sortedButtons.length === 0,
        'gi-modal-footer': sortedButtons.length,
      })}
    >
      {sortedButtons.length > 0 && (
        <div
          data-orientation={orientation || 'unset'}
          data-modal-size={dataModalSize}
        >
          {sortedButtons.map((button) =>
            React.cloneElement(button, {
              className: cn(button?.props?.className, buttonClassName),
            }),
          ) || null}
        </div>
      )}
    </div>
  );
};

export const Modal = ({
  children,
  triggerButton,
  startsOpen,
  ...props
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(!!startsOpen);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const renderCloneTrigger = cloneElement(triggerButton as ReactElement<any>, {
    'data-testid': 'modal-trigger-button-container',
    'aria-haspopup': 'dialog',
    onClick: handleOpen,
  });

  return (
    <>
      {renderCloneTrigger}
      <ModalWrapper
        onClose={handleClose}
        position="center"
        isOpen={isOpen}
        {...props}
      >
        {children}
      </ModalWrapper>
    </>
  );
};
