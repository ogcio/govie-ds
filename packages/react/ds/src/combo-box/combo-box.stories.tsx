import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { userEvent, within, expect } from 'storybook/test';
import { Form } from '../forms/form.js';
import {
  organisationOptions,
  categoryOptions,
  topicOptions,
} from './combo-box.content.js';
import { Combobox } from './combo-box.js';
import { DropdownItem } from './dropdown-item.js';

const meta = {
  title: 'Form/ComboBox',
  parameters: {
    docs: {
      description: {
        component: 'Use this component to search through a list of options',
      },
    },
  },
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;

export const Default: StoryObj = {
  argTypes: {
    children: {
      control: 'array',
      description:
        'The content that will be inserted into the accordion (AccordionItem components)',
      table: {
        type: { summary: 'React.ReactElement<typeof AccordionItem>[]' },
      },
    },
    iconStart: {
      control: 'boolean',
      description:
        'Indicates whether icons should appear on the left (true) or the right (false) of the accordion label.',
    },
    dataTestid: {
      control: 'text',
      description: 'Custom test id for the Accordion component.',
    },
  },
  render: () => (
    <Form>
      <Combobox className="gi-mx-auto">
        <DropdownItem options={organisationOptions}>Organisations</DropdownItem>
        <DropdownItem options={categoryOptions}>Categories</DropdownItem>
        <DropdownItem options={topicOptions} noSearch>
          Topic (without search)
        </DropdownItem>
      </Combobox>
    </Form>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await step('Open the "Organisations" dropdown', async () => {
      const openButton = await canvas.findByRole('button', {
        name: /organisations/i,
      });
      await user.click(openButton);
      await canvas.findByRole('group', { name: /organisations dropdown/i });
    });

    await step('find and select the first option', async () => {
      let firstOption: HTMLElement | null = null;

      try {
        firstOption = (await canvas.findByLabelText(/An Bord Pleanála/i, {
          selector: 'input[type="checkbox"]',
        })) as HTMLElement;
      } catch {
        const checkboxes = await canvas.findAllByRole('checkbox');
        firstOption = checkboxes[0] as HTMLElement;
      }

      expect(firstOption).toBeVisible();
      await user.click(firstOption);
      expect(firstOption).toBeChecked();
    });
  },
};

export const ControlledAndUncontrolled = {
  parameters: {
    docs: {
      description: {
        story: `
  This story demonstrates both **controlled** and **uncontrolled** usage of the \`DropdownItem\` component within a \`Combobox\`.

  - The **Organisations** dropdown is **uncontrolled**, using \`defaultValue\` and internally managed state.
  - The **Categories** dropdown is **controlled**, using \`value\` and an external \`onChange\` handler.
  - The **onSearch** callback is also demonstrated for the Organisations dropdown.

  ### Props used:
  - \`defaultValue\`: Pre-selects initial values for uncontrolled dropdowns.
  - \`value\`: Controls the selected values from outside the component.
  - \`onChange\`: Called whenever a checkbox is toggled.
  - \`onSearch\`: Called on every search input update.
        `,
      },
    },
  },
  render: () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryChange = (values: string[]) => {
      setSelectedCategories(values);
    };

    return (
      <Form>
        <Combobox className="gi-mx-auto">
          {/* Uncontrolled with default value */}
          <DropdownItem
            options={organisationOptions}
            defaultValue={['15431907-an-bord-pleanala']}
            onChange={(values: string[]) =>
              console.log('Uncontrolled Organisation Change:', values)
            }
            onSearch={(query) => console.log('Org Search:', query)}
          >
            Organisations (defaultValue)
          </DropdownItem>

          {/* Controlled */}
          <DropdownItem
            options={categoryOptions}
            value={selectedCategories}
            onChange={handleCategoryChange}
          >
            Categories (controlled)
          </DropdownItem>
        </Combobox>
      </Form>
    );
  },
};

const testOptions = [
  { label: 'Design', value: 'design' },
  { label: 'Development', value: 'development' },
  { label: 'Marketing', value: 'marketing' },
];

export const TestDefaultSelectedValues: StoryObj = {
  tags: ['skip-playwright'],
  render: () => (
    <Form>
      <Combobox className="gi-mx-auto">
        <DropdownItem options={testOptions} defaultValue={['design']}>
          Categories
        </DropdownItem>
      </Combobox>
    </Form>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('renders with default selected values', async () => {
      const categoriesGroupElement = canvas.getByRole('group', {
        name: /Categories dropdown/i,
      });
      const toggleButtonElement = within(categoriesGroupElement).getByRole(
        'button',
      );
      await userEvent.click(toggleButtonElement);

      const checkboxElement = within(categoriesGroupElement).getByLabelText(
        'Design',
      ) as HTMLInputElement;
      expect(checkboxElement.checked).toBe(true);
    });
  },
};

export const TestUncontrolledOnChange: StoryObj = {
  tags: ['skip-playwright'],
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    return (
      <Form>
        <Combobox className="gi-mx-auto">
          <div
            aria-live="polite"
            data-testid="selected-values"
            className="gi-hidden"
          >
            {selectedValues.join(',')}
          </div>
          <DropdownItem
            options={testOptions}
            defaultValue={[]}
            onChange={(values: string[]) => {
              setSelectedValues([...values]);
            }}
          >
            Categories
          </DropdownItem>
        </Combobox>
      </Form>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'fires onChange when checkbox is clicked (uncontrolled)',
      async () => {
        const categoriesGroupElement = canvas.getByRole('group', {
          name: /Categories dropdown/i,
        });
        const toggleButtonElement = within(categoriesGroupElement).getByRole(
          'button',
        );
        await userEvent.click(toggleButtonElement);

        const developmentCheckboxElement = within(
          categoriesGroupElement,
        ).getByLabelText('Development');
        await userEvent.click(developmentCheckboxElement);

        const outputElement = canvas.getByTestId('selected-values');
        expect(outputElement).toHaveTextContent('development');
      },
    );
  },
};

export const TestOnSearchCallback: StoryObj = {
  tags: ['skip-playwright'],
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    return (
      <Form>
        <Combobox className="gi-mx-auto">
          <div
            aria-live="polite"
            data-testid="search-value"
            className="gi-hidden"
          >
            {searchValue}
          </div>
          <DropdownItem
            options={testOptions}
            defaultValue={[]}
            onChange={() => {}}
            onSearch={(query: string) => {
              setSearchValue(query);
            }}
          >
            Categories
          </DropdownItem>
        </Combobox>
      </Form>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('calls onSearch callback when typing in search', async () => {
      const categoriesGroupElement = canvas.getByRole('group', {
        name: /Categories dropdown/i,
      });
      const toggleButtonElement = within(categoriesGroupElement).getByRole(
        'button',
      );
      await userEvent.click(toggleButtonElement);

      const searchInputElement = within(
        categoriesGroupElement,
      ).getByPlaceholderText('Search');
      await userEvent.clear(searchInputElement);
      await userEvent.type(searchInputElement, 'Des');

      const outputElement = canvas.getByTestId('search-value');
      expect(outputElement).toHaveTextContent('Des');
    });
  },
};

export const TestDefault: StoryObj = {
  tags: ['skip-playwright'],
  render: () => (
    <Form>
      <Combobox className="gi-mx-auto">
        <DropdownItem options={organisationOptions}>Organisations</DropdownItem>
        <DropdownItem options={categoryOptions}>Categories</DropdownItem>
        <DropdownItem options={topicOptions} noSearch>
          Topic (without search)
        </DropdownItem>
      </Combobox>
    </Form>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('renders with title and options', async () => {
      const categoriesGroupElement = canvas.getByRole('group', {
        name: /Categories dropdown/i,
      });
      expect(categoriesGroupElement).toBeInTheDocument();
      expect(canvas.getByText('Categories')).toBeInTheDocument();
    });

    await step('toggles open and closed on button click', async () => {
      const categoriesGroupElement = canvas.getByRole('group', {
        name: /Categories dropdown/i,
      });
      const categoriesToggleButtonElement = within(
        categoriesGroupElement,
      ).getByRole('button');
      await userEvent.click(categoriesToggleButtonElement);
      expect(
        within(categoriesGroupElement).getByPlaceholderText('Search'),
      ).toBeInTheDocument();

      await userEvent.click(categoriesToggleButtonElement);
      const searchInputMaybe = within(
        categoriesGroupElement,
      ).queryByPlaceholderText('Search');
      expect(searchInputMaybe).not.toBeVisible();
    });

    await step('shows no results when search yields none', async () => {
      const categoriesGroupElement = canvas.getByRole('group', {
        name: /Categories dropdown/i,
      });
      const categoriesToggleButtonElement = within(
        categoriesGroupElement,
      ).getByRole('button');
      await userEvent.click(categoriesToggleButtonElement);

      const searchInputElement = within(
        categoriesGroupElement,
      ).getByPlaceholderText('Search');
      await userEvent.clear(searchInputElement);
      await userEvent.type(searchInputElement, 'abcd');

      expect(
        within(categoriesGroupElement).getByText('No results found.'),
      ).toBeInTheDocument();
    });

    await step('disables search when noSearch is true', async () => {
      const topicGroupElement = canvas.getByRole('group', {
        name: /Topic \(without search\) dropdown/i,
      });
      const topicToggleButtonElement =
        within(topicGroupElement).getByRole('button');
      await userEvent.click(topicToggleButtonElement);
      expect(
        within(topicGroupElement).queryByPlaceholderText('Search'),
      ).not.toBeInTheDocument();
    });
  },
};
