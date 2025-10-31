import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../button/button.js';
import {
  FormField,
  FormFieldError,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { Icon } from '../icon/icon.js';
import { Link } from '../link/link.js';
import { Spinner } from '../spinner/spinner.js';
import { InputText } from './input-text.js';

const meta = {
  title: 'Form/InputText',
  parameters: {
    docs: {
      description: {
        component:
          'Use the InputText component for single-line text inputs like names or phone numbers. You can control the width using the `halfFluid`, `fullFluid`, or `characterWidth` properties.',
      },
    },
  },
  component: InputText,
  argTypes: {
    prefix: {
      description:
        'Element or text to display on the left side of the input, such as a unit or symbol.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    suffix: {
      description:
        'Element or text to display on the right side of the input, such as a unit or symbol.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    iconStart: {
      description: 'Optional icon displayed at the start of the input field.',
      control: 'text',
      table: {
        category: 'Visual',
        type: { summary: 'IconId | React.ReactNode' },
      },
    },
    iconEnd: {
      description: 'Optional icon displayed at the end of the input field.',
      control: 'text',
      table: {
        category: 'Visual',
        type: { summary: 'IconId | React.ReactNode' },
      },
    },
    inputActionButton: {
      description:
        'Optional action button rendered inside the input for custom actions.',
      control: false,
      table: {
        category: 'Behavior',
        type: {
          summary: `InputActionButtonProps`,
        },
      },
    },

    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLInputElement>' },
      },
    },
    type: {
      control: 'select',
      description: 'Specifies the input type.',
      options: [
        'text',
        'date',
        'datetime-local',
        'email',
        'month',
        'number',
        'password',
        'tel',
        'time',
        'url',
        'week',
      ],
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    disabled: {
      description: 'Disable input',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'Behavior' },
      },
    },
  },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: 'input-text-id' },
  render: (props) => (
    <FormField data-testid="form-field-id">
      <FormFieldLabel htmlFor="input-text-id">Label</FormFieldLabel>
      <InputText {...props} data-testid="input-text-id" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const formField = canvas.getByTestId(
      'form-field-id',
    ) as HTMLFieldSetElement;
    expect(formField).toBeDefined();
  },
};

export const Focus: Story = {
  render: () => (
    <FormField>
      <FormFieldLabel htmlFor="focus-input">Label Focus</FormFieldLabel>
      <InputText type="text" id="focus-input" inputClassName="focus-input" />
    </FormField>
  ),
  parameters: {
    pseudo: { focus: '.focus-input' },
  },
};

export const Disabled: Story = {
  args: { id: 'input-text-id', disabled: true },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">Label</FormFieldLabel>
      <InputText {...props} />
    </FormField>
  ),
};

export const WithLabelAndHint: Story = {
  args: { id: 'input-text-id' },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">Label</FormFieldLabel>
      <FormFieldHint>Hint: This is a helpful hint.</FormFieldHint>
      <InputText {...props} data-testid="input-text-id" />
    </FormField>
  ),
};

export const WithLabelAndError: Story = {
  args: { id: 'input-text-id' },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">Label</FormFieldLabel>
      <FormFieldError>Error: Please correct this issue.</FormFieldError>
      <InputText {...props} data-testid="input-text-id" />
    </FormField>
  ),
};

export const WithLabelHintAndError: Story = {
  args: { id: 'input-text-id', suffix: 'KG' },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">Label</FormFieldLabel>
      <FormFieldHint>Hint: This is a helpful hint.</FormFieldHint>
      <FormFieldError>Error: Please correct this issue.</FormFieldError>
      <InputText {...props} data-testid="input-text-id" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textInput = canvas.getByTestId('input-text-id') as HTMLInputElement;
    expect(globalThis.window.getComputedStyle(textInput).borderColor).toBe(
      'rgb(187, 37, 13)',
    );
    expect(canvas.getByText('Label')).toHaveClass('gi-label');
    expect(canvas.getByText('Hint: This is a helpful hint.')).toHaveClass(
      'gi-hint-text',
    );
    expect(canvas.getByText('Error: Please correct this issue.')).toHaveClass(
      'gi-error-text',
    );
  },
};

export const WithLabelHintAndErrorLegacy: Story = {
  args: { id: 'input-text-id', suffix: 'KG' },
  render: (props) => (
    <FormField
      data-testid="form-field-id"
      label={{ text: 'Label', htmlFor: 'input-text-id' }}
      hint={{ text: 'Hint: This is a helpful hint.' }}
      error={{ text: 'Error: Please correct this issue.' }}
    >
      <InputText {...props} data-testid="input-text-id" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const formField = canvas.getByTestId(
      'form-field-id',
    ) as HTMLFieldSetElement;
    expect(formField).toBeDefined();

    const textInput = canvas.getByTestId('input-text-id') as HTMLInputElement;
    expect(globalThis.window.getComputedStyle(textInput).borderColor).toBe(
      'rgb(187, 37, 13)',
    );
    expect(canvas.getByText('Label')).toHaveClass('gi-label');
    expect(canvas.getByText('Hint: This is a helpful hint.')).toHaveClass(
      'gi-hint-text',
    );
    expect(canvas.getByText('Error: Please correct this issue.')).toHaveClass(
      'gi-error-text',
    );
  },
};

export const WithLabelAndPrefixSuffix: Story = {
  args: { id: 'input-text-id', prefix: 'kg', suffix: 'per item' },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">Label</FormFieldLabel>
      <InputText {...props} data-testid="input-text-id" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('kg')).toHaveClass('gi-input-text-prefix');
    expect(canvas.getByText('per item')).toHaveClass('gi-input-text-suffix');
  },
};

export const InputLength: Story = {
  args: { id: 'input-text-id', maxLength: 4 },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">Label</FormFieldLabel>
      <InputText {...props} maxLength={4} />
    </FormField>
  ),
};

export const DateInput: Story = {
  args: { id: 'input-text-id', type: 'date', value: '2023-01-01' },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">Date input</FormFieldLabel>
      <InputText {...props} />
    </FormField>
  ),
};

export const WithHalfWidth: Story = {
  args: { id: 'input-text-id', halfFluid: true },
  render: (props) => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">Label</FormFieldLabel>
      <InputText {...props} />
    </FormField>
  ),
};

export const InputWithCustomActionButton: Story = {
  render: () => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <FormFieldHint>Support text</FormFieldHint>
      <InputText
        inputActionButton={{
          icon: 'info',
          onClick: () => alert('Action button clicked'),
        }}
        type="text"
        placeholder="Placeholder"
      />
    </FormField>
  ),
};

export const InputWithIcons: Story = {
  render: () => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <FormFieldHint>Support text</FormFieldHint>
      <InputText
        iconStart="placeholder"
        iconEnd="placeholder"
        placeholder="Placeholder"
      />
    </FormField>
  ),
};

export const InputWithLoadingIcon: Story = {
  tags: ['skip-playwright'],
  render: () => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <FormFieldHint>Support text</FormFieldHint>
      <InputText iconEnd={<Spinner size="md" />} placeholder="Placeholder" />
    </FormField>
  ),
};

export const InputWithIconsDisabled: Story = {
  render: () => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <InputText
        disabled
        iconStart="placeholder"
        iconEnd="placeholder"
        placeholder="Placeholder"
      />
    </FormField>
  ),
};

export const InputWithIconsFocus: Story = {
  render: () => (
    <FormField>
      <FormFieldLabel htmlFor="focus-input">Label</FormFieldLabel>
      <InputText
        type="text"
        id="focus-input"
        inputClassName="focus-input"
        iconStart="placeholder"
        iconEnd="placeholder"
        placeholder="Placeholder"
      />
    </FormField>
  ),
  parameters: {
    pseudo: { focus: '.focus-input' },
  },
};

export const InputWithPrefixSuffix: Story = {
  args: {
    prefix: '€',
    suffix: 'kg',
    iconStart: 'person',
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <InputText {...props} />
    </FormField>
  ),
};

export const InputWithPrefixSuffixError: Story = {
  render: () => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <FormFieldHint>Support text</FormFieldHint>
      <FormFieldError>Invalid</FormFieldError>
      <InputText
        iconStart="placeholder"
        iconEnd="placeholder"
        placeholder="Placeholder"
        prefix="€"
        suffix="kg"
      />
    </FormField>
  ),
};

export const InputWithPrefixSuffixDisabled: Story = {
  args: {
    disabled: true,
    prefix: '€',
    suffix: 'kg',
    placeholder: 'Placeholder',
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <InputText {...props} />
    </FormField>
  ),
};

export const InputWithPrefixSuffixFocus: Story = {
  args: {
    inputClassName: 'focus-input',
    prefix: '€',
    suffix: 'kg',
    iconStart: 'person',
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <InputText {...props} />
    </FormField>
  ),
  parameters: {
    pseudo: { focus: '.focus-input' },
  },
};

export const InputWithIconStartOnly: Story = {
  args: {
    iconStart: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <InputText {...props} />
    </FormField>
  ),
};

export const InputWithIconEndOnly: Story = {
  args: {
    iconEnd: 'person',
    placeholder: 'Placeholder',
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <InputText {...props} />
    </FormField>
  ),
};

export const WithTextInputReset: Story = {
  args: { id: 'input-text-id' },
  render: () => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">Input Label</FormFieldLabel>
      <InputText clearButtonEnabled placeholder="Placeholder" />
    </FormField>
  ),
};

export const WithTextInputSearch: Story = {
  args: { id: 'input-text-id' },
  render: () => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">Input Label</FormFieldLabel>
      <InputText type="search" placeholder="Placeholder" />
    </FormField>
  ),
};

export const WithRichHintText: Story = {
  args: { id: 'input-text-id' },
  render: () => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">Input Label</FormFieldLabel>
      <FormFieldHint>
        <div className="gi-flex">
          Here is a rich hint &nbsp;<Link href="#">Click here </Link>
          <Icon icon="arrow_drop_up" />
        </div>
      </FormFieldHint>
      <InputText type="search" placeholder="Placeholder" />
    </FormField>
  ),
};

export const WithRichErrorText: Story = {
  args: { id: 'input-text-id' },
  render: () => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">Input Label</FormFieldLabel>
      <FormFieldError>
        <div className="gi-flex">
          Error message &nbsp;
          <Icon icon="error" />
        </div>
      </FormFieldError>
      <InputText type="search" placeholder="Placeholder" />
    </FormField>
  ),
};

export const WithRichLabelText: Story = {
  args: { id: 'input-text-id' },
  render: () => (
    <FormField>
      <FormFieldLabel htmlFor="input-text-id">
        <div className="gi-flex">
          Label message &nbsp;
          <Icon icon="info" />
        </div>
      </FormFieldLabel>
      <InputText type="search" placeholder="Placeholder" />
    </FormField>
  ),
};

export const InputSearch: Story = {
  args: {
    type: 'search',
    placeholder: 'Placeholder',
  },
  render: (props) => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <InputText {...props} />
    </FormField>
  ),
};

export const WithReactHookForm: Story = {
  tags: ['skip-playwright'],
  render: () => {
    const methods = useForm<{ username: string }>({
      defaultValues: { username: '' },
    });

    const onSubmit = methods.handleSubmit((_) => {
      methods.reset({ username: '' });
    });

    return (
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <FormField>
            {methods.formState.errors.username && (
              <FormFieldError dataTestid="error-msg">
                {methods.formState.errors.username.message}
              </FormFieldError>
            )}
            <FormFieldLabel htmlFor="input-text-id">Username</FormFieldLabel>
            <InputText
              id="input-text-id"
              {...methods.register('username', { required: 'Required' })}
              data-testid="input-text-id"
            />
          </FormField>
          <div className="gi-flex gi-flex-cols gi-gap-2 gi-pt-4">
            <Button type="submit" dataTestid="submit-btn">
              Submit
            </Button>
            <Button onClick={() => methods.reset()} dataTestid="reset-btn">
              Reset
            </Button>
          </div>
        </form>
      </FormProvider>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByTestId('input-text-id');
    const submitButton = canvas.getByTestId('submit-btn');

    await userEvent.type(input, 'John');
    await userEvent.click(submitButton);
    expect(canvas.queryByTestId('error-msg')).toBeNull();

    await userEvent.click(submitButton);
    expect((input as HTMLInputElement).value).toBe('');
    expect(canvas.getByTestId('error-msg')).toBeDefined();

    await userEvent.type(input, 'John');
    await userEvent.click(submitButton);
    expect(canvas.queryByTestId('error-msg')).toBeNull();

    await userEvent.click(document.body);
  },
};
