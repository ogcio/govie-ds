import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createCheckbox } from '../helpers/forms';
import { beautifyHtmlNode } from '../storybook/storybook';
import { CheckboxSizeEnum, type CheckboxProps } from './types';

const meta: Meta<CheckboxProps> = {
  title: 'form/Checkbox/Checkbox',
};

export default meta;
type Story = StoryObj<CheckboxProps>;

const createElement = (arguments_: CheckboxProps) => {
  const component = createCheckbox(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  argTypes: {
    id: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'the unique value for the checkbox component',
    },
    value: {
      control: 'text',
      type: 'string',
      description: 'The value of the Component',
    },
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm'],
      description: 'The sizes for the Checkbox',
    },
    label: {
      control: 'text',
      type: 'string',
      description: 'The label associated with the Checkbox',
    },
    hint: {
      control: 'text',
      type: 'string',
      description:
        'Additional text to inform the user about the Checkbox component',
    },
    disabled: {
      control: 'boolean',
      description: 'if true the component is disabled',
    },
  },
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
  },
  render: (arguments_) => createElement(arguments_),
};

export const Hover: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createElement(arguments_),
};

export const Focus: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createElement(arguments_),
};

export const Disabled: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const withHint: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
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
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    checked: true,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');
    expect(input).toBeChecked();
  },
};

export const smallCheckbox: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    size: CheckboxSizeEnum.Small,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');
    expect(input).toHaveClass('gi-h-6');
  },
};

export const mediumCheckbox: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    size: CheckboxSizeEnum.Medium,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');
    expect(input).toHaveClass('gi-h-8');
  },
};

export const largeCheckbox: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    size: CheckboxSizeEnum.Large,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');
    expect(input).toHaveClass('gi-h-11');
  },
};
