import {
  BaseComponent,
  type BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type ComboBoxOptions = BaseComponentOptions;

type dropdownStateType = {
  elements: {
    dropdownToggle: Element;
    dropdownContainer: Element;
    closeIcon: HTMLSpanElement;
    checkboxes: NodeListOf<HTMLInputElement>;
    noResultsElement: HTMLParagraphElement;
    tag: Element;
    searchInputElement: HTMLInputElement | null;
    resetSearchElement: Element | null;
  };
  isOpen: boolean;
  searchInput: string;
  noResults: boolean;
  selectedCheckboxes: number;
};

export class ComboBox extends BaseComponent<ComboBoxOptions> {
  dropdowns: Element[];
  mainContainer: Element;
  dropdownState: dropdownStateType[];

  handleOpenDropdown: (element: Element, state: dropdownStateType) => void;
  constructor(options: ComboBoxOptions) {
    super(options);
    this.mainContainer = options.element;
    this.dropdowns = [...this.mainContainer.querySelectorAll(':scope > div')];

    this.dropdownState = this.dropdowns.map((dropdown) => {
      return {
        elements: {
          dropdownToggle: dropdown.querySelector('.gi-combobox-toggle')!,
          dropdownContainer: dropdown.querySelector(
            'div[data-element="combobox-dropdown-container"]',
          )!,
          closeIcon: dropdown.querySelector('.gi-combobox-toggle > span')!,
          searchInputElement: dropdown.querySelector(
            '.gi-combobox-search-input input',
          ),
          checkboxes: dropdown.querySelectorAll('.gi-combobox-checkbox'),
          resetSearchElement: dropdown.querySelector(
            '.gi-combobox-search .gi-combobox-search-icon',
          ),
          noResultsElement: dropdown.querySelector(
            '.gi-combobox-checkbox-paragraph',
          )!,
          tag: dropdown.querySelector('.gi-tag')!,
        },
        isOpen: false,
        searchInput: '',
        noResults: false,
        selectedCheckboxes: 0,
      };
    });

    this.handleOpenDropdown = (element: Element, state: dropdownStateType) => {
      state.isOpen = !state.isOpen;
      state.isOpen
        ? element.classList.remove('gi-hidden')
        : element.classList.add('gi-hidden');
    };
  }

  initComponent() {
    for (const state of this.dropdownState) {
      const {
        dropdownToggle,
        dropdownContainer,
        closeIcon,
        searchInputElement,
        checkboxes,
        resetSearchElement,
        noResultsElement,
        tag,
      } = state.elements;

      for (const checkbox of checkboxes) {
        checkbox.addEventListener('change', () => {
          const input = checkbox.querySelector('input');
          const label = checkbox.querySelector('label');

          if (input?.checked) {
            checkbox.classList.add('hover:gi-bg-gray-50');
            label?.classList.add('gi-font-bold');
            state.selectedCheckboxes++;
          } else {
            checkbox.classList.remove('hover:gi-bg-gray-50');
            label?.classList.remove('gi-font-bold');
            state.selectedCheckboxes--;
          }
          if (state.selectedCheckboxes) {
            tag.classList.remove('!gi-hidden');
            tag.textContent = state.selectedCheckboxes.toString();
          } else {
            tag.classList.add('!gi-hidden');
            tag.textContent = state.selectedCheckboxes.toString();
          }
        });
      }

      dropdownToggle.addEventListener('click', (event) => {
        event.preventDefault();
        state.isOpen = !state.isOpen;
        if (state.isOpen) {
          dropdownToggle.classList.add('gi-combobox-toggle-open');
          dropdownContainer.classList.remove('!gi-hidden');
          closeIcon.classList.add('gi-rotate-180');
        } else {
          dropdownToggle.classList.remove('gi-combobox-toggle-open');
          dropdownContainer.classList.add('!gi-hidden');
          closeIcon.classList.remove('gi-rotate-180');
        }
      });

      if (searchInputElement && resetSearchElement) {
        resetSearchElement.addEventListener('click', (event) => {
          resetSearchElement.classList.add('!gi-hidden');
          noResultsElement.classList.add('!gi-hidden');
          event.preventDefault();
          state.searchInput = '';
          searchInputElement.value = '';
          for (const checkbox of checkboxes) {
            checkbox.style.display = 'flex';
          }
        });

        searchInputElement.addEventListener('input', (event) => {
          let hiddenCheckboxes = 0;
          if (event.target) {
            state.searchInput = (event.target as HTMLInputElement).value;
          }

          for (const checkbox of checkboxes) {
            const label = checkbox.querySelector('label')?.textContent;

            state.searchInput
              ? resetSearchElement.classList.remove('!gi-hidden')
              : resetSearchElement.classList.add('!gi-hidden');

            if (
              label?.toLowerCase().includes(state.searchInput.toLowerCase())
            ) {
              checkbox.style.display = 'flex';
            } else {
              checkbox.style.display = 'none';
              hiddenCheckboxes++;
            }
          }
          hiddenCheckboxes === checkboxes.length
            ? noResultsElement.classList.remove('!gi-hidden')
            : noResultsElement.classList.add('!gi-hidden');
        });
      }
    }
  }
  destroyComponent() {}
}

export const initComboBox = initialiseModule({
  name: 'combobox',
  component: 'ComboBox',
});
