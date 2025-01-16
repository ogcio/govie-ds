'use client';

import { ReactNode } from 'react';
import { cn } from '../cn.js';
import { ModalWrapper, ModalBody, ModalFooter } from '../modal/modal.js';
import { ModalWrapperProps } from '../modal/types.js';

type DrawerProps = ModalWrapperProps;

type DrawerSectionProps = {
  children: ReactNode;
  className?: string;
};

export const Drawer = ({
  children,
  position = 'right',
  className,
  ...props
}: DrawerProps) => {
  return (
    <ModalWrapper
      className={cn('gi-drawer', className)}
      position={position}
      {...props}
    >
      {children}
    </ModalWrapper>
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
