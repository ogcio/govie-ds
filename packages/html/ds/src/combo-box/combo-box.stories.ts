import type { Meta, StoryObj } from '@storybook/react';
import {
  organisationOptions,
  categoryOptions,
  topicOptions,
} from '../../../../react/ds/src/combo-box/combo-box.content';
import { renderComponent } from '../storybook/storybook';
import html from './combo-box.html?raw';
import { ComboBoxProps } from './combo-box.schema';

const path = import.meta.url.split('/combo-box')[0];

const macro = { name: 'govieComboBox', html, path };

const ComboBox = renderComponent<ComboBoxProps>(macro);

const meta = {
  component: ComboBox,
  title: 'Navigation/ComboBox',
  parameters: {
    macro,
  },
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    action: {
      control: 'text',
      description:
        'The URL or function ( Server Actions ) for which the combobox is being submitted to',
      table: {
        category: 'Combobox',
      },
    },
    method: {
      control: 'select',
      options: ['get', 'post'],
      description: 'The type of request for the submission',
      table: {
        category: 'Combobox',
      },
    },
    id: {
      control: 'text',
      description: 'The id of the combobox',
      table: {
        category: 'Combobox',
      },
    },
    dropdownItems: {
      control: 'object',
      description: 'Array of dropdown items',
      table: {
        category: 'Combobox',
        type: {
          detail:
            'label: string;\nnoSearch: boolean;\noptions: {\n label: string; \n value: string; \n}[]',
        },
      },
      type: {
        name: 'object',
        value: {
          label: {
            name: 'string',
          },
          options: {
            name: 'object',
            value: {
              label: {
                name: 'string',
              },
              value: {
                name: 'string',
              },
            },
          },
          noSearch: {
            name: 'boolean',
          },
        },
      },
    },
  },
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
        label: 'Topic (without search)',
        options: topicOptions,
        noSearch: true,
      },
    ],
    className: 'gi-mx-auto',
  },
};
