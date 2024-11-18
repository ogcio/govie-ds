import {
  BaseComponent,
  type BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type AlertOptions = BaseComponentOptions;

export class Alert extends BaseComponent<AlertOptions> {
  container: Element;
  iconButton: Element | null;
  handleDissmissAlert: () => void;

  constructor(options: AlertOptions) {
    super(options);
    this.container = options.element;
    this.iconButton = this.container.querySelector(
      'button[data-element="icon-button-container"]',
    );

    this.handleDissmissAlert = () => {
      if (this.iconButton) {
        this.container.classList.add('!gi-hidden');
      }
    };
  }
  initComponent() {
    if (this.iconButton) {
      this.iconButton.addEventListener('click', this.handleDissmissAlert);
    }
  }
  destroyComponent() {
    if (this.iconButton) {
      this.iconButton.removeEventListener('click', this.handleDissmissAlert);
    }
  }
}

export const initAlert = initialiseModule({
  name: 'alert',
  component: 'Alert',
});
