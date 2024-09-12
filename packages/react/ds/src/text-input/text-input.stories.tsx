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
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLInputElement>' },
        defaultValue: { summary: '-' },
      },
    },
  },
  args: {},
};

export const WithLabel: Story = {
  render: (args) => (
    <FormGroup>
      <Label htmlFor="text-input">Label</Label>
      <TextInput id="text-input" {...args} />
    </FormGroup>
  ),
  argTypes: {
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLInputElement>' },
        defaultValue: { summary: '-' },
      },
    },
  },
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
  argTypes: {
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLInputElement>' },
        defaultValue: { summary: '-' },
      },
    },
  },
  args: {},
};

export const WithLabelAndErorr: Story = {
  render: (args) => (
    <FormGroup hasError={true}>
      <Label htmlFor="text-input">Label</Label>
      <ErrorText>Error</ErrorText>
      <TextInput id="text-input" {...args} />
    </FormGroup>
  ),
  argTypes: {
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLInputElement>' },
        defaultValue: { summary: '-' },
      },
    },
  },
  args: {},
};

export const WithLabelHintAndError: Story = {
  render: (args) => (
    <FormGroup hasError={true}>
      <Label htmlFor="text-input">Label</Label>
      <HintText>Hint</HintText>
      <ErrorText>Error</ErrorText>
      <TextInput id="text-input" {...args} />
    </FormGroup>
  ),
  argTypes: {
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLInputElement>' },
        defaultValue: { summary: '-' },
      },
    },
  },
  args: {},
};
