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
  useMemo,
  useId,
} from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../button/button.js';
import { cn } from '../cn.js';
import { Heading, type HeadingProps } from '../heading/heading.js';
import { useAriaHider } from '../hooks/use-aria-hider.js';
import { useFocusTrap } from '../hooks/use-focus-trap.js';
import { Icon, type IconSize } from '../icon/icon.js';
import { IconButton } from '../icon-button/icon-button.js';
import {
  splitAriaProps,
  getSpecialComponentType,
  isSpecialComponent,
} from '../utils/utilities.js';

import type {
  ModalCloseButtonProps,
  ModalFooterButton,
  ModalFooterProps,
  ModalProps,
  ModalWrapperProps,
  ModalHeaderProps,
} from './types.js';

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
      icon={{ icon: 'close' }}
      aria-label="Close modal"
      onClick={props.onClick}
      variant="flat"
      size={size}
      appearance="dark"
      dataTestid="modal-close-button"
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
  <div className="gi-py-2  xs:gi-py-4">
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
  const modalRef = useRef<HTMLDivElement | null>(null);
  useAriaHider(modalRef, isOpen);
  const [ariaProps, rest] = useMemo(
    () => splitAriaProps(props as Record<string, unknown>),
    [props],
  );
  useEffect(() => {
    if (isOpen && modalRef.current !== null) {
      modalRef.current.focus()
    }
  }, [isOpen])

  const allChildren = Children.toArray(children);

  const getChildrenByComponentType = (componentType: string) =>
    allChildren.find(
      (child) => getSpecialComponentType(child) === componentType,
    ) as ReactElement | undefined;

  const modalTitle = getChildrenByComponentType('ModalTitle');
  const modalFooter =
    getChildrenByComponentType('ModalFooter') ||
    getChildrenByComponentType('DrawerFooter');

  const titleUid = useId();
  const computedTitleId =
    (modalTitle as any)?.props?.id || `gi-modal-title-${titleUid}`;

  const modalTitleClone = modalTitle
    ? cloneElement(modalTitle as ReactElement<HeadingProps>, {
      as: size === 'sm' ? 'h5' : 'h4',
      id: computedTitleId,
    })
    : null;

  const modalFooterClone = modalFooter
    ? cloneElement(modalFooter as ReactElement<ModalFooterProps>, {
      dataModalSize: size,
    })
    : null;

  const contentChildren = allChildren.filter(
    (child) =>
      !isSpecialComponent(child, ['ModalTitle', 'ModalFooter', 'DrawerFooter']),
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

  useEffect(() => {
    if (!isOpen || !closeOnClick || !closeOnOverlayClick) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const container = (modalRef as any).current?.querySelector(
        '.gi-modal-container-control',
      ) as HTMLElement | null;
      if (!container) {
        return;
      }
      if (!container.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () =>
      document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [isOpen, closeOnClick, closeOnOverlayClick, onClose]);

  const Overlay = (
    <div
      {...rest}
      ref={modalRef}
      className={cn('gi-modal', {
        'gi-modal-open': isOpen,
        'gi-modal-close': !isOpen,
      })}
      data-testid={dataTestId || 'modal'}
      tabIndex={-1}
    >
      <div
        data-testid="modal-container"
        role="dialog"
        aria-modal="true"
        aria-label="dialog"
        {...ariaProps}
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
  );

  return (
    <ModalPortal modalRef={modalRef} isOpen={isOpen}>
      {Overlay}
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
  includeModalClass = true,
}: {
  children: ReactNode;
  className?: string;
  includeModalClass?: boolean;
}) => (
  <div
    aria-label="Modal content"
    role="document"
    tabIndex={0}
    className={cn(includeModalClass && 'gi-modal-body', className)}
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

  useFocusTrap(modalRef, isOpen && isMounted, {
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
