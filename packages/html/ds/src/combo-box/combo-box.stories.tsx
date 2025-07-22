import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, userEvent, within } from 'storybook/test';
import {
  categoryOptions,
  organisationOptions,
  topicOptions,
} from '../../../../react/ds/src/combo-box/combo-box.content';
import { createComboBox } from '../helpers/combobox';
import { ComboBoxProps } from './types';

const meta: Meta<ComboBoxProps> = {
  title: 'Form/ComboBox',
};

export default meta;
type Story = StoryObj<ComboBoxProps>;

const createElement = (arguments_: ComboBoxProps) => {
  const component = createComboBox(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
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
