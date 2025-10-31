import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, within } from 'storybook/test';
import { createRadio } from '../helpers/forms';
import type { RadioProps } from './types';

const meta: Meta<RadioProps> = {
  title: 'form/Radio/InputRadio',
  parameters: {
    docs: {
      description: {
        component:
          'Radio group component when users can only select one option.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RadioProps>;

const createElement = (arguments_: RadioProps) => {
  const component = createRadio(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  args: {
    value: 'radio-value',
    label: 'Radio',
  },
  render: (arguments_) => createElement(arguments_),
};

export const Hover: Story = {
  args: {
    id: 'radio-id-1',
    value: 'value-1',
    label: 'Radio',
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createElement(arguments_),
};

export const Focus: Story = {
  args: {
    id: 'radio-id-1',
    value: 'value-1',
    label: 'Radio',
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createElement(arguments_),
};

export const Disabled: Story = {
  args: {
    id: 'radio-id-1',
    value: 'value-1',
    label: 'Radio',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const withHint: Story = {
  args: {
    id: 'radio-id-1',
    value: 'value-1',
    label: 'Radio',
    hint: 'This is a hint',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hint = canvas.getByText('This is a hint');
    expect(hint).toBeDefined();
  },
};

export const withDefaultChecked: Story = {
  args: {
    id: 'radio-id-1',
    value: 'value-1',
    label: 'Radio',
    checked: true,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('radio');
    expect(input).toBeChecked();
  },
};

export const smallRadio: Story = {
  args: {
    id: 'radio-id-1',
    value: 'value-1',
    label: 'Radio',
    size: 'sm',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('radio');
    expect(input).toHaveClass('gi-w-6');
  },
};

export const mediumRadio: Story = {
  args: {
    id: 'radio-id-1',
    value: 'value-1',
    label: 'Radio',
    size: 'md',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('radio');
    expect(input).toHaveClass('gi-w-8');
  },
};
