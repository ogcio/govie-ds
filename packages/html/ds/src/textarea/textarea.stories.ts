import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './textarea.html?raw';
import { TextareaProps } from './textarea.schema';

const path = import.meta.url.split('/textarea')[0];

const macro = { name: 'govieTextArea', html, path };
const TextArea = renderComponent<TextareaProps>(macro);

const meta = {
  title: 'Form/TextArea',
  parameters: {
    macro,
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
    id: {
      description: 'Sets the ID for the textarea, used for accessibility.',
      control: 'text',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'textarea-id' },
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
    id: 'textarea-id-1',
    label: {
      content: 'Textarea Label',
      for: 'textarea-id-1',
    },
    error: {
      content: '',
    },
    hint: {
      content: '',
    },
  },
};

export const WithLabelAndHint: Story = {
  args: {
    label: {
      content: 'Textarea Label',
      for: 'textarea-id-3',
    },
    hint: {
      content: 'Hint text for textarea',
    },
    rows: 4,
    cols: 100,
    id: 'textarea-id-3',
  },
};

export const WithLabelAndError: Story = {
  args: {
    label: {
      content: 'Textarea Label',
      for: 'textarea-id-4',
    },
    error: {
      content: 'Error message for textarea',
    },
    rows: 4,
    cols: 100,
    id: 'textarea-id-4',
  },
};

export const WithLabelHintAndError: Story = {
  args: {
    label: {
      content: 'Textarea Label',
      for: 'textarea-id-4',
    },
    hint: {
      content: 'Hint: This is a helpful hint.',
    },
    error: {
      content: 'Error message for textarea',
    },
    rows: 4,
    cols: 100,
    id: 'textarea-id-4',
  },
};

export const CustomRowsAndColumns: Story = {
  args: {
    label: {
      content: 'Textarea Label',
      for: 'custom-size-textarea',
    },
    rows: 6,
    cols: 40,
    id: 'custom-size-textarea',
  },
};

export const WithMaxChars: Story = {
  args: {
    label: {
      content: 'Textarea Label',
      for: 'textarea-id-5',
    },
    hint: {
      content: 'Hint text for textarea',
    },
    maxChars: 100,
    id: 'textarea-id-5',
  },
};
