import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './text-input.html?raw';
import { TextInputProps } from './text-input.schema';

const path = import.meta.url.split('/text-input')[0];

const macro = { name: 'govieTextInput', html, path };
const TextInput = renderComponent<TextInputProps>(macro);

const meta = {
  title: 'Form/TextInput',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'Use the text input component when you need to let users enter text that’s no longer than a single line, such as their name or phone number. Use the `halfFluid`, `fullFluid`, or `characterWidth` properties to control the width of the input field based on different design needs.',
      },
    },
  },
  component: TextInput,
  argTypes: {
    prefix: {
      description:
        'Element or text to display on the left side of the input, such as a unit or symbol.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    suffix: {
      description:
        'Element or text to display on the right side of the input, such as a unit or symbol.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    halfFluid: {
      description:
        'When `true`, the input width is set to 50% of the available space.',
      control: 'boolean',
      table: {
        category: 'Width Control',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullFluid: {
      description:
        'When `true`, the input width is set to 100% of the available space.',
      control: 'boolean',
      table: {
        category: 'Width Control',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    characterWidth: {
      description:
        'Sets the width of the input in terms of the number of characters it can contain.',
      control: 'number',
      table: {
        category: 'Width Control',
        type: { summary: 'number' },
        defaultValue: { summary: '-' },
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
    label: {
      description: 'Label associated with the input',
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
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fullFluid: true,
    id: 'input-id',
    label: {
      content: 'Label',
      for: 'input-id',
    },
    error: {
      content: '',
    },
    hint: {
      content: '',
    },
  },
};

export const WithSuffix: Story = {
  args: {
    fullFluid: true,
    prefix: 'KG',
    suffix: 'per item',
    id: 'suffix-input',
  },
};

export const HalfFluid: Story = {
  args: {
    halfFluid: true,
    id: 'half-fluid-input',
  },
};

export const CharacterWidth: Story = {
  args: {
    characterWidth: 20,
    id: 'character-width-input',
  },
};

export const WithLabel: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'label-input',
    },
    fullFluid: true,
    id: 'label-input',
  },
};

export const WithLabelAndHint: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'label-hint-input',
    },
    hint: {
      content: 'Hint',
    },
    fullFluid: true,
    id: 'label-hint-input',
  },
};

export const WithLabelHintAndErrorText: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'error-input',
    },
    hint: {
      content: 'Hint',
    },
    error: {
      content: 'Error',
    },
    fullFluid: true,
    id: 'error-input',
  },
};
