import type { Meta, StoryObj } from '@storybook/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { userEvent, within, expect } from 'storybook/test';
import { Button } from '../button/button.js';
import {
  FormField,
  FormFieldError,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { Link } from '../link/link.js';
import { InputRadio } from './input-radio.js';

const meta = {
  title: 'Form/Radio/InputRadio',
  parameters: {
    docs: {
      description: {
        component: 'Input Radio component',
      },
    },
  },
  component: InputRadio,
} satisfies Meta<typeof InputRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    value: {
      control: 'text',
      type: 'string',
      description: 'The value of the Component',
    },
    name: {
      control: 'text',
      type: 'string',
      description: 'Name attribute of the input element',
    },
    label: {
      control: 'text',
      type: 'string',
      description: 'The label associated with the Radio',
    },
    hint: {
      control: 'text',
      type: 'string',
      description:
        'Additional text to inform the user about the Radio component',
    },
    id: {
      control: 'text',
      type: 'string',
      description: 'The id of the Radio',
    },
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm'],
      description: 'The sizes for the Radio',
    },
    conditionalInput: {
      description:
        'Conditional input associated with the radio (see text input component)',
    },
    checked: {
      control: 'boolean',
      description: 'if true the component is checked',
    },
    onChange: {
      control: 'object',
      type: 'function',
      description: 'Callback fired when the radio component is selected.',
    },
  },
  args: {
    value: 'radio-value',
    label: 'Radio',
  },
};

export const WithHint: Story = {
  args: {
    value: 'radio-with-hint',
    label: 'With hint',
    hint: 'This is a hint',
  },
};

export const WithLabelContent: Story = {
  args: {
    id: 'radio-terms',
    name: 'terms',
    value: 'agree',
    hint: 'You must agree before continuing',
    children: (
      <>
        I agree to the <Link href="#">Terms and Conditions</Link>.
      </>
    ),
  },
};

export const WithDefaultChecked: Story = {
  args: {
    value: 'radio-with-default-checked',
    label: 'Default checked',
    defaultChecked: true,
  },
};

export const WithReactHookForm: Story = {
  tags: ['skip-playwright'],
  render: () => {
    const methods = useForm<{ contact: string }>({
      defaultValues: { contact: '' },
    });

    const onSubmit = methods.handleSubmit((_) => {
      methods.reset();
    });

    return (
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <FormField data-testid="form-field-id">
            {methods.formState.errors.contact && (
              <FormFieldError dataTestid="error-msg">
                {methods.formState.errors.contact.message}
              </FormFieldError>
            )}
            <FormFieldLabel>Preferred contact</FormFieldLabel>

            <Controller
              name="contact"
              control={methods.control}
              rules={{ required: 'Select one option' }}
              render={({ field }) => (
                <div className="gi-flex gi-gap-3">
                  <InputRadio
                    id="contact-email"
                    name={field.name}
                    value="email"
                    label="Email"
                    checked={field.value === 'email'}
                    onChange={() => field.onChange('email')}
                  />
                  <InputRadio
                    id="contact-phone"
                    name={field.name}
                    value="phone"
                    label="Phone"
                    checked={field.value === 'phone'}
                    onChange={() => field.onChange('phone')}
                  />
                  <InputRadio
                    id="contact-other"
                    name={field.name}
                    value="other"
                    label="Other"
                    checked={field.value === 'other'}
                    onChange={() => field.onChange('other')}
                  />
                </div>
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

    const emailRadio = canvas.getByLabelText('Email');
    const phoneRadio = canvas.getByLabelText('Phone');
    const submitButton = canvas.getByTestId('submit-btn');
    const resetButton = canvas.getByTestId('reset-btn');

    await userEvent.click(submitButton);
    expect(canvas.getByTestId('error-msg')).toBeDefined();

    await userEvent.click(emailRadio);
    await userEvent.click(submitButton);
    expect(canvas.queryByTestId('error-msg')).toBeNull();

    await userEvent.click(resetButton);
    expect((emailRadio as HTMLInputElement).checked).toBe(false);
    expect((phoneRadio as HTMLInputElement).checked).toBe(false);

    await userEvent.click(document.body);
  },
};
