'use client';
import { INotyfPosition } from 'notyf';
import { Notyf } from 'notyf';
import { cloneElement, createContext, useEffect, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { type ButtonProps } from '../button/types.js';
import { Toast as DSToast, type DSToastProps } from './ds-toast.js';

export type ToastProps = DSToastProps & {
  duration?: number;
  position?: INotyfPosition;
  trigger?: React.ReactElement<ButtonProps>;
};

const notyfInstance = typeof window === 'undefined' ? null : new Notyf();
const notyfContext = createContext(notyfInstance);

export const Toast = (props: ToastProps) => {
  const notyf = useContext(notyfContext);

  useEffect(() => {
    const notyfContainer = document.querySelectorAll(
      '.notyf .notyf__toast',
    ) as NodeListOf<HTMLElement>;

    for (const toast of notyfContainer) {
      toast
        .querySelector('.gi-toast-dismiss')
        ?.addEventListener('click', () => {
          toast.style.display = 'none';
        });
    }
  }, []);

  const renderNotyf = () => {
    const { duration, position } = props;
    const html = renderToString(<DSToast {...props} />);
    notyf && notyf.open({ type: 'open', message: html, duration, position });
  };

  if (props.trigger) {
    return cloneElement(props.trigger, { onClick: renderNotyf });
  }
  renderNotyf();
};

let toastContainer: HTMLElement | null = null;
const ensureToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.append(toastContainer);
  }
};

export const toaster = {
  create: (props: ToastProps) => {
    if (!notyfInstance) {
      return;
    }

    ensureToastContainer();

    const toastWrapper = document.createElement('div');
    toastContainer!.append(toastWrapper);

    const root = createRoot(toastWrapper);
    root.render(<DSToast {...props} />);

    setTimeout(() => {
      notyfInstance.open({
        type: 'open',
        message: toastWrapper.innerHTML,
        duration: props.duration,
        position: props.position,
      });

      setTimeout(() => {
        toastWrapper.remove();
      }, props.duration);
    }, 0);
  },
};

export default Toast;
