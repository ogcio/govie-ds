import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './text-input.js';

const meta = {
  title: 'Form/TextInput',
  parameters: {
    docs: {
      description: {
        component:
          'Use the TextInput component for single-line text inputs like names or phone numbers. You can control the width using the `halfFluid`, `fullFluid`, or `characterWidth` properties.',
      },
    },
  },
  component: TextInput,
  argTypes: {
    label: {
      description: 'Label associated with the input field',
      control: 'object',
      table: {
        category: 'Label',
        type: { summary: 'Label' },
      },
    },
    hint: {
      description: 'Hint text for additional guidance.',
      control: 'object',
      table: {
        category: 'Hint',
        type: { summary: 'HintText' },
      },
    },
    error: {
      description: 'Error message displayed during validation errors.',
      control: 'object',
      table: {
        category: 'Error',
        type: { summary: 'ErrorText' },
      },
    },
    prefix: {
      description: 'Element or text displayed before the input (e.g., a unit).',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    suffix: {
      description: 'Element or text displayed after the input (e.g., a unit).',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    halfFluid: {
      description: 'Sets the width to 50% of available space.',
      control: 'boolean',
      table: {
        category: 'Width Control',
        type: { summary: 'boolean' },
      },
    },
    fullFluid: {
      description: 'Sets the width to 100% of available space.',
      control: 'boolean',
      table: {
        category: 'Width Control',
        type: { summary: 'boolean' },
      },
    },
    characterWidth: {
      description: 'Controls the width in characters.',
      control: 'number',
      table: {
        category: 'Width Control',
        type: { summary: 'number' },
      },
    },
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLInputElement>' },
      },
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'text-input-id',
    label: {
      children: 'Input Label',
      htmlFor: 'text-input-id',
    },
    hint: {
      children: '',
    },
    error: {
      children: '',
    },
  },
};

export const WithLabelAndHint: Story = {
  args: {
    id: 'text-input-id',
    label: {
      children: 'Label',
      htmlFor: 'text-input-id',
    },
    hint: {
      children: 'Hint: This is a helpful hint.',
    },
  },
};

export const WithLabelAndError: Story = {
  args: {
    id: 'text-input-id',
    label: {
      children: 'Label',
      htmlFor: 'text-input-id',
    },
    error: {
      children: 'Error: Please correct this issue.',
    },
  },
};

export const WithLabelHintAndError: Story = {
  args: {
    id: 'text-input-id',
    label: {
      children: 'Label',
      htmlFor: 'text-input-id',
    },
    hint: {
      children: 'Hint: This is a helpful hint.',
    },
    error: {
      children: 'Error: Please correct this issue.',
    },
    suffix: 'KG',
  },
};

export const WithLabelAndPrefixSuffix: Story = {
  args: {
    id: 'text-input-id',
    label: {
      children: 'Label',
      htmlFor: 'text-input-id',
    },
    prefix: 'kg',
    suffix: 'per item',
  },
};

export const HalfFluid: Story = {
  args: {
    id: 'text-input-id',
    label: {
      children: 'Half Fluid Input',
      htmlFor: 'text-input-id',
    },
    halfFluid: true,
  },
};

export const FullFluid: Story = {
  args: {
    id: 'text-input-id',
    label: {
      children: 'Full Fluid Input',
      htmlFor: 'text-input-id',
    },
    fullFluid: true,
  },
};

export const CharacterWidth: Story = {
  args: {
    id: 'text-input-id',
    label: {
      children: '4 characters width',
      htmlFor: 'text-input-id',
    },
    characterWidth: 4,
  },
};
