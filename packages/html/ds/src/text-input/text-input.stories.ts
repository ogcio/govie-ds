import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createTextInput } from '../helpers/forms';
import { LabelSize } from '../label/label.schema';
import { beautifyHtmlNode } from '../storybook/storybook';
import { TextInputProps } from './types';

const meta: Meta<TextInputProps> = {
  title: 'Form/TextInput',
};

export default meta;
type Story = StoryObj<TextInputProps>;

const createElement = (arguments_: TextInputProps) => {
  const component = createTextInput(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    id: 'input-id',
    label: {
      content: 'Label',
      for: 'input-id',
      size: LabelSize.Medium,
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithLabelAndHint: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'label-hint-input',
      size: LabelSize.Medium,
    },
    hint: {
      content: 'Hint',
    },
    id: 'label-hint-input',
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithLabelAndError: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'label-hint-input',
      size: LabelSize.Medium,
    },
    error: {
      content: 'Error: Please correct this issue.',
    },
    id: 'label-hint-input',
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithLabelHintAndError: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'error-input',
      size: LabelSize.Medium,
    },
    hint: {
      content: 'Hint: This is a helpful hint.',
    },
    error: {
      content: 'Error: Please correct this issue.',
    },
    id: 'error-input',
    dataTestId: 'text-input-id',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textInput = canvas.getByTestId('text-input-id') as HTMLInputElement;
    expect(window.getComputedStyle(textInput).borderColor).toBe(
      'rgb(187, 37, 13)',
    );

    const label = canvas.getByText('Label');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');
    expect(label.getAttribute('for')).toBe(textInput.getAttribute('id'));

    const hint = canvas.getByText('Hint: This is a helpful hint.');
    expect(hint).toBeTruthy();
    expect(hint).toHaveClass('gi-hint-text');

    const error = canvas.getByText('Error: Please correct this issue.');
    expect(error).toBeTruthy();
    expect(error).toHaveClass('gi-error-text');
  },
};

export const WithLabelAndPrefixSuffix: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'suffix-input',
      size: LabelSize.Medium,
    },
    prefix: 'KG',
    suffix: 'per item',
    id: 'suffix-input',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const prefixElement = canvas.getByText('KG');
    expect(prefixElement).toBeTruthy();
    expect(prefixElement.tagName).toBe('DIV');

    const suffixElement = canvas.getByText('per item');
    expect(suffixElement).toBeTruthy();
    expect(suffixElement.tagName).toBe('DIV');
  },
};

export const InputLength: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'character-width-input',
      size: LabelSize.Medium,
    },
    maxLength: 20,
    id: 'character-width-input',
  },
  render: (arguments_) => createElement(arguments_),
};

export const DateInput: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'text-input-id',
      size: LabelSize.Medium,
    },
    id: 'text-input-id',
    type: 'date',
  },
  render: (arguments_) => createElement(arguments_),
};

export const DisabledInput: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'text-input-id',
      size: LabelSize.Medium,
    },
    id: 'text-input-id',
    disabled: true,
    dataTestId: 'text-input-id',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textInput = canvas.getByTestId('text-input-id') as HTMLInputElement;
    expect(textInput).toBeDisabled();
  },
};

export const WithHalfWidth: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'input-id',
      size: LabelSize.Medium,
    },
    id: 'input-id',
    className: 'gi-input-half-width',
    dataTestId: 'text-input-id',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textInput = canvas.getByTestId('text-input-id') as HTMLInputElement;
    expect(textInput.parentElement).toHaveClass('gi-input-half-width');
  },
};
