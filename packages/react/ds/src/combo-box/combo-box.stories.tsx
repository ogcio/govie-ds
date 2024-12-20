import { Meta } from '@storybook/react';
import { Form } from '../common/form.js';
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
