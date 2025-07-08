import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { FormField } from '../forms/form-field/form-field.js';
import { TextArea } from './textarea.js';

const meta = {
  title: 'Form/TextArea',
  parameters: {
    docs: {
      description: {
        component:
          'Use the textarea component when you need to let users enter multi-line text, such as comments or a description. The `rows` and `cols` properties control the size of the textarea, while `error` can indicate validation errors.',
      },
    },
  },
  component: TextArea,
  argTypes: {
    rows: {
      description: 'The number of visible text lines in the textarea.',
      control: 'number',
      table: {
        category: 'Size',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    cols: {
      description: 'The width of the textarea in terms of characters.',
      control: 'number',
      table: {
        category: 'Size',
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
    disabled: {
      description: 'Disable textarea',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'Behavior' },
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
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: 4,
    cols: 100,
    id: 'textarea-id-0',
  },
  render: (props) => (
    <FormField
      id="textarea-id-0"
      label={{
        text: 'Label',
        htmlFor: 'textarea-id-0',
      }}
    >
      <TextArea {...props} data-testid="textarea-id-0" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByTestId('textarea-id-0') as HTMLTextAreaElement;
    expect(textarea).toBeTruthy();
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea.cols).toBe(100);
    expect(textarea.rows).toBe(4);

    const remainingElement = canvas.queryByText(/^You have/);
    expect(remainingElement).not.toBeInTheDocument();
  },
};

export const Focus: Story = {
  render: () => (
    <FormField label={{ text: 'Label' }} hint={{ text: 'Support text' }}>
      <TextArea
        className="focus-input"
        iconStart="placeholder"
        placeholder="Placeholder"
      />
    </FormField>
  ),
  parameters: {
    pseudo: {
      focus: '.focus-input',
    },
  },
};

export const WithTextInputReset: Story = {
  args: {
    id: 'text-area-id01',
  },
  render: () => {
    return (
      <FormField
        label={{
          text: 'Input Label',
          htmlFor: 'text-area-id01',
        }}
      >
        <TextArea clearButtonEnabled placeholder="Placeholder" />
      </FormField>
    );
  },
};

export const WithLabelAndHint: Story = {
  args: {
    id: 'textarea-id-1',
    rows: 4,
    cols: 100,
  },
  render: (props) => (
    <FormField
      label={{
        text: 'Label',
        htmlFor: 'textarea-id-1',
      }}
      hint={{
        text: 'Hint: This is a helpful hint.',
      }}
    >
      <TextArea {...props} />
    </FormField>
  ),
};

export const WithLabelAndError: Story = {
  args: {
    id: 'textarea-id-2',
  },
  render: (props) => (
    <FormField
      label={{
        text: 'Label',
        htmlFor: 'textarea-id-2',
      }}
      error={{ text: 'Error: Please correct this issue.' }}
    >
      <TextArea {...props} />
    </FormField>
  ),
};

export const WithLabelHintAndError: Story = {
  args: {
    id: 'textarea-id-3',
  },
  render: (props) => (
    <FormField
      label={{
        text: 'Label',
        htmlFor: 'textarea-id-3',
      }}
      hint={{
        text: 'Hint: This is a helpful hint.',
      }}
      error={{ text: 'Error: Please correct this issue.' }}
    >
      <TextArea {...props} data-testid="textarea-id-3" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByTestId('textarea-id-3') as HTMLTextAreaElement;
    expect(globalThis.window.getComputedStyle(textarea).borderColor).toBe(
      'rgb(187, 37, 13)', //'var(--gieds-color-red-600)',
    );

    const label = canvas.getByText('Label');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');
    expect(label.getAttribute('for')).toBe(textarea.getAttribute('id'));

    const hint = canvas.getByText('Hint: This is a helpful hint.');
    expect(hint).toBeTruthy();
    expect(hint).toHaveClass('gi-hint-text');

    const error = canvas.getByText('Error: Please correct this issue.');
    expect(error).toBeTruthy();
    expect(error).toHaveClass('gi-error-text');
  },
};

export const WithMaxChars: Story = {
  args: {
    id: 'textarea-id-5',
    maxChars: 30,
  },
  render: (props) => (
    <FormField
      label={{
        text: 'Label',
        htmlFor: 'textarea-id-5',
      }}
      hint={{
        text: 'Hint: This is a helpful hint.',
      }}
    >
      <TextArea {...props} data-testid="textarea-id-5" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByTestId('textarea-id-5') as HTMLTextAreaElement;

    expect(textarea.maxLength).toBe(30);

    const remainingElement = canvas.getByText(
      /You have 30 characters remaining/,
    );
    expect(remainingElement).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    id: 'textarea-id-5',
    disabled: true,
  },
  render: (props) => (
    <FormField
      label={{
        text: 'Label',
        htmlFor: 'textarea-id-5',
      }}
      hint={{
        text: 'Hint: This is a helpful hint.',
      }}
    >
      <TextArea {...props} />
    </FormField>
  ),
};

export const WithHalfWidth: Story = {
  args: {
    id: 'textarea-id-5',
    halfFluid: true,
  },
  render: (props) => (
    <FormField
      label={{
        text: 'Label',
        htmlFor: 'textarea-id-5',
      }}
    >
      <TextArea {...props} />
    </FormField>
  ),
};

export const CustomRowsAndColumns: Story = {
  args: {
    id: 'textarea-id-4',
    rows: 6,
    cols: 40,
  },
  render: (props) => (
    <FormField
      label={{
        text: 'Label',
        htmlFor: 'textarea-id-4',
      }}
    >
      <TextArea {...props} />
    </FormField>
  ),
};
