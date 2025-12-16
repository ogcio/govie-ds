import { ComboBoxProps } from '../combo-box/types';
import { createIconButton } from './buttons';
import { createCheckbox, createTextInput } from './forms';
import { createIcon } from './icons';
import { createParagraph, createTag } from './typography';

export const createComboBox = (arguments_: ComboBoxProps) => {
  const comboBox = document.createElement('div');
  comboBox.dataset.module = 'gieds-combobox';

  comboBox.className = 'gi-combobox-container';

  for (let index = 0; index < arguments_.items.length; index++) {
    const item = arguments_.items[index];

    const itemContainer = document.createElement('div');
    comboBox.append(itemContainer);
    itemContainer.role = 'group';
    itemContainer.className = 'gi-combobox-dropdown-item';
    itemContainer.dataset.module = 'gieds-dropdown-item';

    const button = document.createElement('button');
    itemContainer.append(button);
    button.className =
      'gi-btn gi-btn-flat-dark gi-btn-large gi-combobox-toggle';
    button.dataset.testid = 'combobox-toggle';

    const buttonContent = document.createElement('div');
    button.append(buttonContent);
    buttonContent.className = 'gi-combobox-toggle-content';
    const buttonLabel = createParagraph({ size: 'md', content: item.label });
    buttonContent.append(buttonLabel);

    const tagContainer = document.createElement('div');
    buttonContent.append(tagContainer);
    tagContainer.className = 'gi-hidden';

    const counter = createTag({ text: '0', type: 'counter' });
    tagContainer.append(counter);

    const icon = createIcon({ icon: 'keyboard_arrow_down' });
    button.append(icon);

    const containerOpen = document.createElement('div');
    itemContainer.append(containerOpen);
    containerOpen.className = 'gi-combobox-dropdown-container-close';
    containerOpen.dataset.element = 'combobox-dropdown-container';
    containerOpen.dataset.testid = 'combobox-dropdown-container';

    if (!item.noSearch) {
      const containerSearch = document.createElement('div');
      containerOpen.append(containerSearch);
      containerSearch.className = 'gi-combobox-search';

      const searchInput = createTextInput({
        placeholder: 'Search',
      });
      containerSearch.append(searchInput);
      searchInput.className =
        'gi-combobox-search-input gi-input-text-container';

      const searchButtonContainer = document.createElement('div');
      containerSearch.append(searchButtonContainer);
      searchButtonContainer.className = 'gi-hidden';

      const iconButton = createIconButton({
        variant: 'flat',
        appearance: 'dark',
        size: 'small',
        icon: {
          icon: 'close',
        },
        className: 'gi-combobox-search-icon',
      });

      searchButtonContainer.append(iconButton);
    }

    const checkBoxContainer = document.createElement('div');
    containerOpen.append(checkBoxContainer);
    checkBoxContainer.className = 'gi-combobox-checkbox-container';

    if (!item.noSearch) {
      checkBoxContainer.className += ' gi-h-64';
    }

    const noResultContainer = document.createElement('div');
    checkBoxContainer.append(noResultContainer);
    noResultContainer.className = 'gi-hidden';

    const noResult = createParagraph({ content: 'No results found' });
    noResultContainer.append(noResult);
    noResult.className = 'gi-combobox-checkbox-paragraph';

    for (let index = 0; index < item.options.length; index++) {
      const comboBoxCheckbox = document.createElement('div');
      comboBoxCheckbox.className = 'gi-combobox-checkbox';
      const option = item.options[index];

      const checkbox = createCheckbox({
        dataElement: option.label,
        id: `cb_${index}_${option.value}`,
        size: 'sm',
        label: option.label,
        value: option.value,
        name: `${index}_${option.value}`,
      });
      comboBoxCheckbox.append(checkbox);
      checkBoxContainer.append(comboBoxCheckbox);
    }
  }

  return comboBox;
};
