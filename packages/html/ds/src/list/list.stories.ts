import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './list.html?raw';
import { TypeEnum, ListProps } from './list.schema';

const macro = { name: 'govieList', html };

const List = renderComponent<ListProps>(macro);

const meta = {
  component: List,
  title: 'Typography/List',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'Use lists to make blocks of text easier to read, and to break information into manageable chunks.',
      },
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    items: {
      control: 'object',
      type: { name: 'string', required: true },
      description: 'List of texts to be displayed',
      defaultValue: ['Item 1', 'Item 2', 'Item 3'],
    },
    type: {
      options: ['normal', TypeEnum.Bullet, TypeEnum.Number],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'normal' },
      },
      description:
        '`bullet`: Introduce bulleted lists with a lead-in line ending in a colon.<br>`number`: Use numbered lists instead of bulleted lists when the order of the items is relevant.',
    },
    spaced: {
      control: 'boolean',
      description:
        'If a list is hard to read because the items run across multiple lines you can add extra spacing.',
    },
  },
  args: {
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
};

export const Links: Story = {
  args: {
    items: [
      {
        href: '#',
        label: 'Link 1',
      },
      {
        href: '#',
        label: 'Link 2',
      },
      {
        href: '#',
        label: 'Link 3',
      },
    ],
  },
};

export const Bullet: Story = {
  args: {
    type: TypeEnum.Bullet,
    items: ['apple', 'orange', 'pears'],
  },
};

export const Numbered: Story = {
  args: {
    type: TypeEnum.Number,
    items: ['Delivery address', 'Payment', 'Confirmation'],
  },
};

export const ExtraSpace: Story = {
  args: {
    type: TypeEnum.Number,
    spaced: true,
    items: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
      'Curabitur ac felis arcu. Sed vehicula risus nec ligula tempor, vel euismod augue consectetur.',
      'Fusce tincidunt mi ac augue ultricies, id cursus libero dapibus. Phasellus a urna eget justo.',
    ],
  },
};
