import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type CheckboxesOptions = BaseComponentOptions;

export class Checkboxes extends BaseComponent<CheckboxesOptions> {
  checkboxContainer: Element;
  noneCheckbox: HTMLInputElement | null;
  checkboxes: NodeListOf<HTMLInputElement>;

  noneCheckboxHandler: EventListenerOrEventListenerObject;
  checkboxHandler: EventListenerOrEventListenerObject;

  constructor(options: CheckboxesOptions) {
    super(options);

    this.checkboxContainer = this.query.getByElement({
      name: 'checkbox-container',
    });
    this.noneCheckbox = this.checkboxContainer.querySelector(
      'input[data-element="checkbox-none-option"]',
    );
    this.checkboxes = this.checkboxContainer.querySelectorAll(
      'input:not(input[data-element="checkbox-none-option"])',
    );

    this.noneCheckboxHandler = () => {
      for (const checkbox of this.checkboxes) {
        checkbox.checked = false;
        checkbox.setAttribute('aria-checked', 'false');
      }
      if (this.noneCheckbox) {
        this.noneCheckbox.setAttribute('aria-checked', 'true');
      }
    };

    this.checkboxHandler = () => {
      const CheckboxesChecked = [...this.checkboxes]
        .map((checkbox) => checkbox.checked)
        .some(Boolean);
      if (CheckboxesChecked && this.noneCheckbox) {
        this.noneCheckbox.checked = false;
        this.noneCheckbox.setAttribute('aria-checked', 'false');
      }
      for (const checkbox of this.checkboxes) {
        checkbox.setAttribute('aria-checked', checkbox.checked.toString());
      }
    };
  }

  initComponent() {
    if (this.noneCheckbox) {
      this.noneCheckbox.addEventListener('click', this.noneCheckboxHandler);
    }

    for (const checkbox of this.checkboxes) {
      checkbox.addEventListener('click', this.checkboxHandler);
    }
  }
  destroyComponent(): void {
    if (this.noneCheckbox) {
      this.noneCheckbox.addEventListener('click', this.noneCheckboxHandler);
    }

    for (const checkbox of this.checkboxes) {
      checkbox.addEventListener('click', this.checkboxHandler);
    }
  }
}

export const initCheckboxes = initialiseModule({
  name: 'checkboxes',
  component: 'Checkboxes',
});
