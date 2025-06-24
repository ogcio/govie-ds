import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type InputPasswordOptions = BaseComponentOptions;

export class InputPassword extends BaseComponent<InputPasswordOptions> {
  inputEl: HTMLInputElement | null;
  toggleButton: HTMLElement | null;

  constructor(options: InputPasswordOptions) {
    super(options);

    this.inputEl =
      options.element.querySelector<HTMLInputElement>('.gi-input-text');
    this.toggleButton = options.element.querySelector<HTMLElement>(
      '#input-password-visibility-icon',
    );
  }
  initComponent() {
    if (!this.inputEl || !this.toggleButton) {
      return;
    }
    this.toggleButton.addEventListener('click', this.toggleHandler);
  }

  destroyComponent() {
    if (this.toggleButton) {
      this.toggleButton.removeEventListener('click', this.toggleHandler);
    }
  }

  private toggleHandler = () => {
    if (!this.inputEl || !this.toggleButton) {
      return;
    }

    const isPassword = this.inputEl.type === 'password';
    this.inputEl.type = isPassword ? 'text' : 'password';

    const iconElement = this.toggleButton.querySelector<HTMLElement>(
      '.material-symbols-outlined',
    );
    if (iconElement) {
      iconElement.textContent = isPassword ? 'visibility_off' : 'visibility';
    }
  };
}

export const initPassword = initialiseModule({
  name: 'input-password',
  component: 'InputPassword',
});
