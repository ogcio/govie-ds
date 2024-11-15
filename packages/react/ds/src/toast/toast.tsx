import 'notyf/notyf.min.css';
import { INotyfPosition } from 'notyf';
import { Notyf } from 'notyf';
import { cloneElement, createContext, useContext, useEffect, type ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { type VariantProps } from 'tailwind-variants';
import { type ButtonProps } from '../button/types.js';
import { Toast as DSToast, toastVariants } from './ds-toast.js';

type ToastProps = {
  variant?: VariantProps<typeof toastVariants>['variant'];
  title: string;
  children?: ReactNode;
  dismissible?: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  duration?: number;
  position?: INotyfPosition;
  trigger?: React.ReactElement<ButtonProps>;
};

const notyfContext = createContext(new Notyf());  

export const Toast = (props: ToastProps) => {
  const notyf = useContext(notyfContext);

  useEffect(() => {
    const notyfContainer = document.querySelectorAll('.notyf .notyf__toast');
    console.log(notyfContainer);

    for (const toast of notyfContainer) {
      toast
        .querySelector('.gi-toast-dismiss')
        ?.addEventListener('click', (event) => {
          //   props.onClose(event);
          toast.classList.add('!gi-hidden');
        });
    }
  }, []);

  const renderNotyf = () => {
    const { duration, position } = props;
    const html = renderToString(<DSToast {...props} />);
    notyf.open({ type: 'open', message: html, duration, position });
  };

  if (props.trigger) {
    return cloneElement(props.trigger, { onClick: renderNotyf });
  }
  renderNotyf();
};

export default Toast;
