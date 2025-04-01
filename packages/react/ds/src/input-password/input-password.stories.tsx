import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../forms/form-field.js';
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
      <FormField
        label={{
          text: 'Password',
          htmlFor: 'text-password-id',
        }}
      >
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
        <FormField
          label={{
            text: 'Label',
            htmlFor: 'default-input',
          }}
          hint={{
            text: 'Support text',
          }}
        >
          <InputPassword placeholder="Placeholder" id="default-input" />
        </FormField>
        <FormField
          label={{
            text: 'Label',
          }}
          hint={{
            text: 'Support text',
          }}
        >
          <InputPassword
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
          <InputPassword placeholder="Placeholder" />
        </FormField>
        <FormField
          label={{
            text: 'Label',
          }}
          hint={{
            text: 'Support text',
          }}
        >
          <InputPassword disabled placeholder="Placeholder" />
        </FormField>
        <FormField
          label={{
            text: 'Label',
          }}
          hint={{
            text: 'This field is read-only',
          }}
        >
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
