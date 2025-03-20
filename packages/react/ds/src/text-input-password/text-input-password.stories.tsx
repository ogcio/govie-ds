import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../forms/form-field.js';
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
