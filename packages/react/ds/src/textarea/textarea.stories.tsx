import type { Meta, StoryObj } from '@storybook/react';
import { ErrorText } from '../error-text/error-text.js';
import { FormGroup } from '../form-group/form-group.js';
import { HintText } from '../hint-text/hint-text.js';
import { Label } from '../label/label.js';
import { TextArea } from './textarea.js';

const meta = {
  title: 'Form/TextArea',
  parameters: {
    docs: {
      description: {
        component:
          'Use the TextArea component when users need to enter longer or multiline text, such as comments or feedback. The `rows` and `cols` properties can be used to control the size of the textarea.',
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
      description: 'The number of visible text lines in the textarea.',
      control: 'number',
      table: {
        category: 'Size',
        type: { summary: 'number' },
        defaultValue: { summary: '-' },
      },
    },
    cols: {
      description: 'The width of the textarea in terms of characters.',
      control: 'number',
      table: {
        category: 'Size',
        type: { summary: 'number' },
        defaultValue: { summary: '-' },
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
        defaultValue: { summary: '-' },
      },
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (_arguments) => (
    <FormGroup>
      <Label htmlFor="textarea">Textarea</Label>
      <TextArea id="textarea" {..._arguments} />
    </FormGroup>
  ),
  args: {},
};

export const WithLabelAndHint: Story = {
  render: (_arguments) => (
    <FormGroup>
      <Label htmlFor="textarea">Label</Label>
      <HintText>Hint</HintText>
      <TextArea id="textarea" {..._arguments} />
    </FormGroup>
  ),
  args: {},
};

export const WithLabelAndError: Story = {
  render: (_arguments) => (
    <FormGroup hasError={true}>
      <Label htmlFor="textarea">Label</Label>
      <ErrorText>Error</ErrorText>
      <TextArea hasError id="textarea" {..._arguments} />
    </FormGroup>
  ),
  args: {},
};

export const WithLabelHintAndError: Story = {
  render: (_arguments) => (
    <FormGroup hasError>
      <Label htmlFor="textarea">Label</Label>
      <HintText>Hint</HintText>
      <ErrorText>Error</ErrorText>
      <TextArea hasError id="textarea" {..._arguments} />
    </FormGroup>
  ),
  args: {},
};

export const CustomRowsAndColumns: Story = {
  render: (_arguments) => (
    <FormGroup>
      <Label htmlFor="textarea">Custom Rows (6) and Columns (40)</Label>
      <TextArea id="textarea" rows={6} cols={40} {..._arguments} />
    </FormGroup>
  ),
  args: {},
};
