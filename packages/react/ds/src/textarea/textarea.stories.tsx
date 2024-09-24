import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './textarea.js';

const meta = {
  title: 'Form/TextArea',
  parameters: {
    docs: {
      description: {
        component:
          'Use the TextArea component when users need to enter longer or multiline text, such as comments or feedback. The `rows` and `cols` properties control the size of the textarea.',
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
    hintText: {
      description:
        'Hint text for the textarea to provide additional information.',
      control: 'object',
      table: {
        category: 'Hint',
        type: { summary: 'HintText' },
      },
    },
    errorText: {
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
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: 4,
    cols: 100,
    id: 'textarea-id',
    label: {
      content: 'Textarea Label',
      htmlFor: 'textarea-id',
    },
    errorText: {
      content: '',
    },
    hintText: {
      content: '',
    },
  },
};

export const WithLabelAndHint: Story = {
  args: {
    id: 'textarea-id',
    label: {
      content: 'Label',
      htmlFor: 'textarea-id',
    },
    hintText: {
      content: 'Hint: This is a helpful hint.',
    },
    rows: 4,
    cols: 100,
  },
};

export const WithLabelAndError: Story = {
  args: {
    id: 'textarea-id',
    label: {
      content: 'Label',
      htmlFor: 'textarea-id',
    },
    errorText: {
      content: 'Error: Please correct this issue.',
    },
  },
};

export const WithLabelHintAndError: Story = {
  args: {
    id: 'textarea-id',
    label: {
      content: 'Label',
      htmlFor: 'textarea-id',
    },
    hintText: {
      content: 'Hint: This is a helpful hint.',
    },
    errorText: {
      content: 'Error: Please correct this issue.',
    },
  },
};

export const CustomRowsAndColumns: Story = {
  args: {
    id: 'textarea-id',
    label: {
      content: 'Label',
      htmlFor: 'textarea-id',
    },
    rows: 6,
    cols: 40,
  },
};
