import type { Meta, StoryObj } from '@storybook/react';
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
    label: {
      description: 'Label associated with the textarea',
      control: 'object',
      table: {
        category: 'Label',
        type: { summary: 'Label' },
      },
    },
    hint: {
      description:
        'Hint text for the textarea to provide additional information.',
      control: 'object',
      table: {
        category: 'Hint',
        type: { summary: 'HintText' },
      },
    },
    error: {
      description:
        'Error message for the textarea, displayed when there is a validation error.',
      control: 'object',
      table: {
        category: 'Error',
        type: { summary: 'ErrorText' },
      },
    },
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
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLTextAreaElement>' },
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
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: 4,
    cols: 100,
    id: 'textarea-id-0',
    label: {
      text: 'Textarea Label',
      htmlFor: 'textarea-id-0',
    },
    error: {
      text: '',
    },
    hint: {
      text: '',
    },
  },
};

export const WithLabelAndHint: Story = {
  args: {
    id: 'textarea-id-1',
    label: {
      text: 'Label',
      htmlFor: 'textarea-id-1',
    },
    hint: {
      text: 'Hint: This is a helpful hint.',
    },
    rows: 4,
    cols: 100,
  },
};

export const WithLabelAndError: Story = {
  args: {
    id: 'textarea-id-2',
    label: {
      text: 'Label',
      htmlFor: 'textarea-id-2',
    },
    error: {
      text: 'Error: Please correct this issue.',
    },
  },
};

export const WithLabelHintAndError: Story = {
  args: {
    id: 'textarea-id-3',
    label: {
      text: 'Label',
      htmlFor: 'textarea-id-3',
    },
    hint: {
      text: 'Hint: This is a helpful hint.',
    },
    error: {
      text: 'Error: Please correct this issue.',
    },
  },
};

export const CustomRowsAndColumns: Story = {
  args: {
    id: 'textarea-id-4',
    label: {
      text: 'Label',
      htmlFor: 'textarea-id-4',
    },
    rows: 6,
    cols: 40,
  },
};

export const WithMaxChars: Story = {
  args: {
    id: 'textarea-id-5',
    label: {
      text: 'Label',
      htmlFor: 'textarea-id-5',
    },
    hint: {
      text: 'Hint: This is a helpful hint.',
    },
    maxChars: 100,
  },
};

export const DisabledState: Story = {
  args: {
    id: 'textarea-id-5',
    label: {
      text: 'Label',
      htmlFor: 'textarea-id-5',
    },
    hint: {
      text: 'Hint: This is a helpful hint.',
    },
    disabled: true,
    value: 'This field is disabled',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="gi-gap-4">
      <TextArea
        label={{ text: 'Default', htmlFor: 'default-textarea' }}
        id="default-textarea"
      />
      <TextArea
        label={{ text: 'Focus', htmlFor: 'focus-textarea' }}
        id="focus-textarea"
      />
      <TextArea
        label={{ text: 'Disabled', htmlFor: 'textarea-disabled' }}
        id="textarea-disabled"
        value="This field is disabled"
        disabled
      />
    </div>
  ),
  parameters: {
    pseudo: {
      focus: '#focus-textarea',
    },
  },
};
