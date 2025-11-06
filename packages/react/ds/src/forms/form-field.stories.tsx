import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { InputText } from '../input-text/input-text.js';
import { TextArea } from '../textarea/textarea.js';
import {
  FormField,
  FormFieldLabel,
  FormFieldHint,
  FormFieldError,
} from './form-field/form-field.js';

const meta = {
  title: 'Form/FormField',
  component: FormField,
  parameters: {
    docs: {
      description: {
        component:
          'The `FormField` component provides a flexible wrapper for form inputs. ' +
          'It is designed to work with associated subcomponents like `FormFieldLabel`, ' +
          '`FormFieldHint`, and `FormFieldError` for building accessible and consistent form fields.',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Default label text',
      control: { type: 'object' },
    },
    hint: {
      description: 'Default hint text',
      control: { type: 'object' },
    },
    error: {
      description: 'Default error message',
      control: { type: 'object' },
    },
    className: {
      description: 'Custom class name for the FormField container',
      control: { type: 'text' },
    },
  },
  args: {
    label: {
      text: 'Label text goes here.',
      size: 'md',
    },
    hint: {
      text: 'Hint text goes here.',
      size: 'md',
    },
    error: { text: 'Error text goes here.', size: 'md' },
    className: '',
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormField data-testid="form-field-default">
      <FormFieldLabel htmlFor="input-text-id">Label</FormFieldLabel>
      <InputText data-testid="input-text-id" id="input-text-id" />
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A basic `FormField` with a label and an input. This demonstrates the simplest usage.',
      },
    },
  },
};

export const WithHint: Story = {
  render: () => (
    <FormField>
      <FormFieldLabel htmlFor="input-with-hint">Username</FormFieldLabel>
      <FormFieldHint>Choose a unique username for your account.</FormFieldHint>
      <InputText id="input-with-hint" />
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Adds a `FormFieldHint` below the label to provide guidance or instructions to the user.',
      },
    },
  },
};

export const WithError: Story = {
  render: () => (
    <FormField>
      <FormFieldLabel htmlFor="input-with-error">Email</FormFieldLabel>
      <FormFieldError>Please enter a valid email address.</FormFieldError>
      <InputText id="input-with-error" />
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Includes a `FormFieldError` message to indicate a validation error. ' +
          'When an error is present, the fieldset applies an error state style.',
      },
    },
  },
};

export const WithHintAndError: Story = {
  render: () => (
    <FormField>
      <FormFieldLabel htmlFor="textarea-id">Description</FormFieldLabel>
      <FormFieldHint>
        Provide a short description (max 200 characters).
      </FormFieldHint>
      <FormFieldError>Description is required.</FormFieldError>
      <TextArea id="textarea-id" />
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Shows how you can combine both `FormFieldHint` and `FormFieldError` within the same field.',
      },
    },
  },
};

export const WithSubLabel: Story = {
  render: () => (
    <FormField data-testid="form-field-default">
      <FormFieldLabel htmlFor="input-text-id" secondaryLabel="(optional)">
        Label
      </FormFieldLabel>
      <InputText data-testid="input-text-id" id="input-text-id" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const optional = await canvas.findByText('(optional)');
    const labelTextNode = await canvas.findByText('Label');

    const labelElement = labelTextNode.closest(
      'label',
    ) as HTMLLabelElement | null;
    expect(labelElement).toBeTruthy();

    expect(optional).toBeInTheDocument();
    expect(optional).toHaveClass('gi-secondary-label');
    expect(labelElement).toContainElement(optional);
  },
};
