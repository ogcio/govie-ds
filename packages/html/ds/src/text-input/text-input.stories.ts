import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { LabelSize } from '../label/label.schema';
import { beautifyHtmlNode, createFormField } from '../storybook/storybook';
import { TextInputProps } from './text-input.schema';

const meta: Meta<TextInputProps> = {
  title: 'Form/TextInput',
};

export default meta;
type Story = StoryObj<TextInputProps>;

const createTextInput = (arguments_: TextInputProps) => {
  const formField = createFormField(arguments_);

  const container = document.createElement('div');
  container.className =
    `${arguments_.className || ''} gi-text-input-container`.trim();

  if (arguments_.prefix) {
    const prefix = document.createElement('div');
    prefix.className = 'gi-text-input-prefix';
    prefix.textContent = arguments_.prefix;
    container.append(prefix);
  }

  const input = document.createElement('input') as HTMLInputElement;
  input.type = arguments_.type || 'text';
  input.className =
    `gi-text-input ${arguments_.halfFluid === true ? 'gi-input-half-width' : ''}`.trim();

  if (arguments_.id) {
    input.id = arguments_.id;
  }
  if (arguments_.placeholder) {
    input.placeholder = arguments_.placeholder;
  }
  if (arguments_.dataTestId) {
    input.dataset.testid = arguments_.dataTestId;
  }
  if (arguments_.disabled) {
    input.disabled = true;
  }

  container.append(input);

  if (arguments_.suffix) {
    const suffix = document.createElement('div');
    suffix.className = 'gi-text-input-suffix';
    suffix.textContent = arguments_.suffix;
    container.append(suffix);
  }

  formField.append(container);

  return beautifyHtmlNode(formField);
};

export const Default: Story = {
  argTypes: {
    label: {
      description: 'Label associated with the input.',
      control: 'object',
      table: {
        category: 'Label',
        type: { summary: 'Label' },
      },
    },
    hint: {
      description: 'Hint text for the input to provide additional information.',
      control: 'object',
      table: {
        category: 'Hint',
        type: { summary: 'HintText' },
      },
    },
    error: {
      description:
        'Error message for the input, displayed when there is a validation error.',
      control: 'object',
      table: {
        category: 'Error',
        type: { summary: 'ErrorText' },
      },
    },
    prefix: {
      description:
        'Element or text to display on the left side of the input, such as a unit or symbol.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    suffix: {
      description:
        'Element or text to display on the right side of the input, such as a unit or symbol.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    id: {
      description: 'Sets the unique ID for the input field.',
      control: 'text',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'input-id' },
      },
    },
    type: {
      control: 'select',
      description: 'Specifies the input type.',
      options: [
        'text',
        'date',
        'datetime-local',
        'email',
        'month',
        'number',
        'password',
        'tel',
        'time',
        'url',
        'week',
      ],
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    disabled: {
      description: 'Disable input',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'Behavior' },
      },
    },
    dataTestId: {
      description: 'Sets the unique ID for test.',
      control: 'text',
    },
  },
  args: {
    id: 'input-id',
    label: {
      content: 'Label',
      for: 'input-id',
      size: LabelSize.Medium,
    },
  },
  render: (arguments_) => createTextInput(arguments_),
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
  render: (arguments_) => createTextInput(arguments_),
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
  render: (arguments_) => createTextInput(arguments_),
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
  render: (arguments_) => createTextInput(arguments_),
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
  render: (arguments_) => createTextInput(arguments_),
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
  render: (arguments_) => createTextInput(arguments_),
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
  render: (arguments_) => createTextInput(arguments_),
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
  render: (arguments_) => createTextInput(arguments_),
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
  render: (arguments_) => createTextInput(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textInput = canvas.getByTestId('text-input-id') as HTMLInputElement;
    expect(textInput.parentElement).toHaveClass('gi-input-half-width');
  },
};
