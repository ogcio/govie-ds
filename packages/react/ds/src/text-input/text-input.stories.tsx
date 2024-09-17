import type { Meta, StoryObj } from '@storybook/react';
import { ErrorText } from '../error-text/error-text.js';
import { FormGroup } from '../form-group/form-group.js';
import { HintText } from '../hint-text/hint-text.js';
import { Label } from '../label/label.js';
import { TextInput } from './text-input.js';

const meta = {
  title: 'Form/TextInput',
  parameters: {
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
        defaultValue: { summary: 'false' },
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
  render: (_arguments) => (
    <FormGroup>
      <Label htmlFor="text-input">Label</Label>
      <TextInput id="text-input" {..._arguments} />
    </FormGroup>
  ),
  args: {},
};

export const WithLabelAndPrefixSuffix: Story = {
  render: (_arguments) => (
    <FormGroup>
      <Label htmlFor="text-input">Label</Label>
      <TextInput
        prefix="kg"
        suffix="per item"
        id="text-input"
        {..._arguments}
      />
    </FormGroup>
  ),
  args: {},
};

export const WithLabelAndHint: Story = {
  render: (_arguments) => (
    <FormGroup>
      <Label htmlFor="text-input">Label</Label>
      <HintText>Hint</HintText>
      <TextInput id="text-input" {..._arguments} />
    </FormGroup>
  ),
  args: {},
};

export const WithLabelAndError: Story = {
  render: (_arguments) => (
    <FormGroup hasError={true}>
      <Label htmlFor="text-input">Label</Label>
      <ErrorText>Error</ErrorText>
      <TextInput hasError id="text-input" {..._arguments} />
    </FormGroup>
  ),
  args: {},
};

export const WithLabelHintAndError: Story = {
  render: (_arguments) => (
    <FormGroup hasError>
      <Label htmlFor="text-input">Label</Label>
      <HintText>Hint</HintText>
      <ErrorText>Error</ErrorText>
      <TextInput hasError suffix="KG" id="text-input" {..._arguments} />
    </FormGroup>
  ),
  args: {},
};

export const HalfFluid: Story = {
  render: (_arguments) => (
    <FormGroup>
      <Label htmlFor="text-input">Half Fluid Input</Label>
      <TextInput id="text-input" halfFluid {..._arguments} />
    </FormGroup>
  ),
  args: {},
};

export const FullFluid: Story = {
  render: (_arguments) => (
    <FormGroup>
      <Label htmlFor="text-input">Full Fluid Input</Label>
      <TextInput id="text-input" fullFluid {..._arguments} />
    </FormGroup>
  ),
  args: {},
};

export const CharacterWidth: Story = {
  render: (_arguments) => (
    <FormGroup>
      <Label htmlFor="text-input">4 characters width</Label>
      <TextInput id="text-input" characterWidth={4} {..._arguments} />
    </FormGroup>
  ),
  args: {},
};
