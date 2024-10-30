import userEvent from '@testing-library/user-event';
import {
  categoryOptions,
  organisationOptions,
  topicOptions,
} from '../../../../react/ds/src/combo-box/combo-box.content';
import { render } from '../common/render';
import html from './combo-box.html?raw';
import { ComboBoxProps } from './combo-box.schema';

const standardProps = {
  action: '#',
  dropdownItems: [
    {
      label: 'Organisations',
      options: organisationOptions,
    },
    {
      label: 'Categories',
      options: categoryOptions,
    },
    {
      label: 'Topic',
      options: topicOptions,
    },
  ],
};

describe('comboBox', () => {
  const renderComboBox = render<ComboBoxProps>({
    componentName: 'combo-box',
    macroName: 'govieComboBox',
    html,
  });

  it('should display the toogle element', () => {
    const screen = renderComboBox(standardProps);
    const elements = screen.getAllByTestId('combobox-toggle');

    for (const element of elements) {
      expect(element).toBeVisible();
    }
  });
  it('should display the correct toogle label', () => {
    const screen = renderComboBox(standardProps);
    const elements = screen.getAllByTestId('combobox-toggle');

    for (const [index, element] of elements.entries()) {
      const label = element
        .querySelector('.gi-paragraph-md')
        ?.textContent?.trim();
      expect(label).toBe(standardProps.dropdownItems[index].label);
    }
  });
  it('should display the dropdown on open', () => {
    const screen = renderComboBox(standardProps);
    const elements = screen.getAllByTestId('combobox-toggle');

    for (const element of elements) {
      element.click();
    }
    const dropdownElements = screen.getAllByTestId(
      'combobox-dropdown-container',
    );

    for (const element of dropdownElements) {
      expect(element).toBeVisible();
    }
  });
  it('should display the search input', () => {
    const screen = renderComboBox(standardProps);
    const elements = screen.getAllByTestId('combobox-toggle');

    for (const element of elements) {
      element.click();
    }

    const dropdownElements = screen.getAllByTestId(
      'combobox-dropdown-container',
    );

    for (const element of dropdownElements) {
      const searchInput = element.querySelector('.gi-combobox-search');
      expect(searchInput).toBeVisible();
    }
  });
  it('should display the correct number of checkboxes ', () => {
    const screen = renderComboBox(standardProps);
    const elements = screen.getAllByTestId('combobox-toggle');

    for (const element of elements) {
      element.click();
    }

    const dropdownElements = screen.getAllByTestId(
      'combobox-dropdown-container',
    );

    for (const [index, element] of dropdownElements.entries()) {
      const checkboxesLength = element.querySelectorAll(
        '.gi-combobox-checkbox',
      ).length;
      expect(checkboxesLength).toBe(
        standardProps.dropdownItems[index].options.length,
      );
    }
  });
  it('should display the tag and the correct number of selected inputs', () => {
    const screen = renderComboBox(standardProps);
    const elements = screen.getAllByTestId('combobox-toggle');

    for (const element of elements) {
      element.click();
    }

    const dropdownElements = screen.getAllByTestId(
      'combobox-dropdown-container',
    );

    for (const element of dropdownElements) {
      const checkboxesInputs = element.querySelectorAll(
        '.gi-combobox-checkbox input',
      ) as NodeListOf<HTMLInputElement>;
      for (const input of checkboxesInputs) {
        input.click();
      }
    }

    for (const [index, element] of elements.entries()) {
      const tag = element.querySelector('.gi-tag');
      expect(tag).toBeVisible();
      expect(tag?.textContent?.trim()).toBe(
        standardProps.dropdownItems[index].options.length.toString(),
      );
    }
  });
  it('should display the no results element', async () => {
    const screen = renderComboBox(standardProps);
    const element = screen.getAllByTestId('combobox-toggle')[0];
    element.click();
    const searchInput = screen
      .getAllByTestId('combobox-dropdown-container')[0]
      .querySelector('.gi-combobox-search-input input');
    if (searchInput) {
      await userEvent.type(searchInput, 'thisShouldRenderNoResults');
      const noResultsElement = screen
        .getAllByTestId('combobox-dropdown-container')[0]
        .querySelector('.gi-combobox-checkbox-paragraph');
      expect(noResultsElement).toBeVisible();
    }
  });
  it('should filter the checkboxes', async () => {
    const screen = renderComboBox(standardProps);
    const element = screen.getAllByTestId('combobox-toggle')[0];
    element.click();
    const searchInput = screen
      .getAllByTestId('combobox-dropdown-container')[0]
      .querySelector('.gi-combobox-search-input input');
    if (searchInput) {
      await userEvent.type(searchInput, 'board');

      const filteredCheckboxes = screen
        .getAllByTestId('combobox-dropdown-container')[0]
        .querySelectorAll('.gi-combobox-checkbox[style="display: flex;"]');
      expect(filteredCheckboxes.length).toBe(3);
    }
  });
});
