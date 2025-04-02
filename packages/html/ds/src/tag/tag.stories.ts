import type { Meta, StoryObj } from '@storybook/react';
import { createTag } from '../helpers/typography';
import { beautifyHtmlNode } from '../storybook/storybook';
import { TagProps } from './types';

const meta: Meta<TagProps> = {
  title: 'Typography/Tag',
};

export default meta;
type Story = StoryObj<TagProps>;

const createElement = (arguments_: TagProps) => {
  const component = createTag(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    text: 'Completed',
    type: 'info',
  },
  render: (arguments_) => createElement(arguments_),
};

export const Success: Story = {
  args: {
    text: 'Completed',
    type: 'success',
  },
  render: (arguments_) => createElement(arguments_),
};

export const Warning: Story = {
  args: {
    text: 'Completed',
    type: 'warning',
  },
  render: (arguments_) => createElement(arguments_),
};

export const Error: Story = {
  args: {
    text: 'Completed',
    type: 'error',
  },
  render: (arguments_) => createElement(arguments_),
};

export const CounterWarning: Story = {
  args: {
    text: '3',
    type: 'counterWarning',
  },
  render: (arguments_) => createElement(arguments_),
};

export const Counter: Story = {
  args: {
    text: '3',
    type: 'counter',
  },
  render: (arguments_) => createElement(arguments_),
};
