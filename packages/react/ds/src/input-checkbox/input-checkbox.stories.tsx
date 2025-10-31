import type { Meta, StoryObj } from '@storybook/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { userEvent, expect, within } from 'storybook/test';

import { Button } from '../button/button.js';
import {
  FormField,
  FormFieldError,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { Link } from '../link/link.js';
import { InputCheckbox } from './input-checkbox.js';
import { InputCheckboxSizeEnum } from './types.js';

const meta = {
  title: 'Form/Checkbox/InputCheckbox',
  parameters: {
    docs: {
      description: {
        component: 'Input Checkbox component',
      },
    },
  },
  component: InputCheckbox,
} satisfies Meta<typeof InputCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    id: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'the unique value for the checkbox component',
    },
    value: {
      control: 'text',
      type: 'string',
      description: 'The value of the Component',
    },
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm'],
      description: 'The sizes for the Checkbox',
    },
    label: {
      control: 'text',
      type: 'string',
      description: 'The label associated with the Checkbox',
    },
    hint: {
      control: 'text',
      type: 'string',
      description:
        'Additional text to inform the user about the Checkbox component',
    },
    onChange: {
      control: 'object',
      type: 'function',
      description: 'Callback fired when the checkbox component is selected.',
    },
    checked: {
      control: 'boolean',
      description:
        'if true the component is checked for controlled components via state, for uncontrolled components use "defaultChecked"',
    },
    disabled: {
      control: 'boolean',
      description: 'if true the component is disabled',
    },
    indeterminate: {
      control: 'boolean',
      description: 'If true, the checkbox shows the indeterminate state',
    },
  },
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
  },
};

export const Hover: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
  },
  parameters: { pseudo: { hover: true } },
};

export const Focus: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
  },
  parameters: { pseudo: { focus: true } },
};

export const Disabled: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    disabled: true,
  },
};

export const WithHint: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    hint: 'This is a hint',
  },
};

export const WithLabelContent: Story = {
  args: {
    id: 'checkbox-terms',
    value: 'accepted',
    hint: 'You must agree before continuing',
    children: (
      <>
        I agree to the <Link href="#">Terms and conditions</Link>.
      </>
    ),
  },
};

export const WithDefaultChecked: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    defaultChecked: true,
  },
};

export const WithChecked: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    checked: true,
  },
};

export const SmallCheckbox: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    size: InputCheckboxSizeEnum.Small,
  },
};

export const MediumCheckbox: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    size: InputCheckboxSizeEnum.Medium,
  },
};

export const IndeterminateChecked: Story = {
  args: {
    indeterminate: true,
    id: 'checkbox-id-indeterminate',
    value: 'value-2',
    label: 'Checkbox',
    checked: true,
  },
};

export const IndeterminateSmall: Story = {
  args: {
    indeterminate: true,
    id: 'checkbox-id-indeterminate',
    value: 'value-2',
    label: 'Checkbox',
    size: 'sm',
  },
};

export const IndeterminateMedium: Story = {
  args: {
    indeterminate: true,
    id: 'checkbox-id-indeterminate',
    value: 'value-2',
    label: 'Checkbox',
    size: 'md',
  },
};

export const WithReactHookForm: Story = {
  tags: ['skip-playwright'],
  render: () => {
    const methods = useForm<{ terms: boolean }>({
      defaultValues: { terms: false },
    });

    const onSubmit = methods.handleSubmit((_) => {
      methods.reset();
    });

    return (
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <FormField>
            {methods.formState.errors.terms && (
              <FormFieldError dataTestid="error-msg">
                {methods.formState.errors.terms.message}
              </FormFieldError>
            )}
            <FormFieldLabel htmlFor="checkbox-id-1">
              Accept Terms
            </FormFieldLabel>
            <Controller
              name="terms"
              control={methods.control}
              rules={{ required: 'You must accept the terms' }}
              render={({ field }) => (
                <InputCheckbox
                  id="checkbox-id-1"
                  value="accepted"
                  label="I accept"
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                  data-testid="checkbox-id-1"
                />
              )}
            />
          </FormField>

          <div className="gi-flex gi-flex-cols gi-gap-2 gi-pt-4">
            <Button type="submit" dataTestid="submit-btn">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => methods.reset()}
              dataTestid="reset-btn"
            >
              Reset
            </Button>
          </div>
        </form>
      </FormProvider>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkbox = canvas.getByTestId('checkbox-id-1');
    const submitButton = canvas.getByTestId('submit-btn');
    const resetButton = canvas.getByTestId('reset-btn');

    await userEvent.click(submitButton);
    expect(canvas.getByTestId('error-msg')).toBeDefined();

    await userEvent.click(checkbox);
    await userEvent.click(submitButton);
    expect(canvas.queryByTestId('error-msg')).toBeNull();
    expect((checkbox as HTMLInputElement).checked).toBe(false);

    await userEvent.click(checkbox);
    await userEvent.click(resetButton);
    expect((checkbox as HTMLInputElement).checked).toBe(false);
  },
};
