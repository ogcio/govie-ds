import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createFormField, createHintText } from '../helpers/forms';
import { LabelSize } from '../label/types';
import { beautifyHtmlNode } from '../storybook/storybook';
import { TextAreaProps } from './types';

const meta: Meta<TextAreaProps> = {
  title: 'Form/Textarea',
};

export default meta;
type Story = StoryObj<TextAreaProps>;

const createElement = (arguments_: TextAreaProps) => {
  const formField = createFormField(arguments_);

  const container = document.createElement('div');
  container.className =
    `${arguments_.className || ''} gi-textarea-container`.trim();

  const textarea = document.createElement('textarea');
  textarea.dataset.module = 'gieds-textarea';

  textarea.className =
    `gi-textarea ${arguments_.halfFluid === true ? 'gi-input-half-width' : ''}`.trim();

  if (arguments_.name) {
    textarea.name = arguments_.name;
  }
  if (arguments_.id) {
    textarea.id = arguments_.id;
  }
  if (arguments_.placeholder) {
    textarea.placeholder = arguments_.placeholder;
  }
  if (arguments_.dataTestId) {
    textarea.dataset.testid = arguments_.dataTestId;
  }
  if (arguments_.disabled) {
    textarea.disabled = true;
  }
  if (arguments_.maxChars) {
    textarea.maxLength = arguments_.maxChars;
  }
  if (arguments_.rows) {
    textarea.rows = arguments_.rows;
  }
  if (arguments_.cols) {
    textarea.cols = arguments_.cols;
  }

  container.append(textarea);

  formField.append(container);

  if (arguments_.maxChars) {
    const remainingChars = document.createElement('div');
    remainingChars.className = 'gi-textarea-remaining-chars';
    remainingChars.dataset['remainingcharscontainer'] = textarea.id;

    const remainingCharsHint = createHintText({
      content: `You have ${arguments_.maxChars} characters remaining`,
    });

    remainingChars.append(remainingCharsHint);
    formField.append(remainingChars);
  }

  return beautifyHtmlNode(formField);
};

export const Default: Story = {
  argTypes: {
    label: {
      description: 'Label associated with the textarea.',
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
    id: {
      description: 'Sets the unique ID for the input field.',
      control: 'text',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'input-id' },
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
    rows: {
      description: 'The number of visible text lines in the textarea.',
      control: 'number',
      table: {
        category: 'Size Control',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    cols: {
      description: 'The width of the textarea in terms of characters.',
      control: 'number',
      table: {
        category: 'Size Control',
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    autoComplete: {
      description:
        'Specifies whether the browser should provide auto-completion options for the textarea.',
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
        defaultValue: { summary: 'on' },
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
      htmlFor: 'input-id',
      size: LabelSize.Medium,
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithLabelAndHint: Story = {
  args: {
    label: {
      content: 'Label',
      htmlFor: 'label-hint-input',
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
      htmlFor: 'label-hint-input',
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
      htmlFor: 'error-input',
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
    expect(globalThis.window.getComputedStyle(textInput).borderColor).toBe(
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

export const InputLength: Story = {
  args: {
    label: {
      content: 'Label',
      htmlFor: 'character-width-input',
      size: LabelSize.Medium,
    },
    maxLength: 20,
    id: 'character-width-input',
  },
  render: (arguments_) => createElement(arguments_),
};

export const DisabledInput: Story = {
  args: {
    label: {
      content: 'Label',
      htmlFor: 'text-input-id',
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
    id: 'text-input-id',
    label: {
      content: 'Label',
      htmlFor: 'text-input-id',
      size: LabelSize.Medium,
    },
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

export const CustomRowsAndColumns: Story = {
  args: {
    label: {
      content: 'Textarea Label',
      htmlFor: 'custom-size-textarea',
      size: 'md',
    },
    rows: 6,
    cols: 40,
    id: 'custom-size-textarea',
    dataTestId: 'text-input-id',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textInput = canvas.getByTestId('text-input-id') as HTMLInputElement;
    expect(textInput.getAttribute('cols')).toBe('40');
    expect(textInput.getAttribute('rows')).toBe('6');
  },
};

export const WithMaxChars: Story = {
  args: {
    label: {
      content: 'Textarea Label',
      htmlFor: 'textarea-id-5',
      size: 'md',
    },
    hint: {
      content: 'Hint text for textarea',
    },
    maxChars: 30,
    id: 'textarea-id-5',
    dataTestId: 'textarea-id-5',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textareaElement = canvas.getByRole('textbox');
    expect(textareaElement.getAttribute('maxlength')).toBe('30');

    const remainingElement = canvas.getByText(
      'You have 30 characters remaining',
    );
    expect(remainingElement).toBeInTheDocument();
  },
};
