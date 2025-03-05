import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { FormField } from '../forms/form-field.js';
import { Stack } from '../stack/stack.js';
import { TextInput } from './text-input.js';

const meta = {
  title: 'Form/TextInput',
  parameters: {
    docs: {
      description: {
        component:
          'Use the TextInput component for single-line text inputs like names or phone numbers. You can control the width using the `halfFluid`, `fullFluid`, or `characterWidth` properties.',
      },
    },
  },
  component: TextInput,
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
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'text-input-id',
  },
  render: (props) => (
    <>
      <FormField
        label={{
          text: 'Input Label',
          htmlFor: 'text-input-id',
        }}
      >
        <TextInput {...props} data-testid="text-input-id" />
      </FormField>
    </>
  ),
};

export const ResponsiveLayout: Story = {
  args: {
    id: 'text-input-id',
  },
  render: (props) => {
    return (
      <div className="md:gi-w-2/3 gi-w-full">
        <Stack direction={{ base: 'column' }} gap={3}>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <FormField
              label={{ text: 'First Name', htmlFor: 'text-1' }}
              hint={{
                text: 'Your first name.',
              }}
            >
              <TextInput {...props} id="text-1" />
            </FormField>
            <FormField
              label={{ text: 'Last Name', htmlFor: 'text-2' }}
              hint={{
                text: 'Your last name.',
              }}
            >
              <TextInput {...props} id="text-2" />
            </FormField>
          </Stack>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <FormField
              label={{
                text: 'Address',
              }}
              hint={{
                text: 'Where you live.',
              }}
            >
              <TextInput {...props} id="text-4" maxLength={5} />
            </FormField>
          </Stack>

          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <FormField
              label={{
                htmlFor: 'text-input-id',
                text: 'Date of birth',
              }}
              hint={{
                text: 'Your date of birth.',
              }}
            >
              <TextInput id="text-input-id" type="date" />
            </FormField>

            <FormField
              label={{
                htmlFor: 'text-input-id',
                text: 'Height',
              }}
              hint={{
                text: 'Your height',
              }}
            >
              <TextInput id="text-input-id" prefix="cm" />
            </FormField>
            <div className="gi-w-full sm:gi-w-[80px] gi-flex-none">
              <FormField
                label={{
                  text: 'Age',
                }}
                hint={{
                  text: 'Your Age.',
                }}
              >
                <TextInput {...props} maxLength={3} id="text-4" />
              </FormField>
            </div>
          </Stack>
          <FormField
            label={{
              text: 'Phone Number',
            }}
            hint={{
              text: 'Your phone number.',
            }}
            error={{
              text: 'Error: Please correct this issue.',
            }}
          >
            <TextInput {...props} id="text-4" pattern="\d*" maxLength={10} />
          </FormField>
        </Stack>
      </div>
    );
  },
};

export const WithLabelAndHint: Story = {
  args: {
    id: 'text-input-id',
  },
  render: (props) => (
    <>
      <FormField
        label={{
          text: 'Label',
          htmlFor: 'text-input-id',
        }}
        hint={{
          text: 'Hint: This is a helpful hint.',
        }}
      >
        <TextInput {...props} data-testid="text-input-id" />
      </FormField>
    </>
  ),
};

export const WithLabelAndError: Story = {
  args: {
    id: 'text-input-id',
  },
  render: (props) => (
    <>
      <FormField
        label={{
          text: 'Label',
          htmlFor: 'text-input-id',
        }}
        error={{
          text: 'Error: Please correct this issue.',
        }}
      >
        <TextInput {...props} data-testid="text-input-id" />
      </FormField>
    </>
  ),
};

export const WithLabelHintAndError: Story = {
  args: {
    id: 'text-input-id',
    suffix: 'KG',
  },
  render: (props) => (
    <>
      <FormField
        label={{
          text: 'Label',
          htmlFor: 'text-input-id',
        }}
        hint={{
          text: 'Hint: This is a helpful hint.',
        }}
        error={{
          text: 'Error: Please correct this issue.',
        }}
      >
        <TextInput {...props} data-testid="text-input-id" />
      </FormField>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textInput = canvas.getByTestId('text-input-id') as HTMLInputElement;
    expect(window.getComputedStyle(textInput).borderColor).toBe(
      'rgb(187, 37, 13)', //'var(--gieds-color-red-600)',
    );

    const label = canvas.getByText('Label');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');
    expect(label.getAttribute('for')).toBe(textInput.getAttribute('id'));

    const hint = canvas.getByText('Hint: This is a helpful hint.');
    expect(hint).toBeTruthy();
    expect(hint).toHaveClass('gi-hint-text');

    const error = canvas.getByText('Error: Please correct this issue.');
    expect(error).toBeTruthy();
    expect(error).toHaveClass('gi-error-text');
  },
};

export const WithLabelAndPrefixSuffix: Story = {
  args: {
    id: 'text-input-id',
    prefix: 'kg',
    suffix: 'per item',
  },
  render: (props) => (
    <>
      <FormField
        label={{
          text: 'Label',
          htmlFor: 'text-input-id',
        }}
      >
        <TextInput {...props} data-testid="text-input-id" />
      </FormField>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const prefix = canvas.getByText('kg');
    expect(prefix).toBeTruthy();
    expect(prefix).toHaveClass('gi-text-input-prefix');

    const suffix = canvas.getByText('per item');
    expect(suffix).toBeTruthy();
    expect(suffix).toHaveClass('gi-text-input-suffix');
  },
};

export const InputLength: Story = {
  args: {
    id: 'text-input-id',
    maxLength: 4,
  },
  render: (props) => {
    return (
      <FormField
        label={{
          text: '4 characters width',
          htmlFor: 'text-input-id',
        }}
      >
        <TextInput {...props} maxLength={4} id="text-4" />
      </FormField>
    );
  },
};

export const DateInput: Story = {
  args: {
    id: 'text-input-id',
    type: 'date',
  },
  render: (props) => {
    return (
      <FormField
        label={{
          text: 'Date input',
          htmlFor: 'text-input-id',
        }}
      >
        <TextInput {...props} id="text-4" />
      </FormField>
    );
  },
};

export const DisabledInput: Story = {
  args: {
    id: 'text-input-id',
    disabled: true,
    value: 'This field is disabled',
  },
  render: (props) => {
    return (
      <FormField
        label={{
          text: 'Disabled',
          htmlFor: 'text-input-id',
        }}
        hint={{
          text: 'Hint: This is a helpful hint.',
        }}
      >
        <TextInput {...props} id="text-4" />
      </FormField>
    );
  },
};

export const WithHalfWidth: Story = {
  args: {
    id: 'text-input-id',
    halfFluid: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="gi-gap-4">
      <FormField
        label={{
          text: 'Default',
          htmlFor: 'default-input',
        }}
      >
        <TextInput type="text" id="default-input" />
      </FormField>
      <br />
      <FormField
        label={{
          text: 'Focused',
          htmlFor: 'focus-input',
        }}
      >
        <TextInput type="text" id="focus-input" />
      </FormField>
      <br />
      <FormField
        label={{
          text: 'Disabled',
          htmlFor: 'input-disabled',
        }}
      >
        <TextInput
          value="This field is disabled"
          type="text"
          id="input-disabled"
          disabled
        />
      </FormField>
    </div>
  ),
  parameters: {
    pseudo: {
      focus: '#focus-input',
    },
  },
};
