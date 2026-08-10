'use client';

import type { Fragment, ReactElement } from 'react';
import { cloneElement, useState } from 'react';
import type { ButtonProps } from '@/button/types';
import { cn } from '@/cn';
import { ModalWrapper, ModalBody, ModalFooter } from '@/modal/modal';
import type { ModalProps, ModalWrapperProps } from '@/modal/types';

type DrawerChildren = Array<ReactElement<typeof DrawerBody | typeof DrawerBody>> | ReactElement<typeof Fragment>;

export type DrawerPosition = 'left' | 'right' | 'bottom';

type DrawerControlledProps = DrawerBaseProps & {
  open: boolean;
  onClose?: () => void;
  /** @deprecated Not used in controlled mode. Render your own trigger and set `open` instead. */
  triggerButton?: never;
  /** @deprecated Not used in controlled mode. Pass `open` to control visibility instead. */
  startsOpen?: never;
};

type DrawerUncontrolledProps = DrawerBaseProps & {
  open?: never;
  onClose?: never;
  /**
   * @deprecated Use `open` and `onClose` with your own trigger element instead.
   * Example: `<Button onClick={() => setOpen(true)} />` with `<Drawer open={open} onClose={() => setOpen(false)} />`.
   */
  triggerButton: ModalProps['triggerButton'];
  /**
   * @deprecated Use the controlled `open` prop instead.
   * Example: `const [open, setOpen] = useState(true)` with `<Drawer open={open} onClose={() => setOpen(false)} />`.
   */
  startsOpen?: ModalProps['startsOpen'];
};

type DrawerBaseProps = Omit<
  ModalProps,
  'closeOnClick' | 'closeOnOverlayClick' | 'size' | 'triggerButton' | 'startsOpen'
> & {
  position?: DrawerPosition;
  children: DrawerChildren;
};

export type DrawerProps = DrawerControlledProps | DrawerUncontrolledProps;

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

export const DrawerWrapper = ({ children, className, ...props }: DrawerWrapperProps) => {
  return (
    <ModalWrapper className={cn('gi-flex gi-flex-col', className)} closeButtonSize="large" {...props}>
      {children}
    </ModalWrapper>
  );
};

export const Drawer = ({
  children,
  triggerButton,
  startsOpen = false,
  open,
  onClose,
  closeButtonLabel,
  position = 'right',
  className,
}: DrawerProps) => {
  // if triggerButton present, default to uncontrolled behaviour
  const isUncontrolled = !!triggerButton;
  const [internalOpen, setInternalOpen] = useState(startsOpen);
  // only render the clone if triggerButton defined
  const renderCloneTrigger =
    isUncontrolled &&
    cloneElement(triggerButton as ReactElement<any>, {
      onClick: (event: React.MouseEvent) => {
        const existingOnClick =
          typeof (triggerButton as ReactElement<any>)?.props?.onClick === 'function'
            ? (triggerButton as ReactElement<any>)?.props?.onClick
            : undefined;

        if (existingOnClick) {
          existingOnClick(event);
        }
        setInternalOpen(true);
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
        isOpen={isUncontrolled ? internalOpen : open}
        onClose={onClose ?? (() => setInternalOpen(false))}
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

export const DrawerFooter = ({ children, className, stacked }: DrawerSectionProps) => (
  <ModalFooter stacked={stacked} className={cn('gi-drawer-footer', className)}>
    {children}
  </ModalFooter>
);

Object.defineProperty(DrawerFooter, 'componentType', {
  value: 'DrawerFooter',
  writable: false,
  enumerable: false,
});
