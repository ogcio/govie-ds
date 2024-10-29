import {
    BaseComponent,
    BaseComponentOptions,
    initialiseModule,
  } from '../common/component';

  export type ComboBoxOptions = BaseComponentOptions

  export class ComboBox extends BaseComponent<ComboBoxOptions> {

    constructor(options: ComboBoxOptions) {
        super(options);
        // store state in var
        // this.dropdownState = []
        // get dropdown items
        this.dropdowns = [...options.element.querySelectorAll(":scope > div")]
        this.dropdownState = this.dropdowns.map(dropdown => {
            dropdown.dataset.isOpen = true
            return {
                isOpen: dropdown.dataset.isOpen,
                searchInput: dropdown.dataset.searchInput,
                noResults: dropdown.dataset.noResults,
                selectedCheckboxes: dropdown.dataset.selectedCheckboxes,
            }
        })
        
        console.log(this.dropdownState)
    }

    initComponent() {}
    destroyComponent() {}
  }

  export const initComboBox = initialiseModule({
    name: 'combobox',
    component: 'ComboBox'
  })