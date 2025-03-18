import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createErrorText } from '../helpers/forms';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ErrorSize, ErrorTextProps } from './error-text.schema';

const meta: Meta<ErrorTextProps> = {
  title: 'Typography/ErrorText',
};

export default meta;
type Story = StoryObj<ErrorTextProps>;

const createElement = (arguments_: ErrorTextProps) => {
  const error = createErrorText(arguments_);
  return beautifyHtmlNode(error);
};

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
        type: { summary: 'Size of the error text' },
        defaultValue: { summary: 'md' },
      },
    },
    content: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'This is error text' },
      },
    },
  },
  args: {
    size: ErrorSize.Medium,
    content: 'This is error text',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const error = canvas.getByText('This is error text');
    expect(error).toHaveClass('gi-error-text-md');
  },
};

export const Large: Story = {
  args: {
    size: ErrorSize.Large,
    content: 'This is error text',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const error = canvas.getByText('This is error text');
    expect(error).toHaveClass('gi-error-text-lg');
  },
};

export const Small: Story = {
  args: {
    size: ErrorSize.Small,
    content: 'This is error text',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const error = canvas.getByText('This is error text');
    expect(error).toHaveClass('gi-error-text-sm');
  },
};
