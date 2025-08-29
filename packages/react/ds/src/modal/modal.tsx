'use client';
import {
  cloneElement,
  ReactNode,
  Children,
  isValidElement,
  ReactElement,
  useState,
  useRef,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../button/button.js';
import { cn } from '../cn.js';
import { Heading, HeadingProps } from '../heading/heading.js';
import { useAriaHider } from '../hooks/use-aria-hider.js';
import { useFocusTrap } from '../hooks/use-focus-trap.js';
import { Icon, IconSize } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';

import type {
  ModalCloseButtonProps,
  ModalFooterButton,
  ModalFooterProps,
  ModalProps,
  ModalWrapperProps,
  ModalHeaderProps,
} from './types.js';

const isModalComponent = (
  modalComponent: React.ElementType,
  componentName: string,
  child: ReactNode,
): boolean => {
  if (!isValidElement(child)) {
    return false;
  }
  const childType = child.type;
  return (
    childType === modalComponent ||
    // @ts-expect-error The TS error says there is no _owner but there is
    child?._owner?.name === componentName ||
    (childType as any).componentType === componentName
  );
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

const ModalHeader = ({
  closeButtonLabel,
  modalTitle,
  closeOnClick,
  onClose,
  closeButtonSize,
}: ModalHeaderProps) => (
  <div
    className={cn({
      'gi-py-4 xs:gi-py-6': !closeButtonLabel,
      'gi-py-2 xs:gi-py-4': !!closeButtonLabel,
    })}
  >
    {modalTitle}
    {closeOnClick && (
      <ModalCloseButton
        onClick={onClose}
        label={closeButtonLabel}
        size={closeButtonSize}
      />
    )}
  </div>
);

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
  closeOnEscape,
  dataTestId,
  ...props
}: ModalWrapperProps) => {
  const modalRef = useRef(null);
  useAriaHider(modalRef.current, isOpen);

  const childrenArray = Children.toArray(children);

  const modalTitle = childrenArray.find((child) =>
    isModalComponent(ModalTitle, 'ModalTitle', child),
  );

  const modalFooter = childrenArray.find((child) =>
    isModalComponent(ModalFooter, 'ModalFooter', child),
  );

  const modalTitleClone = modalTitle
    ? cloneElement(modalTitle as ReactElement<HeadingProps>, {
        as: size === 'sm' ? 'h5' : 'h4',
      })
    : null;

  const modalFooterClone = modalFooter
    ? cloneElement(modalFooter as ReactElement<ModalFooterProps>, {
        dataModalSize: size,
      })
    : null;

  // Get all children that are NOT title or footer
  const contentChildren = childrenArray.filter(
    (child) =>
      !isModalComponent(ModalTitle, 'ModalTitle', child) &&
      !isModalComponent(ModalFooter, 'ModalFooter', child),
  );

  useEffect(() => {
    if (!isOpen || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEscape, onClose]);

  return (
    <ModalPortal modalRef={modalRef} isOpen={isOpen}>
      <div
        {...props}
        ref={modalRef}
        className={cn('gi-modal', {
          'gi-modal-open': isOpen,
          'gi-modal-close': !isOpen,
        })}
        data-testid={dataTestId || 'modal'}
        onClick={(event) => {
          const isOverlayClick = event.currentTarget === event.target;
          if (isOverlayClick && closeOnClick && closeOnOverlayClick) {
            onClose();
          }
        }}
        tabIndex={-1}
      >
        <div
          data-testid="modal-container"
          role="dialog"
          aria-modal="true"
          aria-label="dialog"
          data-size={size}
          data-position={position}
          className={cn(
            'gi-modal-container-control',
            {
              'gi-modal-container': !className,
              'gi-modal-container-center': position === 'center',
              'gi-modal-container-left': position === 'left',
              'gi-modal-container-right': position === 'right',
              'gi-modal-container-bottom': position === 'bottom',
            },
            className,
          )}
        >
          <ModalHeader
            closeButtonLabel={closeButtonLabel}
            modalTitle={modalTitleClone}
            closeOnClick={closeOnClick}
            onClose={onClose}
            closeButtonSize={closeButtonSize}
          />
          <div className={cn({ 'gi-pb-6': !modalFooter })}>
            {contentChildren}
            {modalFooterClone}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export const ModalTitle = ({ children, as = 'h4', ...props }: HeadingProps) => (
  <div className="gi-flex-1" id={props.id} aria-label={children?.toString()}>
    <Heading as={as} {...props}>
      {children}
    </Heading>
  </div>
);

Object.defineProperty(ModalTitle, 'componentType', {
  value: 'ModalTitle',
  writable: false,
  enumerable: false,
});
ModalTitle.displayName = 'ModalTitle';

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    id="gi-modal-body"
    aria-label="Modal content"
    role="document"
    className={cn(
      {
        'gi-modal-body': !className,
      },
      className,
    )}
  >
    {children}
  </div>
);

export const ModalFooter = ({
  className,
  children,
  orientation,
  dataModalSize,
  stacked,
}: ModalFooterProps) => {
  const actionButtons = Array.isArray(children) ? children : [children];
  const filteredButtons = actionButtons.filter((actionButton) => {
    return (
      isValidElement(actionButton) &&
      (actionButton.type === Button ||
        (actionButton.type as any)?.displayName === 'Button' ||
        (actionButton.props as any)?.['data-button'])
    );
  });
  const sortedButtons = filteredButtons.sort((a, b) => {
    const variantA = a.props.variant ?? 'primary';
    const variantB = b.props.variant ?? 'primary';
    return (VARIANT_ORDER[variantA] || 0) - (VARIANT_ORDER[variantB] || 0);
  });

  const buttonClassName = cn({
    'gi-justify-center sm:gi-justify-start':
      !orientation && dataModalSize !== 'sm' && !stacked,
    'gi-justify-center':
      orientation === 'vertical' || dataModalSize === 'sm' || stacked,
    'gi-justify-start': orientation === 'horizontal',
  });

  return (
    <div
      className={cn(className, {
        'gi-pt-6': sortedButtons.length === 0,
        'gi-modal-footer': sortedButtons.length,
        'gi-modal-footer-stacked': stacked,
      })}
    >
      {sortedButtons.length > 0 && (
        <div
          data-orientation={orientation || 'unset'}
          data-modal-size={dataModalSize}
        >
          {sortedButtons.map((button, index) =>
            cloneElement(button, {
              key:
                button.key ||
                button.props.id ||
                button.props['dataTestid'] ||
                `modal-footer-button-${index}`,
              id: button.props.id || `modal-footer-button-${index}`,
              className: cn(button?.props?.className, buttonClassName),
            }),
          ) || null}
        </div>
      )}
    </div>
  );
};

Object.defineProperty(ModalFooter, 'componentType', {
  value: 'ModalFooter',
  writable: false,
  enumerable: false,
});
ModalFooter.displayName = 'ModalFooter';

const ModalPortal = ({
  children,
  modalRef,
  isOpen,
}: {
  children: ReactNode;
  modalRef: any;
  isOpen: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useFocusTrap(modalRef?.current, isOpen && isMounted, {
    initialFocus: modalRef?.current ?? true,
    fallbackFocus: () => modalRef?.current,
  });

  if (!isMounted) {
    return null;
  }

  return createPortal(children, document.body);
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
