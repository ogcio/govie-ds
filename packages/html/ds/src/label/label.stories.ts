import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createLabel } from '../helpers/forms';
import { beautifyHtmlNode } from '../storybook/storybook';
import { LabelProps, LabelSize } from './types';

const meta: Meta<LabelProps> = {
  title: 'Typography/Label',
};

export default meta;
type Story = StoryObj<LabelProps>;

const createElement = (arguments_: LabelProps) => {
  const label = createLabel(arguments_);
  return beautifyHtmlNode(label);
};

export const Default: Story = {
  argTypes: {
    content: {
      control: 'text',
      description: 'Text content of the label',
      type: { name: 'string', required: true },
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form input',
      type: { name: 'string', required: false },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Label size: small, medium, or large',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
  },
  args: {
    content: 'This is label text',
    size: 'md',
    htmlFor: 'input-id',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('This is label text');
    expect(label).toHaveClass('gi-text-md');
  },
};

export const Large: Story = {
  args: {
    size: LabelSize.Large,
    content: 'This is label text',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('This is label text');
    expect(label).toHaveClass('gi-text-lg');
  },
};

export const Small: Story = {
  args: {
    size: LabelSize.Small,
    content: 'This is label text',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('This is label text');
    expect(label).toHaveClass('gi-text-sm');
  },
};
