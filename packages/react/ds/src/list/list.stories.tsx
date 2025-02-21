import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../link/link.js';
import { List, ListTypeEnum } from './list.js';

const meta = {
  title: 'typography/List',
  parameters: {
    docs: {
      description: {
        component:
          'Use lists to make blocks of text easier to read, and to break information into manageable chunks.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      type: { name: 'string', required: true },
      description: 'List of texts to be displayed',
      defaultValue: ['Item 1', 'Item 2', 'Item 3'],
    },
    type: {
      options: [ListTypeEnum.None, ListTypeEnum.Bullet, ListTypeEnum.Number],
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
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
};

export const Links: Story = {
  args: {
    items: [
      <Link href="#">link 1</Link>,
      <Link href="#">link 2</Link>,
      <Link href="#">link 3</Link>,
    ],
  },
};

export const Bullet: Story = {
  args: {
    type: ListTypeEnum.Bullet,
    items: ['apple', 'orange', 'pears'],
  },
};

export const Numbered: Story = {
  args: {
    type: ListTypeEnum.Number,
    items: ['Delivery address', 'Payment', 'Confirmation'],
  },
};

export const ExtraSpace: Story = {
  args: {
    type: ListTypeEnum.Number,
    spaced: true,
    items: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
      'Curabitur ac felis arcu. Sed vehicula risus nec ligula tempor, vel euismod augue consectetur.',
      'Fusce tincidunt mi ac augue ultricies, id cursus libero dapibus. Phasellus a urna eget justo.',
    ],
  },
};
