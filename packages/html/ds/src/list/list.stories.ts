import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createLink } from '../helpers/links';
import { createList } from '../helpers/list';
import { beautifyHtmlNode } from '../storybook/storybook';

import { ListProps } from './types';

const meta: Meta<ListProps> = {
  title: 'Typography/List',
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
      options: ['normal', 'bullet', 'number'],
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
};

export default meta;
type Story = StoryObj<ListProps>;

export const Default: Story = {
  args: {
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
  render: (arguments_) => createList(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByTestId('list');
    expect(heading).toHaveClass('gi-list');
  },
};

export const Links: Story = {
  args: {
    items: [
      beautifyHtmlNode(
        createLink({
          content: 'Link 1',
          href: '#',
        }),
      ),
      beautifyHtmlNode(
        createLink({
          content: 'Link 2',
          href: '#',
        }),
      ),
      beautifyHtmlNode(
        createLink({
          content: 'Link 3',
          href: '#',
        }),
      ),
    ],
  },
  render: (arguments_) => createList(arguments_),
};

export const Bullet: Story = {
  args: {
    type: 'bullet',
    items: ['apple', 'orange', 'pears'],
  },
  render: (arguments_) => createList(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByTestId('list');
    expect(heading).toHaveClass('gi-list-bullet');
  },
};

export const Numbered: Story = {
  args: {
    type: 'number',
    items: ['Delivery address', 'Payment', 'Confirmation'],
  },
  render: (arguments_) => createList(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByTestId('list');
    expect(heading).toHaveClass('gi-list-number');
  },
};

export const ExtraSpace: Story = {
  args: {
    type: 'number',
    spaced: true,
    items: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
      'Curabitur ac felis arcu. Sed vehicula risus nec ligula tempor, vel euismod augue consectetur.',
      'Fusce tincidunt mi ac augue ultricies, id cursus libero dapibus. Phasellus a urna eget justo.',
    ],
  },
  render: (arguments_) => createList(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByTestId('list');
    expect(heading).toHaveClass('gi-list-spaced');
  },
};
