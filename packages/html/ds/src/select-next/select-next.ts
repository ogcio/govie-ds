import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';
import { createIcon } from '../helpers/icons';

export type SelectNextOptions = BaseComponentOptions;

export class SelectNext extends BaseComponent<SelectNextOptions> {
  container: HTMLElement;
  getAllOptions: NodeListOf<HTMLInputElement>;
  input: HTMLElement;
  searchInput?: HTMLInputElement;
  notFoundElement?: HTMLElement;

  constructor(options: SelectNextOptions) {
    super(options);
    this.container = this.options.element as HTMLElement;
    this.handleOnOptionClick = this.handleOnOptionClick.bind(this);
    this.handleOnOptionKeyDown = this.handleOnOptionKeyDown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);

    this.getAllOptions = this.container.querySelectorAll('li[role="option"]');
    this.input = this.container.querySelector('input') as HTMLElement;
    this.searchInput = this.container.querySelector(
      'input[id^="search-input-"]',
    ) as HTMLInputElement;

    this.notFoundElement = document.createElement('div');
    this.notFoundElement.className = 'gi-select-menu-option-not-found';
    this.notFoundElement.textContent = 'No data found.';
    this.notFoundElement.style.display = 'none';
    const optionsContainer = this.container.querySelector(
      '.gi-select-menu-option-container',
    );
    optionsContainer?.append(this.notFoundElement);

    if (this.searchInput) {
      this.searchInput.addEventListener('input', this.handleSearchInput);
    }

    for (const option of this.getAllOptions) {
      if (option.value === this.input.dataset.optionValue) {
        option.setAttribute('aria-selected', 'true');
      } else {
        option.setAttribute('aria-selected', 'false');
      }
    }
    if (this.input.dataset.optionValue) {
      this.updateOptionCheck(this.input.dataset.optionValue);
    }
  }

  updateOptionCheck(value: string) {
    for (const option of this.getAllOptions) {
      const { value: optionValue } = option.dataset;
      const existingCheck = option.querySelector('.gi-icon-check');

      if (optionValue === value) {
        option.setAttribute('aria-selected', 'true');
        if (!existingCheck) {
          const checkIcon = createIcon({
            icon: 'check',
            className: 'gi-icon-check',
          });
          option.append(checkIcon);
        }
      } else {
        option.setAttribute('aria-selected', 'false');
        if (existingCheck) {
          existingCheck.remove();
        }
      }
    }
  }

  handleSearchInput(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    let hasVisibleOption = false;

    for (const option of this.getAllOptions) {
      const label = option.dataset.label?.toLowerCase() ?? '';
      if (label.includes(searchValue)) {
        option.style.display = '';
        hasVisibleOption = true;
      } else {
        option.style.display = 'none';
      }
    }

    if (this.notFoundElement) {
      this.notFoundElement.style.display = hasVisibleOption ? 'none' : 'block';
    }
  }

  handleOnOptionClick(event: any) {
    const target = event.target as HTMLElement | null;
    const { label, value } = target?.dataset ?? {};

    this.input.setAttribute('value', label || '');
    this.input.dataset.optionValue = value;
    const closePopoverEvent = new CustomEvent('closePopover', {
      bubbles: true,
    });
    this.input.dispatchEvent(closePopoverEvent);
    this.updateOptionCheck(value || '');
  }

  handleOnOptionKeyDown(event: any) {
    const key = event.key;
    const target = event.target as HTMLElement | null;
    const { label, value, isDisabled } = target?.dataset ?? {};

    if (
      key === 'Enter' &&
      (isDisabled === 'false' || isDisabled === undefined)
    ) {
      this.input.setAttribute('value', label || '');
      this.input.dataset.optionValue = value;
      const closePopoverEvent = new CustomEvent('closePopover', {
        bubbles: true,
      });
      this.input.dispatchEvent(closePopoverEvent);
      this.updateOptionCheck(value || '');
    }
  }

  handleClickOutside(event: any) {
    if (event?.target?.dataset?.ignorePopoverEvents === 'true') {
      return;
    }
    const closePopoverEvent = new CustomEvent('closePopover', {
      bubbles: true,
    });
    this.input.dispatchEvent(closePopoverEvent);
  }

  initComponent() {
    for (const option of this.getAllOptions) {
      option.addEventListener('click', this.handleOnOptionClick);
      option.addEventListener('keydown', this.handleOnOptionKeyDown);
    }
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  destroyComponent(): void {
    for (const option of this.getAllOptions) {
      option.removeEventListener('click', this.handleOnOptionClick);
      option.removeEventListener('keydown', this.handleOnOptionKeyDown);
    }
    if (this.searchInput) {
      this.searchInput.removeEventListener('input', this.handleSearchInput);
    }
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
}

export const initSelectNext = initialiseModule({
  name: 'select-next',
  component: 'SelectNext',
});
