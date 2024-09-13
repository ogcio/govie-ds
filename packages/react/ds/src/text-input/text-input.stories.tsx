import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './text-input.js';
import { Label } from '../label/label.js';
import { HintText } from '../hint-text/hint-text.js';
import { ErrorText } from '../error-text/error-text.js';
import { FormGroup } from '../form-group/form-group.js';

const meta = {
  title: 'Form/TextInput',
  parameters: {
    docs: {
      description: {
        component:
          'Use the text input component when you need to let users enter text that’s no longer than a single line, such as their name or phone number.',
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
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '-' },
      },
    },
    suffix: {
      description:
        'Element or text to display on the right side of the input, such as a unit or symbol.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '-' },
      },
    },
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLInputElement>' },
        defaultValue: { summary: '-' },
      },
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  render: (args) => (
    <FormGroup>
      <Label htmlFor="text-input">Label</Label>
      <TextInput id="text-input" {...args} />
    </FormGroup>
  ),
  args: {},
};

export const WithLabelAndPrefixSuffix: Story = {
  render: (args) => (
    <FormGroup>
      <Label htmlFor="text-input">Label</Label>
      <TextInput prefix="kg" suffix="per item" id="text-input" {...args} />
    </FormGroup>
  ),
  args: {},
};

export const WithLabelAndHint: Story = {
  render: (args) => (
    <FormGroup>
      <Label htmlFor="text-input">Label</Label>
      <HintText>Hint</HintText>
      <TextInput id="text-input" {...args} />
    </FormGroup>
  ),
  args: {},
};

export const WithLabelAndError: Story = {
  render: (args) => (
    <FormGroup hasError={true}>
      <Label htmlFor="text-input">Label</Label>
      <ErrorText>Error</ErrorText>
      <TextInput hasError id="text-input" {...args} />
    </FormGroup>
  ),
  args: {},
};

export const WithLabelHintAndError: Story = {
  render: (args) => (
    <FormGroup hasError>
      <Label htmlFor="text-input">Label</Label>
      <HintText>Hint</HintText>
      <ErrorText>Error</ErrorText>
      <TextInput hasError suffix="KG" id="text-input" {...args} />
    </FormGroup>
  ),
  args: {},
};
