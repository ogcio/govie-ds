import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
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
    dataTestid: 'list',
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByTestId('list');
    expect(heading).toHaveClass('gi-list');
  },
};

export const Links: Story = {
  args: {
    dataTestid: 'list',
    items: [
      <Link href="#">Link 1</Link>,
      <Link href="#">Link 2</Link>,
      <Link href="#">Link 3</Link>,
    ],
  },
};

export const Bullet: Story = {
  args: {
    dataTestid: 'list',
    type: ListTypeEnum.Bullet,
    items: ['apple', 'orange', 'pears'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByTestId('list');
    expect(heading).toHaveClass('gi-list-bullet');
  },
};

export const Numbered: Story = {
  args: {
    dataTestid: 'list',
    type: ListTypeEnum.Number,
    items: ['Delivery address', 'Payment', 'Confirmation'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByTestId('list');
    expect(heading).toHaveClass('gi-list-number');
  },
};

export const ExtraSpace: Story = {
  args: {
    dataTestid: 'list',
    type: ListTypeEnum.Number,
    spaced: true,
    items: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
      'Curabitur ac felis arcu. Sed vehicula risus nec ligula tempor, vel euismod augue consectetur.',
      'Fusce tincidunt mi ac augue ultricies, id cursus libero dapibus. Phasellus a urna eget justo.',
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByTestId('list');
    expect(heading).toHaveClass('gi-list-spaced');
  },
};
