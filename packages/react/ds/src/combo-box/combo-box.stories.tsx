import { Meta, StoryObj } from '@storybook/react';
import { organisationOptions, categoryOptions, topicOptions } from './combo-box.content.js';
import { Combobox } from './combo-box.js';

const meta = {
  title: 'Navigation/ComboBox',
  parameters: {
    description: {
      component: 'Use this component to search through a list of options',
    },
  },
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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
  },
};
