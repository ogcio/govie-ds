'use client';
import { INotyfPosition } from 'notyf';
import { Notyf } from 'notyf';
import { cloneElement, createContext, useEffect, useContext } from 'react';
import { renderToString } from 'react-dom/server';
import { type ButtonProps } from '../button/types.js';
import { Toast as DSToast, type DSToastProps } from './ds-toast.js';

export type ToastProps = DSToastProps & {
  duration?: number;
  position?: INotyfPosition;
  trigger?: React.ReactElement<ButtonProps>;
};

const isClientSide = typeof window === 'undefined' ? null : new Notyf();
const notyfContext = createContext(isClientSide);

export const Toast = (props: ToastProps) => {
  const notyf = useContext(notyfContext);

  useEffect(() => {
    const notyfContainer = document.querySelectorAll('.notyf .notyf__toast');

    for (const toast of notyfContainer) {
      toast
        .querySelector('.gi-toast-dismiss')
        ?.addEventListener('click', () => {
          toast.classList.add('!gi-hidden');
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

export default Toast;
