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
          'Use the textarea component when you need to let users enter multi-line text, such as comments or a description. The `rows` and `cols` properties control the size of the textarea, while `errorText` can indicate validation errors.',
      },
    },
  },
  component: TextArea,
  argTypes: {
    rows: {
      description: 'Sets the number of rows (height) of the textarea.',
      control: 'number',
      table: {
        category: 'Size Control',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    cols: {
      description: 'Sets the number of columns (width) of the textarea.',
      control: 'number',
      table: {
        category: 'Size Control',
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    autoComplete: {
      description: 'Sets the autocomplete behavior for the textarea.',
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
      for: 'textarea-id',
    },
    errorText: {
      content: '',
    },
    hintText: {
      content: '',
    },
  },
};

export const CustomSizeWith6RowsAnd50Cols: Story = {
  args: {
    rows: 6,
    cols: 50,
    id: 'custom-size-textarea',
  },
};

export const WithLabel: Story = {
  args: {
    label: {
      content: 'Textarea Label',
      for: 'textarea-id',
    },
    rows: 4,
    cols: 100,
    id: 'textarea-id',
  },
};

export const WithLabelAndHint: Story = {
  args: {
    label: {
      content: 'Textarea Label',
      for: 'textarea-id',
    },
    hintText: {
      content: 'Hint text for textarea',
    },
    rows: 4,
    cols: 100,
    id: 'textarea-id',
  },
};

export const WithLabelHintAndError: Story = {
  args: {
    label: {
      content: 'Textarea Label',
      for: 'textarea-id',
    },
    hintText: {
      content: 'Hint text for textarea',
    },
    errorText: {
      content: 'Error message for textarea',
    },
    rows: 4,
    cols: 100,
    id: 'textarea-id',
  },
};
