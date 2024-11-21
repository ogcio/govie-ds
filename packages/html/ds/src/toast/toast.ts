import { Notyf, NotyfHorizontalPosition, NotyfVerticalPosition } from 'notyf';
import {
  BaseComponent,
  type BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type ToastOptions = BaseComponentOptions;

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
          this.notyf &&
            this.notyf.open({
              type: 'open',
              message: this.clonedNode?.outerHTML,
              duration,
              position,
            });
        });
      } else {
        this.notyf &&
          this.notyf.open({
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
