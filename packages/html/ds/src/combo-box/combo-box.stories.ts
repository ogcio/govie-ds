import type { Meta, StoryObj } from '@storybook/react';
import {
  categoryOptions,
  organisationOptions,
  topicOptions,
} from '../../../../react/ds/src/combo-box/combo-box.content';
import { createIconButton } from '../helpers/buttons';
import { createCheckbox, createTextInput } from '../helpers/forms';
import { createIcon } from '../helpers/icons';
import { createParagraph, createTag } from '../helpers/typography';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ComboBoxProps } from './types';

const meta: Meta<ComboBoxProps> = {
  title: 'Form/ComboBox',
};

export default meta;
type Story = StoryObj<ComboBoxProps>;

const createComboBox = (arguments_: ComboBoxProps) => {
  const comboBox = document.createElement('div');
  comboBox.dataset.module = 'gieds-combobox';

  comboBox.className = 'gi-combobox-container';

  for (let index = 0; index < arguments_.items.length; index++) {
    const item = arguments_.items[index];

    const itemContainer = document.createElement('div');
    comboBox.append(itemContainer);
    itemContainer.role = 'group';
    itemContainer.dataset.module = 'gieds-dropdown-item';

    const button = document.createElement('button');
    itemContainer.append(button);
    button.className = 'gi-combobox-toggle';

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

    if (!item.noSearch) {
      const containerSearch = document.createElement('div');
      containerOpen.append(containerSearch);
      containerSearch.className = 'gi-combobox-search';

      const searchInput = createTextInput({ placeholder: 'Search' });
      containerSearch.append(searchInput);
      searchInput.className = 'gi-combobox-search-input';

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
      });
      iconButton.className = 'gi-combobox-search-icon';
      searchButtonContainer.append(iconButton);
    }

    const checkBoxContainer = document.createElement('div');
    containerOpen.append(checkBoxContainer);
    checkBoxContainer.className = 'gi-combobox-checkbox-container';

    const noResultContainer = document.createElement('div');
    checkBoxContainer.append(noResultContainer);
    noResultContainer.className = 'gi-hidden';

    const noResult = createParagraph({ content: 'No results found' });
    noResultContainer.append(noResult);
    noResult.className = 'gi-combobox-checkbox-paragraph';

    for (let index = 0; index < item.options.length; index++) {
      const option = item.options[index];

      const checkbox = createCheckbox({
        dataElement: option.label,
        id: `cb_${index}_${option.value}`,
        size: 'sm',
        label: option.label,
        value: option.value,
        name: `${index}_${option.value}`,
      });
      checkbox.className = 'gi-combobox-checkbox';
      checkBoxContainer.append(checkbox);
    }
  }

  return comboBox;
};

const createElement = (arguments_: ComboBoxProps) => {
  const component = createComboBox(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Organisations',
        options: organisationOptions,
      },
      {
        label: 'Categories',
        options: categoryOptions,
      },
      {
        label: 'Topic (without search)',
        options: topicOptions,
        noSearch: true,
      },
    ],
    className: 'gi-mx-auto',
  },
  render: (arguments_) => createElement(arguments_),
};
