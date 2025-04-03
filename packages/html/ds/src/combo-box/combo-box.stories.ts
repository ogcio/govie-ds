import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
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

const standardProps = {
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
};

export const Default: Story = {
  args: standardProps,
  render: (arguments_) => createElement(arguments_),
};

export const Test: Story = {
  args: standardProps,
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const elements = canvas.getAllByTestId('combobox-toggle');

    for (const element of elements) {
      expect(element).toBeVisible();
    }

    for (const [index, element] of elements.entries()) {
      const label = element
        .querySelector('.gi-paragraph-md')
        ?.textContent?.trim();
      expect(label).toBe(standardProps.items[index].label);
    }

    for (const element of elements) {
      await userEvent.click(element);
    }
    const dropdownElements = canvas.getAllByTestId(
      'combobox-dropdown-container',
    );

    for (const element of dropdownElements) {
      expect(element).toBeVisible();
    }

    let searchInput = dropdownElements[0].querySelector('.gi-combobox-search');
    expect(searchInput).toBeVisible();

    for (const [index, element] of dropdownElements.entries()) {
      const checkboxesLength = element.querySelectorAll(
        '.gi-combobox-checkbox',
      ).length;
      expect(checkboxesLength).toBe(standardProps.items[index].options.length);
    }

    for (const element of dropdownElements) {
      const checkboxesInputs = element.querySelectorAll(
        '.gi-combobox-checkbox input',
      ) as NodeListOf<HTMLInputElement>;
      for (const input of checkboxesInputs) {
        await userEvent.click(input);
      }
    }

    for (const [index, element] of elements.entries()) {
      const tag = element.querySelector('.gi-tag');
      expect(tag).toBeVisible();
      expect(tag?.textContent?.trim()).toBe(
        standardProps.items[index].options.length.toString(),
      );
    }

    searchInput = canvas
      .getAllByTestId('combobox-dropdown-container')[0]
      .querySelector('.gi-combobox-search-input input');
    if (searchInput) {
      await userEvent.type(searchInput, 'thisShouldRenderNoResults');
      const noResultsElement = canvas
        .getAllByTestId('combobox-dropdown-container')[0]
        .querySelector('.gi-combobox-checkbox-paragraph');
      expect(noResultsElement).toBeVisible();

      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'board');

      const filteredCheckboxes = canvas
        .getAllByTestId('combobox-dropdown-container')[0]
        .querySelectorAll('.gi-combobox-checkbox[style="display: flex;"]');
      expect(filteredCheckboxes.length).toBe(3);
    }
  },
};
