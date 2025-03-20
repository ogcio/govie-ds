import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../forms/form-field.js';
import { Stack } from '../stack/stack.js';
import { TextInputPassword } from './text-input-password.js';

const meta = {
  title: 'Form/TextInputPassword',
} satisfies Meta<typeof TextInputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <FormField
        label={{
          text: 'Password',
          htmlFor: 'text-password-id',
        }}
      >
        <TextInputPassword
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
      <Stack gap={4}>
        <FormField
          label={{
            text: 'Label',
            htmlFor: 'default-input',
          }}
          hint={{
            text: 'Support text',
          }}
        >
          <TextInputPassword placeholder="Placeholder" id="default-input" />
        </FormField>
        <FormField
          label={{
            text: 'Label',
          }}
          hint={{
            text: 'Support text',
          }}
        >
          <TextInputPassword
            placeholder="Placeholder"
            inputClassName="focus-input"
          />
        </FormField>
        <FormField
          error={{
            text: 'Error text',
          }}
          label={{
            text: 'Label',
          }}
          hint={{
            text: 'Support text',
          }}
        >
          <TextInputPassword placeholder="Placeholder" />
        </FormField>
        <FormField
          label={{
            text: 'Label',
          }}
          hint={{
            text: 'Support text',
          }}
        >
          <TextInputPassword disabled placeholder="Placeholder" />
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
