import { Meta } from '@storybook/react';
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
      control: 'array', // `children` is expected to be an array of React elements
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
      control: 'radio', // Control type set to radio, allowing for default or small options
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
