import type { Meta, StoryObj } from '@storybook/react';
import {
  FormField,
  FormFieldError,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { Stack } from '../stack/stack.js';
import { InputPassword } from './input-password.js';

const meta = {
  title: 'Form/InputPassword',
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <FormField>
        <FormFieldLabel htmlFor="text-password-id">Password</FormFieldLabel>
        <InputPassword
          placeholder="Placeholder"
          data-testid="text-password-id"
        />
      </FormField>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    return (
      <Stack gap={4} itemsAlignment="stretch">
        <FormField>
          <FormFieldLabel htmlFor="default-input">Label</FormFieldLabel>
          <FormFieldHint>Support text</FormFieldHint>
          <InputPassword placeholder="Placeholder" id="default-input" />
        </FormField>

        <FormField>
          <FormFieldLabel>Label</FormFieldLabel>
          <FormFieldHint>Support text</FormFieldHint>
          <InputPassword
            placeholder="Placeholder"
            inputClassName="focus-input"
          />
        </FormField>

        <FormField>
          <FormFieldLabel>Label</FormFieldLabel>
          <FormFieldHint>Support text</FormFieldHint>
          <FormFieldError>Error text</FormFieldError>
          <InputPassword placeholder="Placeholder" />
        </FormField>

        <FormField>
          <FormFieldLabel>Label</FormFieldLabel>
          <FormFieldHint>Support text</FormFieldHint>
          <InputPassword disabled placeholder="Placeholder" />
        </FormField>

        <FormField>
          <FormFieldLabel>Label</FormFieldLabel>
          <FormFieldHint>This field is read-only</FormFieldHint>
          <InputPassword readOnly placeholder="Placeholder" value={'123456'} />
        </FormField>
      </Stack>
    );
  },
  parameters: {
    pseudo: {
      focus: '.focus-input',
    },
  },
};
