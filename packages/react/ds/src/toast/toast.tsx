'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../cn.js';
import { Toast as DSToast } from './ds-toast.js';
import type { ToastPosition, ToastProps } from './types.js';

const positions: ToastPosition[] = [
  { x: 'left', y: 'top' },
  { x: 'left', y: 'center' },
  { x: 'left', y: 'bottom' },
  { x: 'center', y: 'top' },
  { x: 'center', y: 'center' },
  { x: 'center', y: 'bottom' },
  { x: 'right', y: 'top' },
  { x: 'right', y: 'center' },
  { x: 'right', y: 'bottom' },
];

const toastProviderState = {
  isMounted: false,
};

export const ToastProvider = () => {
  const [toastStack, setToastStack] = useState<ToastProps[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleToastEvent = (event: Event) => {
      const customEvent = event as CustomEvent<ToastProps>;
      setToastStack((previous) => [...previous, customEvent.detail]);
    };

    window.addEventListener('govie:add-toast', handleToastEvent);
    toastProviderState.isMounted = true;
    return () => {
      window.removeEventListener('govie:add-toast', handleToastEvent);
      toastProviderState.isMounted = false;
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {positions.map((position) => {
        const filteredToasts = toastStack.filter(
          (toast) =>
            toast.position?.x === position.x &&
            toast.position?.y === position.y,
        );

        return createPortal(
          <div
            id={`toast-portal-${position.x}-${position.y}`}
            key={`toast-${position.x}-${position.y}`}
            role="region"
            aria-label={`Toasts-${position.y}-${position.x}`}
            className={cn('gi-toast-portal', {
              'gi-top-4': position.y === 'top',
              'gi-bottom-4': position.y === 'bottom',
              'gi-left-4': position.x === 'left',
              'gi-right-4': position.x === 'right',
              'gi-left-1/2 gi-translate-x-[-50%]': position.x === 'center',
              'gi-top-1/2 gi-translate-y-[-50%]': position.y === 'center',
            })}
          >
            {filteredToasts.map((toast, index) => (
              <Toast key={`toast-${index}`} {...toast} />
            ))}
          </div>,
          document.body,
        );
      })}
    </>
  );
};

export const toaster = {
  create: (props: ToastProps) => {
    if (toastProviderState.isMounted) {
      const event = new CustomEvent('govie:add-toast', {
        detail: {
          ...props,
          position: {
            x: props?.position?.x || 'right',
            y: props?.position?.y || 'bottom',
          },
        },
      });
      window.dispatchEvent(event);
    } else {
      console.warn('ToastProvider not found. Cannot dispatch toast event.');
    }
  },
};

export const Toast = ({
  variant,
  title,
  description,
  action,
  dismissible,
  duration = 5000,
  animation = 'fadeinup',
}: ToastProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      handleOnClose();
    }, duration);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setHide(true);
      }, 300);
    }
  }, [isOpen]);

  const handleOnClose = () => setIsOpen(false);

  if (hide) {
    return null;
  }

  return (
    <div
      data-testid={`${title}-${variant || 'info'}`}
      data-animation={animation || 'no-animation'}
      className={cn('gi-toast gi-toast-lower', {
        'gi-toast-disappear': !isOpen,
      })}
    >
      <div className="gi-wrapper">
        <div className={'gi-message'}>
          <DSToast
            onClose={handleOnClose}
            title={title}
            action={action}
            variant={variant}
            description={description}
            dismissible={dismissible}
          />
        </div>
      </div>
    </div>
  );
};
