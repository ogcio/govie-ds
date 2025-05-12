import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createTextInput } from '../helpers/forms';
import { LabelSize } from '../label/types';
import { beautifyHtmlNode } from '../storybook/storybook';
import { TextInputProps } from './types';

const meta: Meta<TextInputProps> = {
  title: 'Form/InputText',
  parameters: {
    docs: {
      description: {
        component:
          'Use the InputText component for single-line text inputs like names or phone numbers. You can control the width using the `halfFluid`, `fullFluid`, or `characterWidth` properties.',
      },
    },
  },
  argTypes: {
    prefix: {
      description:
        'Element or text to display on the left side of the input, such as a unit or symbol.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    suffix: {
      description:
        'Element or text to display on the right side of the input, such as a unit or symbol.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    iconStart: {
      description: 'Optional icon displayed at the start of the input field.',
      control: 'text',
      table: {
        category: 'Visual',
        type: { summary: 'IconId' },
      },
    },
    iconEnd: {
      description: 'Optional icon displayed at the end of the input field.',
      control: 'text',
      table: {
        category: 'Visual',
        type: { summary: 'IconId' },
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
  },
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
      htmlFor: 'input-id',
      size: LabelSize.Medium,
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const Focus: Story = {
  args: {
    id: 'input-id-focus',
    inputClassName: 'focus-input',
    label: {
      content: 'Label',
      htmlFor: 'input-id-focus',
      size: LabelSize.Medium,
    },
  },
  render: (props) => createElement(props),
  parameters: {
    pseudo: {
      focus: '.focus-input',
    },
  },
};

export const Disabled: Story = {
  args: {
    id: 'input-id-disabled',
    disabled: true,
    label: {
      content: 'Label',
      htmlFor: 'input-id-disabled',
      size: LabelSize.Medium,
    },
  },
  render: (props) => createElement(props),
};

export const WithLabelAndHint: Story = {
  args: {
    label: {
      content: 'Label',
      htmlFor: 'label-hint-input',
      size: LabelSize.Medium,
    },
    hint: {
      content: 'Hint: This is a helpful hint.',
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

export const WithLabelAndPrefixSuffix: Story = {
  args: {
    label: {
      content: 'Label',
      htmlFor: 'suffix-input',
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
      htmlFor: 'character-width-input',
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
      htmlFor: 'text-input-id',
      size: LabelSize.Medium,
    },
    id: 'text-input-id',
    type: 'date',
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithHalfWidth: Story = {
  args: {
    label: {
      content: 'Label',
      htmlFor: 'input-id',
      size: LabelSize.Medium,
    },
    id: 'input-id',
    halfFluid: true,
    dataTestId: 'text-input-id',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textInput = canvas.getByTestId('text-input-id') as HTMLInputElement;

    const halfWidthWrapper = textInput.closest('.gi-input-text-inner');
    expect(halfWidthWrapper).toHaveClass('gi-input-half-width');
  },
};

export const InputWithCustomActionButton: Story = {
  args: {
    label: {
      content: 'Label',
    },
    id: 'text-action',
    placeholder: 'Placeholder',
    inputActionButton: {
      icon: {
        icon: 'info',
      },
    },
  },
  render: (props) => createElement(props),
};

export const InputWithIcons: Story = {
  args: {
    label: { content: 'Label' },
    iconStart: 'person',
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => createElement(props),
};

export const InputWithIconsDisabled: Story = {
  args: {
    label: { content: 'Label' },
    disabled: true,
    iconStart: 'person',
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => createElement(props),
};

export const InputWithIconsFocus: Story = {
  args: {
    label: { content: 'Label' },
    inputClassName: 'focus-input',
    iconStart: 'person',
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => createElement(props),
  parameters: {
    pseudo: { focus: '.focus-input' },
  },
};

export const InputWithPrefixSuffix: Story = {
  args: {
    label: { content: 'Label' },
    prefix: '€',
    suffix: 'kg',
    iconStart: 'person',
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => createElement(props),
};

export const InputWithPrefixSuffixError: Story = {
  args: {
    label: { content: 'Label' },
    error: { content: 'Invalid' },
    prefix: '€',
    suffix: 'kg',
    iconStart: 'person',
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => createElement(props),
};

export const InputWithPrefixSuffixDisabled: Story = {
  args: {
    label: { content: 'Label' },
    disabled: true,
    prefix: '€',
    suffix: 'kg',
    iconStart: 'person',
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => createElement(props),
};

export const InputWithPrefixSuffixFocus: Story = {
  args: {
    label: { content: 'Label' },
    inputClassName: 'focus-input',
    prefix: '€',
    suffix: 'kg',
    iconStart: 'person',
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => createElement(props),
  parameters: {
    pseudo: { focus: '.focus-input' },
  },
};

export const InputWithIconStartOnly: Story = {
  args: {
    label: { content: 'Label' },
    iconStart: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => createElement(props),
};

export const InputWithIconEndOnly: Story = {
  args: {
    label: { content: 'Label' },
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => createElement(props),
};
