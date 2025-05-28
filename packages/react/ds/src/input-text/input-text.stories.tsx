import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { FormField } from '../forms/form-field.js';
import { InputText } from './input-text.js';

const meta = {
  title: 'Form/InputText',
  parameters: {
    docs: {
      description: {
        component:
          'Use the InputText component for single-line text inputs like names or phone numbers. You can control the width using the `halfFluid`, `fullFluid`, or `characterWidth` properties.',
      },
    },
  },
  component: InputText,
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
    inputActionButton: {
      description:
        'Optional action button rendered inside the input for custom actions.',
      control: false,
      table: {
        category: 'Behavior',
        type: {
          summary: `InputActionButtonProps`,
        },
      },
    },

    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLInputElement>' },
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
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    id: 'input-text-id',
  },
  render: (props) => (
    <FormField
      label={{
        text: 'Label',
        htmlFor: 'input-text-id',
      }}
    >
      <InputText {...props} data-testid="input-text-id" />
    </FormField>
  ),
};

export const Focus: Story = {
  render: () => (
    <FormField label={{ text: 'Label Focus', htmlFor: 'focus-input' }}>
      <InputText type="text" id="focus-input" inputClassName="focus-input" />
    </FormField>
  ),
  parameters: {
    pseudo: { focus: '.focus-input' },
  },
};

export const Disabled: Story = {
  args: {
    id: 'input-text-id',
    disabled: true,
  },
  render: (props) => {
    return (
      <FormField
        label={{
          text: 'Label',
          htmlFor: 'input-text-id',
        }}
      >
        <InputText {...props} />
      </FormField>
    );
  },
};

export const WithLabelAndHint: Story = {
  args: {
    id: 'input-text-id',
  },
  render: (props) => (
    <FormField
      label={{
        text: 'Label',
        htmlFor: 'input-text-id',
      }}
      hint={{
        text: 'Hint: This is a helpful hint.',
      }}
    >
      <InputText {...props} data-testid="input-text-id" />
    </FormField>
  ),
};

export const WithLabelAndError: Story = {
  args: {
    id: 'input-text-id',
  },
  render: (props) => (
    <FormField
      label={{
        text: 'Label',
        htmlFor: 'input-text-id',
      }}
      error={{
        text: 'Error: Please correct this issue.',
      }}
    >
      <InputText {...props} data-testid="input-text-id" />
    </FormField>
  ),
};

export const WithLabelHintAndError: Story = {
  args: {
    id: 'input-text-id',
    suffix: 'KG',
  },
  render: (props) => (
    <FormField
      label={{
        text: 'Label',
        htmlFor: 'input-text-id',
      }}
      hint={{
        text: 'Hint: This is a helpful hint.',
      }}
      error={{
        text: 'Error: Please correct this issue.',
      }}
    >
      <InputText {...props} data-testid="input-text-id" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textInput = canvas.getByTestId('input-text-id') as HTMLInputElement;
    expect(globalThis.window.getComputedStyle(textInput).borderColor).toBe(
      'rgb(187, 37, 13)', //'var(--gieds-color-red-600)',
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
    id: 'input-text-id',
    prefix: 'kg',
    suffix: 'per item',
  },
  render: (props) => (
    <FormField
      label={{
        text: 'Label',
        htmlFor: 'input-text-id',
      }}
    >
      <InputText {...props} data-testid="input-text-id" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const prefix = canvas.getByText('kg');
    expect(prefix).toBeTruthy();
    expect(prefix).toHaveClass('gi-input-text-prefix');

    const suffix = canvas.getByText('per item');
    expect(suffix).toBeTruthy();
    expect(suffix).toHaveClass('gi-input-text-suffix');
  },
};

export const InputLength: Story = {
  args: {
    id: 'input-text-id',
    maxLength: 4,
  },
  render: (props) => {
    return (
      <FormField
        label={{
          text: 'Label',
          htmlFor: 'input-text-id',
        }}
      >
        <InputText {...props} maxLength={4} />
      </FormField>
    );
  },
};

export const DateInput: Story = {
  args: {
    id: 'input-text-id',
    type: 'date',
  },
  render: (props) => {
    return (
      <FormField
        label={{
          text: 'Date input',
          htmlFor: 'input-text-id',
        }}
      >
        <InputText {...props} />
      </FormField>
    );
  },
};

export const WithHalfWidth: Story = {
  args: {
    id: 'input-text-id',
    halfFluid: true,
  },
  render: (props) => {
    return (
      <FormField
        label={{
          text: 'Label',
          htmlFor: 'input-text-id',
        }}
      >
        <InputText {...props} />
      </FormField>
    );
  },
};

export const InputWithCustomActionButton: Story = {
  render: () => (
    <FormField label={{ text: 'Label' }} hint={{ text: 'Support text' }}>
      <InputText
        inputActionButton={{
          icon: 'info',
          onClick: () => alert('Action button clicked'),
        }}
        type="text"
        placeholder="Placeholder"
      />
    </FormField>
  ),
};

export const InputWithIcons: Story = {
  render: () => (
    <FormField label={{ text: 'Label' }} hint={{ text: 'Support text' }}>
      <InputText
        iconStart="placeholder"
        iconEnd="placeholder"
        placeholder="Placeholder"
      />
    </FormField>
  ),
};

export const InputWithIconsDisabled: Story = {
  render: () => (
    <FormField label={{ text: 'Label' }}>
      <InputText
        disabled
        iconStart="placeholder"
        iconEnd="placeholder"
        placeholder="Placeholder"
      />
    </FormField>
  ),
};

export const InputWithIconsFocus: Story = {
  render: () => (
    <FormField label={{ text: 'Label', htmlFor: 'focus-input' }}>
      <InputText
        type="text"
        id="focus-input"
        inputClassName="focus-input"
        iconStart="placeholder"
        iconEnd="placeholder"
        placeholder="Placeholder"
      />
    </FormField>
  ),
  parameters: {
    pseudo: { focus: '.focus-input' },
  },
};

export const InputWithPrefixSuffix: Story = {
  args: {
    prefix: '€',
    suffix: 'kg',
    iconStart: 'person',
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => (
    <FormField label={{ text: 'Label' }}>
      <InputText
        type="text"
        iconStart="placeholder"
        iconEnd="placeholder"
        placeholder="Placeholder"
        {...props}
      />
    </FormField>
  ),
};

export const InputWithPrefixSuffixError: Story = {
  render: () => (
    <FormField
      label={{ text: 'Label' }}
      hint={{ text: 'Support text' }}
      error={{ text: 'Invalid' }}
    >
      <InputText
        iconStart="placeholder"
        iconEnd="placeholder"
        placeholder="Placeholder"
        prefix="€"
        suffix="kg"
      />
    </FormField>
  ),
};

export const InputWithPrefixSuffixDisabled: Story = {
  args: {
    disabled: true,
    prefix: '€',
    suffix: 'kg',
    placeholder: 'Placeholder',
  },
  render: (props) => (
    <FormField label={{ text: 'Label' }}>
      <InputText
        iconStart="placeholder"
        iconEnd="placeholder"
        placeholder="Placeholder"
        prefix="€"
        suffix="kg"
        {...props}
      />
    </FormField>
  ),
};

export const InputWithPrefixSuffixFocus: Story = {
  args: {
    inputClassName: 'focus-input',
    prefix: '€',
    suffix: 'kg',
    iconStart: 'person',
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => (
    <FormField label={{ text: 'Label' }}>
      <InputText
        iconStart="placeholder"
        iconEnd="placeholder"
        placeholder="Placeholder"
        prefix="€"
        suffix="kg"
        inputClassName="focus-input"
        {...props}
      />
    </FormField>
  ),
  parameters: {
    pseudo: { focus: '.focus-input' },
  },
};

export const InputWithIconStartOnly: Story = {
  args: {
    iconStart: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => (
    <FormField label={{ text: 'Label' }}>
      <InputText {...props} />
    </FormField>
  ),
};

export const InputWithIconEndOnly: Story = {
  args: {
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => (
    <FormField label={{ text: 'Label' }}>
      <InputText {...props} />
    </FormField>
  ),
};

export const WithTextInputReset: Story = {
  args: {
    id: 'input-text-id',
  },
  render: () => {
    return (
      <FormField
        label={{
          text: 'Input Label',
          htmlFor: 'input-text-id',
        }}
      >
        <InputText clearButtonEnabled placeholder="Placeholder" />
      </FormField>
    );
  },
};

export const WithTextInputSearch: Story = {
  args: {
    id: 'input-text-id',
  },
  render: () => {
    return (
      <FormField
        label={{
          text: 'Input Label',
          htmlFor: 'input-text-id',
        }}
      >
        <InputText type="search" placeholder="Placeholder" />
      </FormField>
    );
  },
};
