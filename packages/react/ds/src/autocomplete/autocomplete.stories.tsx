import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../forms/form-field.js';
import { Autocomplete, AutocompleteItem } from './autocomplete.js';
import { AutocompleteProps } from './types.js';

const meta = {
  title: 'Form/Autocomplete',
  parameters: {
    docs: {
      description: {
        component:
          'Autocomplete component for selecting a value from a filtered list of options.',
      },
    },
  },
  component: Autocomplete,
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props: AutocompleteProps) => {
    return (
      <FormField label={{ text: 'Label' }} className="gi-w-56">
        <Autocomplete {...props}>
          <AutocompleteItem value="app">Apple</AutocompleteItem>
          <AutocompleteItem value="banana">Banana</AutocompleteItem>
          <AutocompleteItem value="cherry" disabled>
            Cherry
          </AutocompleteItem>
          <AutocompleteItem value="date">Date</AutocompleteItem>
        </Autocomplete>
      </FormField>
    );
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the autocomplete input.',
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value.',
    },
    onChange: {
      action: 'changed',
      description: 'Callback triggered when an option is selected.',
    },
  },
  args: {
    defaultValue: '',
    children: [],
  },
};
