import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './text-input.html?raw';
import { TextInputProps } from './text-input.schema';

const macro = { name: 'govieTextInput', html };

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
    hasError: {
      description:
        'Indicates whether the input should be displayed in an error state. When `true`, the border color will be red.',
      control: 'boolean',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
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
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fullFluid: true,
  },
};

export const WithSuffix: Story = {
  args: {
    fullFluid: true,
    prefix: 'KG',
    suffix: 'per item',
  },
};

export const HalfFluid: Story = {
  args: {
    halfFluid: true,
  },
};

export const CharacterWidth: Story = {
  args: {
    characterWidth: 20,
  },
};
