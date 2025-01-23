'use client';

import {
  cloneElement,
  Fragment,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import { cn } from '../cn.js';
import { ModalWrapper, ModalBody, ModalFooter } from '../modal/modal.js';
import { ModalProps, ModalWrapperProps } from '../modal/types.js';

type DrawerChildren =
  | Array<ReactElement<typeof DrawerBody | typeof DrawerBody>>
  | ReactElement<typeof Fragment>;

export type DrawerPosition = 'left' | 'right' | 'bottom';

export type DrawerProps = ModalProps & {
  position?: DrawerPosition;
  children: DrawerChildren;
};

type DrawerSectionProps = {
  children: ReactNode;
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
    <ModalWrapper className={cn('gi-drawer', className)} {...props}>
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

export const DrawerBody = ({ children, className }: DrawerSectionProps) => (
  <ModalBody className={cn('gi-drawer-body', className)}>{children}</ModalBody>
);

export const DrawerFooter = ({ children, className }: DrawerSectionProps) => (
  <ModalFooter className={cn('gi-drawer-footer', className)}>
    {children}
  </ModalFooter>
);
