'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/cn.js';
import { translate as t } from '@/i18n/utility.js';
import { Toast as DSToast } from './ds-toast.js';
import type { ToastPosition, ToastProps } from './types.js';
import { tv } from 'tailwind-variants';

const positions: ToastPosition[] = [
  { x: 'left', y: 'top' },
  { x: 'left', y: 'bottom' },
  { x: 'center', y: 'top' },
  { x: 'center', y: 'bottom' },
  { x: 'right', y: 'top' },
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

    globalThis.window.addEventListener('govie:add-toast', handleToastEvent);
    toastProviderState.isMounted = true;
    return () => {
      globalThis.window.removeEventListener('govie:add-toast', handleToastEvent);
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
          (toast) => toast.position?.x === position.x && toast.position?.y === position.y,
        );
        return createPortal(
          <div
            id={`toast-portal-${position.x}-${position.y}`}
            key={`toast-${position.x}-${position.y}`}
            role="region"
            aria-label={t('toast.position', {
              x: position.x,
              y: position.y,
              defaultValue: `Toasts-${position.y}-${position.x}`,
            })}
            data-position={`${position.y}-${position.x}`}
            className={portal({ x: position.x, y: position.y })}
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

const portal = tv({
  base: 'gi-fixed gi-flex gi-flex-col gi-gap-5 gi-z-100 gi-w-full gi-max-w-[calc(100%_-_var(--gieds-space-8))] md:gi-w-auto',
  variants: {
    y: {
      top: 'gi-top-4',
      bottom: 'gi-bottom-4',
    },
    x: {
      left: 'gi-left-4',
      right: 'gi-right-4',
      center: 'gi-left-1/2 gi--translate-x-1/2 gi-items-center',
    },
  },
});

export const toaster = {
  create: ({ position, ...props }: ToastProps) => {
    if (toastProviderState.isMounted) {
      const event = new CustomEvent('govie:add-toast', {
        detail: {
          ...props,
          position: {
            x: position?.x || 'right',
            y: position?.y || 'bottom',
          },
        },
      });
      globalThis.window.dispatchEvent(event);
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
  showIcon = true,
  slotAction,
  ...props
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
      className={cn('gi-toast', {
        'gi-toast-disappear': !isOpen,
      })}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      aria-label={title}
      {...props}
    >
      <div>
        <div>
          <DSToast
            onClose={handleOnClose}
            title={title}
            action={action}
            variant={variant}
            description={description}
            dismissible={dismissible}
            slotAction={slotAction}
            showIcon={showIcon}
          />
        </div>
      </div>
    </div>
  );
};

const toastVariants = tv({
  base: 'gi-m-0 gi-p-0 md:gi-min-w-[320px] md:gi-max-w-[460px] gi-w-full gi-block gi-overflow-hidden gi-pointer-events-auto gi-relative gi-rounded-sm gi-box-border gi-shrink-[0]',
});
