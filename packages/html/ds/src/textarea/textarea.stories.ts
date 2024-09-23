import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './textarea.html?raw';
import { TextareaProps } from './textarea.schema';

const path = import.meta.url.split('/textarea')[0];

const macro = { name: 'govieTextarea', html, path };
const TextArea = renderComponent<TextareaProps>(macro);

const meta = {
  title: 'Form/TextArea',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'Use the textarea component when you need to let users enter multi-line text, such as comments or a description. The `rows` and `cols` properties control the size of the textarea, while `hasError` can indicate validation errors.',
      },
    },
  },
  component: TextArea,
  argTypes: {
    hasError: {
      description:
        'Indicates whether the textarea should be displayed in an error state. When `true`, the border color will be red.',
      control: 'boolean',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
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
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: 4,
    cols: 100,
  },
};

export const CustomSizeWith6RowsAnd50Cols: Story = {
  args: {
    rows: 6,
    cols: 50,
  },
};

export const WithLabel = {
  args: {
    label: {
      content: 'Textarea Label',
    },
    rows: 4,
    cols: 100,
  },
};

export const WithLabelAndHint = {
  args: {
    label: {
      content: 'Textarea Label',
    },
    hintText: {
      content: 'Hint text for textarea',
    },
    rows: 4,
    cols: 100,
  },
};

export const WithLabelHintAndError = {
  args: {
    label: {
      content: 'Textarea Label',
    },
    hintText: {
      content: 'Hint text for textarea',
    },
    errorText: {
      content: 'Error message for textarea',
    },
    rows: 4,
    cols: 100,
    hasError: true,
  },
};
