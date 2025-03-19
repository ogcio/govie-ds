import type { Meta, StoryObj } from '@storybook/react';
import { beautifyHtmlNode } from '../storybook/storybook';
import { TagProps } from './types';

const meta: Meta<TagProps> = {
  title: 'Typography/Tag',
};

export default meta;
type Story = StoryObj<TagProps>;

const createTag = (arguments_: TagProps) => {
  const tagClasses = {
    default: 'gi-tag-default',
    info: 'gi-tag-info',
    success: 'gi-tag-success',
    warning: 'gi-tag-warning',
    error: 'gi-tag-error',
    counter: 'gi-tag-counter',
    counterWarning: 'gi-tag-counter-warning',
  };
  const tag = document.createElement('strong');
  tag.className = `gi-tag ${tagClasses[arguments_.type || 'info']}`;
  tag.textContent = arguments_.text;
  return tag;
};

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
