'use client';

import { cloneElement, Fragment, ReactElement, useState } from 'react';
import { ButtonProps } from '../button/types.js';
import { cn } from '../cn.js';
import { ModalWrapper, ModalBody, ModalFooter } from '../modal/modal.js';
import { ModalProps, ModalWrapperProps } from '../modal/types.js';

type DrawerChildren =
  | Array<ReactElement<typeof DrawerBody | typeof DrawerBody>>
  | ReactElement<typeof Fragment>;

export type DrawerPosition = 'left' | 'right' | 'bottom';

export type DrawerProps = Omit<
  ModalProps,
  'closeOnClick' | 'closeOnOverlayClick' | 'size'
> & {
  position?: DrawerPosition;
  children: DrawerChildren;
};

type DrawerSectionProps = {
  children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[];
  className?: string;
  stacked?: boolean;
};

type DrawerBodySectionProps = {
  children: React.ReactNode;
  className?: string;
};

export type DrawerWrapperProps = ModalWrapperProps & {
  children: DrawerChildren;
};

export const DrawerWrapper = ({
  children,
  className,
  ...props
}: DrawerWrapperProps) => {
  return (
    <ModalWrapper
      className={cn('gi-flex gi-flex-col', className)}
      closeButtonSize="large"
      {...props}
    >
      {children}
    </ModalWrapper>
  );
};

export const Drawer = ({
  children,
  triggerButton,
  startsOpen,
  closeButtonLabel,
  position = 'right',
  className,
}: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(!!startsOpen);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const renderCloneTrigger = cloneElement(triggerButton as ReactElement<any>, {
    'data-testid': 'drawer-trigger-button-container',
    onClick: (event: React.MouseEvent) => {
      const existingOnClick =
        typeof (triggerButton as ReactElement<any>)?.props?.onClick ===
        'function'
          ? (triggerButton as ReactElement<any>)?.props?.onClick
          : undefined;

      if (existingOnClick) {
        existingOnClick(event);
      }
      handleOpen();
    },
  });

  return (
    <>
      {renderCloneTrigger}
      <DrawerWrapper
        children={children}
        closeButtonLabel={closeButtonLabel}
        position={position}
        className={className}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
};

Object.defineProperty(Drawer, 'componentType', {
  value: 'Drawer',
  writable: false,
  enumerable: false,
});

export const DrawerBody = ({ children, className }: DrawerBodySectionProps) => (
  <ModalBody
    includeModalClass={false}
    className={cn('gi-px-6 gi-pt-1 gi-flex-1 gi-border-t-xs gi-border-gray-100 gi-overflow-y-auto', className)}
  >
    {children}
  </ModalBody>
);

Object.defineProperty(DrawerBody, 'componentType', {
  value: 'DrawerBody',
  writable: false,
  enumerable: false,
});

export const DrawerFooter = ({
  children,
  className,
  stacked,
}: DrawerSectionProps) => (
  <ModalFooter stacked={stacked} className={cn('gi-drawer-footer', className)}>
    {children}
  </ModalFooter>
);

Object.defineProperty(DrawerFooter, 'componentType', {
  value: 'DrawerFooter',
  writable: false,
  enumerable: false,
});
