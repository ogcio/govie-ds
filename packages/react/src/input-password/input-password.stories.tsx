import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { userEvent, within, expect } from 'storybook/test';
import { Button } from '../button/button.js';
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

export const WithReactHookForm: Story = {
  tags: ['skip-playwright'],
  render: () => {
    const methods = useForm<{ password: string }>({
      defaultValues: { password: '' },
    });

    const onSubmit = methods.handleSubmit((_) => {
      methods.reset();
    });

    return (
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <FormField data-testid="form-field-id">
            {methods.formState.errors.password && (
              <FormFieldError data-testid="error-msg">
                {methods.formState.errors.password.message}
              </FormFieldError>
            )}
            <FormFieldLabel htmlFor="text-password-id">Password</FormFieldLabel>
            <InputPassword
              id="text-password-id"
              placeholder="Placeholder"
              dataTestId="text-password-id"
              {...methods.register('password', { required: 'Required' })}
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

    const passwordInput = canvas.getByTestId('text-password-id');
    const submitButton = canvas.getByTestId('submit-btn');
    const resetButton = canvas.getByTestId('reset-btn');

    await userEvent.click(submitButton);
    expect(canvas.getByTestId('error-msg')).toBeDefined();

    await userEvent.type(passwordInput, 'MySecret123!');
    const formField = canvas.getByTestId('form-field-id');
    const visibilityButton = within(formField).getByRole('button');
    await userEvent.click(visibilityButton);
    expect((passwordInput as HTMLInputElement).type).toBe('text');

    await userEvent.click(submitButton);
    expect(canvas.queryByTestId('error-msg')).toBeNull();

    await userEvent.click(resetButton);
    expect((passwordInput as HTMLInputElement).value).toBe('');
    await userEvent.click(document.body);
  },
};

const inputPasswordRefCallback = (element: HTMLInputElement | null) => {
  if (element) {
    (
      globalThis as unknown as { __inputPasswordRef?: HTMLInputElement }
    ).__inputPasswordRef = element;
    element.dataset.refSeen = 'true';
  }
};

export const TestRefForwarding: Story = {
  tags: ['skip-playwright'],
  render: () => {
    return (
      <FormField>
        <FormFieldLabel htmlFor="ref-input-id">Password Input</FormFieldLabel>
        <InputPassword id="ref-input-id" ref={inputPasswordRefCallback} />
      </FormField>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should support ref forwarding to the underlying input element',
      async () => {
        const inputElement = canvas.getByLabelText(
          'Password Input',
        ) as HTMLInputElement;
        const storedRef = (
          globalThis as unknown as { __inputPasswordRef?: HTMLInputElement }
        ).__inputPasswordRef;

        expect(storedRef).toBe(inputElement);
      },
    );
  },
};

export const TestVisibility: Story = {
  tags: ['skip-playwright'],
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should render a password input with a visibility toggle button',
      async () => {
        const passwordInputElement = canvas.getByTestId(
          'text-password-id',
        ) as HTMLInputElement;
        const visibilityToggleButtonElement = canvas.getByRole('button');

        expect(passwordInputElement).toBeInTheDocument();
        expect(passwordInputElement.type).toBe('password');
        expect(visibilityToggleButtonElement).toBeInTheDocument();
      },
    );

    await step(
      'should toggle input type between password and text when clicking the visibility button',
      async () => {
        const passwordInputElement = canvas.getByTestId(
          'text-password-id',
        ) as HTMLInputElement;
        const visibilityToggleButtonElement = canvas.getByRole('button');

        await userEvent.click(visibilityToggleButtonElement);
        expect(passwordInputElement.type).toBe('text');

        await userEvent.click(visibilityToggleButtonElement);
        expect(passwordInputElement.type).toBe('password');
      },
    );
  },
};
