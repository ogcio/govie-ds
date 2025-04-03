import {
  BaseComponent,
  type BaseComponentOptions,
  initialiseModule,
} from '../common/component';
// @ts-expect-error The TS error is necessary as we are integrating the notyf library within our repo and thus no longer the libraries declarations
import { Notyf } from './assets/notyf.min.js';

export type ToastOptions = BaseComponentOptions;
type NotyfVerticalPosition = 'center' | 'top' | 'bottom';
type NotyfHorizontalPosition = 'left' | 'center' | 'right';

const notyf = new Notyf();

export class Toast extends BaseComponent<ToastOptions> {
  container: HTMLElement;
  dsToastContainer: Element | null;
  clonedNode: HTMLElement | undefined;
  triggerButton: HTMLButtonElement | null;
  notyf: Notyf;

  renderNotyf: () => void;

  constructor(options: ToastOptions) {
    super(options);
    this.container = options.element as HTMLElement;
    this.dsToastContainer = this.container.nextElementSibling;
    this.triggerButton = this.container.querySelector(':scope > button');
    this.notyf = notyf;

    setTimeout(() => {
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
    });

    this.renderNotyf = () => {
      const duration = this.container.dataset.duration
        ? Number(this.container.dataset.duration)
        : undefined;
      const x = this.container.dataset.positionX as
        | NotyfHorizontalPosition
        | undefined;
      const y = this.container.dataset.positionY as
        | NotyfVerticalPosition
        | undefined;
      const hasPos = x && y;
      const position = hasPos
        ? {
            x,
            y,
          }
        : undefined;

      this.clonedNode = this.dsToastContainer?.cloneNode(true) as HTMLElement;
      this.clonedNode?.classList.remove('gi-hidden');
      if (this.triggerButton) {
        this.triggerButton.addEventListener('click', () => {
          this.notyf?.open({
            type: 'open',
            message: this.clonedNode?.outerHTML,
            duration,
            position,
          });
        });
      } else {
        this.notyf?.open({
          type: 'open',
          message: this.clonedNode?.outerHTML,
          duration,
          position,
        });
      }
    };
  }

  initComponent() {
    this.renderNotyf();
  }
  destroyComponent() {}
}

export const initToast = initialiseModule({
  name: 'toast',
  component: 'Toast',
});
