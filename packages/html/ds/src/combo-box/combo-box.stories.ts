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
