'use client';
import {
  cloneElement,
  ReactNode,
  Children,
  isValidElement,
  ReactElement,
  useState,
} from 'react';
import { IconButton, IconButtonType } from '../icon-button/icon-button.js';
import { cn } from '../cn.js';
import { Heading } from '../heading/heading.js';

export type ModalChildren =
  | ReactElement<typeof ModalClose>
  | ReactElement<typeof ModalTitle>
  | ReactElement<typeof ModalBody>
  | ReactElement<typeof ModalFooter>
  | Array<
      ReactElement<
        | typeof ModalClose
        | typeof ModalTitle
        | typeof ModalBody
        | typeof ModalFooter
      >
    >;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  position?: 'center' | 'left' | 'right';
  className?: string;
  children: ModalChildren;
};

export type ModalWrapperProps = {
  position?: 'center' | 'left' | 'right';
  className?: string;
  ModalTriggerComponent: any;
  children: ModalChildren;
  startsOpen?: boolean;
};

export type ModalCloseProps = Omit<
  IconButtonType,
  'size' | 'className' | 'icon' | 'variant' | 'appearance'
>;

export const ModalClose = (props: ModalCloseProps) => (
  <IconButton
    size="large"
    className="gi-modal-icon"
    onClick={props.onClick}
    icon={{ icon: 'close' }}
    variant="flat"
    appearance="dark"
    {...props}
  />
);

export const Modal = ({
  isOpen,
  onClose,
  position = 'center',
  className,
  children,
}: ModalProps) => {
  const renderChildren = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === ModalClose) {
      return cloneElement(child as ReactElement<ModalCloseProps | any>, {
        onClick: onClose,
      });
    }
    return child;
  });

  return (
    <div
      className={cn('gi-modal', {
        'gi-modal-react': isOpen,
        'gi-modal-open': isOpen,
        'gi-modal-close': !isOpen,
      })}
      data-testid="modal"
      data-element="modal"
      onClick={(e) => {
        const target = e.target as HTMLDivElement;
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
        {renderChildren}
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

export const ModalWrapper = ({
  children,
  position = 'center',
  ModalTriggerComponent,
  className,
  startsOpen,
}: ModalWrapperProps) => {
  const [isOpen, setIsOpen] = useState(!!startsOpen);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const renderCloneTrigger = cloneElement(
    ModalTriggerComponent as ReactElement<any>,
    {
      'data-testid': 'modal-trigger-button-container',
      onClick: handleOpen,
    },
  );

  return (
    <>
      {renderCloneTrigger}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        position={position}
        className={className}
      >
        {children}
      </Modal>
    </>
  );
};
