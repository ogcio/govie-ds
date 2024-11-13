import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type RadioOptions = BaseComponentOptions;

export class Radio extends BaseComponent<RadioOptions> {
  container: HTMLElement;
  getAllRadioInputs: NodeListOf<HTMLInputElement>;
  defaultValue: string | undefined;
  renderConditionalInput: () => void;

  constructor(options: RadioOptions) {
    super(options);
    this.container = this.options.element as HTMLElement;
    this.defaultValue = this.container.dataset.defaultValue;

    this.getAllRadioInputs = this.container.querySelectorAll(
      'input[data-primary="true"]',
    );

    for (const radio of this.getAllRadioInputs) {
      if (radio.value === this.defaultValue) {
        radio.checked = true;
      }
    }

    this.renderConditionalInput = () => {
      for (const radio of this.getAllRadioInputs) {
        const isChecked = (radio as HTMLInputElement).checked;
        const id = (radio as HTMLInputElement).id;
        const getConditionalContainer = document.querySelector(
          `div[data-conditional-container=${id}]`,
        );
        const getConditionalDivider = document.querySelector(
          `div[data-conditional-divider=${id}]`,
        );
        const { hasConditionalInput } = radio.dataset;

        if (isChecked) {
          getConditionalContainer?.classList.remove('gi-hidden');
          if (hasConditionalInput) {
            getConditionalDivider?.classList.remove('gi-invisible');
          }
        } else {
          getConditionalContainer?.classList.add('gi-hidden');
          if (hasConditionalInput) {
            getConditionalDivider?.classList.add('gi-invisible');
          }
        }
      }
    };
  }

  initComponent() {
    for (const radio of this.getAllRadioInputs) {
      radio.addEventListener('click', this.renderConditionalInput);
    }
  }
  destroyComponent(): void {
    for (const radio of this.getAllRadioInputs) {
      radio.removeEventListener('click', this.renderConditionalInput);
    }
  }
}

export const initRadios = initialiseModule({
  name: 'radios',
  component: 'Radio',
});
