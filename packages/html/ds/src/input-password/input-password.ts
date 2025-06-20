import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';
// import { createIconButton } from '../helpers/buttons';

export type InputPasswordOptions = BaseComponentOptions;

export class InputPassword extends BaseComponent<InputPasswordOptions> {
  // inputEl: HTMLInputElement | null;
  // toggleButton: HTMLElement | null;

  constructor(options: InputPasswordOptions) {
    super(options);

    console.log('constructor!');

    // this.inputEl =
    //   options.element.querySelector<HTMLInputElement>('.gi-input-text');
    // this.toggleButton = options.element.querySelector<HTMLElement>(
    //   '#input-password-visibility-icon',
    // );
  }
  initComponent() {
    // if (!this.inputEl || !this.toggleButton) return;
    // this.toggleButton.addEventListener('click', this.toggleHandler);
    console.log('init!');
  }

  destroyComponent() {
    console.log('destroyed!');
    // if (this.toggleButton) {
    //   this.toggleButton.removeEventListener('click', this.toggleHandler);
    // }
  }

  // private toggleHandler = () => {
  //   if (!this.inputEl || !this.toggleButton) return;

  //   const isPassword = this.inputEl.type === 'password';
  //   this.inputEl.type = isPassword ? 'text' : 'password';

  //   // Replace entire icon button
  //   const newIconButton = createIconButton({
  //     id: 'input-password-visibility-icon',
  //     icon: {
  //       icon: isPassword ? 'visibility_off' : 'visibility',
  //     },
  //     variant: 'flat',
  //     size: 'small',
  //     appearance: 'dark',
  //     disabled: this.inputEl.disabled,
  //   });

  //   // Rebind the event listener
  //   newIconButton.addEventListener('click', this.toggleHandler);

  //   this.toggleButton.replaceWith(newIconButton);
  //   this.toggleButton = newIconButton;
  // };
}

export const initPassword = initialiseModule({
  name: 'input-password',
  component: 'InputPassword',
});
