import { Meta } from '@storybook/react';
import { useState } from 'react';
import { Form } from '../forms/form.js';
import {
  organisationOptions,
  categoryOptions,
  topicOptions,
} from './combo-box.content.js';
import { Combobox } from './combo-box.js';
import { DropdownItem } from './dropdown-item.js';

const meta = {
  title: 'Navigation/ComboBox',
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

export const Default = {
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
    variant: {
      control: 'radio',
      options: ['default', 'small'],
      description:
        'Defines the padding and style for the Accordion (default or small)',
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
      console.log('Controlled Category Change:', values);
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
