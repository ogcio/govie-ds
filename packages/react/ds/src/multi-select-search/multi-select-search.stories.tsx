import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button.js';
import { MultiSelectSearch } from './multi-select-search.js';

const meta = {
  title: 'Navigation/MultiSelectSearch',
  parameters: {
    description: {
      component: 'ToDO',
    },
  },
  component: MultiSelectSearch,
} satisfies Meta<typeof MultiSelectSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: '#',
    dropdownItems: [
      {
       
        label: 'Label 1',
        options: [
          {
            label: 'Checkbox 1',
            value: 'checkbox-1',
          },
          {
            label: 'Checkbox 2',
            value: 'checkbox-2',
          },
          {
            label: 'Checkbox 3',
            value: 'checkbox-3',
          },
        ],
      },
      {

        label: 'Label 2',
        options: [
          {
            label: 'Checkbox 3',
            value: 'checkbox-3',
          },
          {
            label: 'Checkbox 4',
            value: 'checkbox-4',
          },
          {
            label: 'Checkbox 5',
            value: 'checkbox-5',
          },
        ],
      },
      {
       
        label: 'Label 3',
        options: [
          {
            label: 'Checkbox 6',
            value: 'checkbox-6',
          },
          {
            label: 'Checkbox 7',
            value: 'checkbox-7',
          },
          {
            label: 'Checkbox 8',
            value: 'checkbox-8',
          },
        ],
      },
    ],
    submitButton: <Button>Submit</Button>,
  },
};
