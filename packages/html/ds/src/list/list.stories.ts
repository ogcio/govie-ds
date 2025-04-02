import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ListProps } from './types';

const meta: Meta<ListProps> = {
  title: 'Typography/List',
};

export default meta;
type Story = StoryObj<ListProps>;

const createList = (arguments_: ListProps) => {
  const container = document.createElement('div');

  let classType = '';
  if (arguments_.type == 'bullet') {
    classType = 'gi-list-bullet';
  } else if (arguments_.type == 'number') {
    classType = 'gi-list-number';
  } else {
    classType = 'gi-list';
  }

  if (arguments_.spaced) {
    classType += ' gi-list-spaced';
  }

  const component = document.createElement('ul');
  component.className = classType;
  component.dataset.element = 'list-container';
  component.dataset.testid = 'list';

  for (const item of arguments_.items) {
    const li = document.createElement('li');
    li.innerHTML = item;

    component.append(li);
  }

  container.append(component);

  return beautifyHtmlNode(container);
};

export const Default: Story = {
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
      "<a href='#' class='gi-link'>Link 1</a>",
      "<a href='#' class='gi-link'>Link 2</a>",
      "<a href='#' class='gi-link'>Link 3</a>",
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
