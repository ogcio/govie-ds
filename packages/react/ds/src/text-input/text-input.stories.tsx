import type { Meta, StoryObj } from '@storybook/react';
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
    label: {
      description: 'Label associated with the input.',
      control: 'object',
      table: {
        category: 'Label',
        type: { summary: 'Label' },
      },
    },
    hint: {
      description: 'Hint text for the input to provide additional information.',
      control: 'object',
      table: {
        category: 'Hint',
        type: { summary: 'HintText' },
      },
    },
    error: {
      description:
        'Error message for the input, displayed when there is a validation error.',
      control: 'object',
      table: {
        category: 'Error',
        type: { summary: 'ErrorText' },
      },
    },
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
    label: {
      text: 'Input Label',
      htmlFor: 'text-input-id',
    },
    hint: {
      text: '',
    },
    error: {
      text: '',
    },
  },
};

export const ResponsiveLayout: Story = {
  args: {
    id: 'text-input-id',
    label: {
      text: 'Input Label',
      htmlFor: 'text-input-id',
    },
  },
  render: (props) => {
    return (
      <div className="md:gi-w-2/3 gi-w-full">
        <Stack direction={{ base: 'column' }} gap={3}>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <TextInput
              {...props}
              id="text-1"
              label={{ text: 'First Name' }}
              hint={{
                text: 'Your first name.',
              }}
            />
            <TextInput
              {...props}
              id="text-2"
              label={{
                text: 'Last Name',
              }}
              hint={{
                text: 'Your last name.',
              }}
            />
          </Stack>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <TextInput
              {...props}
              label={{
                text: 'Address',
              }}
              hint={{
                text: 'Where you live.',
              }}
              id="text-4"
              maxLength={5}
            />
          </Stack>

          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <TextInput
              id="text-input-id"
              label={{
                htmlFor: 'text-input-id',
                text: 'Date of birth',
              }}
              type="date"
              hint={{
                text: 'Your date of birth.',
              }}
            />

            <TextInput
              id="text-input-id"
              label={{
                htmlFor: 'text-input-id',
                text: 'Height',
              }}
              prefix="cm"
              hint={{
                text: 'Your height',
              }}
            />
            <div className="gi-w-full sm:gi-w-[80px] gi-flex-none">
              <TextInput
                {...props}
                maxLength={3}
                label={{
                  text: 'Age',
                }}
                hint={{
                  text: 'Your Age.',
                }}
                id="text-4"
              />
            </div>
          </Stack>
          <TextInput
            {...props}
            label={{
              text: 'Phone Number',
            }}
            hint={{
              text: 'Your phone number.',
            }}
            error={{
              text: 'Error: Please correct this issue.',
            }}
            id="text-4"
            pattern="\d*"
            maxLength={10}
          />
        </Stack>
      </div>
    );
  },
};

export const WithLabelAndHint: Story = {
  args: {
    id: 'text-input-id',
    label: {
      text: 'Label',
      htmlFor: 'text-input-id',
    },
    hint: {
      text: 'Hint: This is a helpful hint.',
    },
  },
};

export const WithLabelAndError: Story = {
  args: {
    id: 'text-input-id',
    label: {
      text: 'Label',
      htmlFor: 'text-input-id',
    },
    error: {
      text: 'Error: Please correct this issue.',
    },
  },
};

export const WithLabelHintAndError: Story = {
  args: {
    id: 'text-input-id',
    label: {
      text: 'Label',
      htmlFor: 'text-input-id',
    },
    hint: {
      text: 'Hint: This is a helpful hint.',
    },
    error: {
      text: 'Error: Please correct this issue.',
    },
    suffix: 'KG',
  },
};

export const WithLabelAndPrefixSuffix: Story = {
  args: {
    id: 'text-input-id',
    label: {
      text: 'Label',
      htmlFor: 'text-input-id',
    },
    prefix: 'kg',
    suffix: 'per item',
  },
};

export const InputLength: Story = {
  args: {
    id: 'text-input-id',
    label: {
      text: '4 characters width',
      htmlFor: 'text-input-id',
    },
    maxLength: 4,
  },
  render: (props) => {
    return (
      <div className="gi-w-[65px]">
        <TextInput
          {...props}
          maxLength={4}
          label={{
            text: '4 Chars',
          }}
          id="text-4"
        />
      </div>
    );
  },
};

export const DateInput: Story = {
  args: {
    id: 'text-input-id',
    label: {
      text: 'Date input',
      htmlFor: 'text-input-id',
    },
    type: 'date',
  },
};

export const DisabledInput: Story = {
  args: {
    label: {
      text: 'Disabled',
      htmlFor: 'text-input-id',
    },
    id: 'text-input-id',
    disabled: true,
    value: 'This field is disabled',
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
      <TextInput
        label={{ text: 'Default', htmlFor: 'default-input' }}
        type="text"
        id="default-input"
      />
      <TextInput
        label={{ text: 'Focus', htmlFor: 'focus-input' }}
        type="text"
        id="focus-input"
      />
      <TextInput
        label={{ text: 'Disabled', htmlFor: 'input-disabled' }}
        value="This field is disabled"
        type="text"
        id="input-disabled"
        disabled
      />
    </div>
  ),
  parameters: {
    pseudo: {
      focus: '#focus-input',
    },
  },
};
