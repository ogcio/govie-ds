import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type RadioOptions = BaseComponentOptions;

export class Radio extends BaseComponent<RadioOptions> {
  getAllRadioInputs: NodeListOf<HTMLInputElement>;
  renderConditionalInput: () => void;

  constructor(options: RadioOptions) {
    super(options);

    this.getAllRadioInputs = document.querySelectorAll(
      'input[data-primary="true"]',
    );

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
