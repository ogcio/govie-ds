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
    characterWidth: {
      description:
        'Sets the width of the input in terms of the number of characters it can contain.',
      control: 'number',
      table: {
        category: 'Width Control',
        type: { summary: 'number' },
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

export const ResponsiveWidth: Story = {
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
            <TextInput {...props} id="text-1" label={{ text: 'Fluid width' }} />
            <TextInput
              {...props}
              id="text-2"
              label={{
                text: 'Input custom width',
              }}
              inputCustomClassName="gi-w-full sm:gi-w-[200px]"
            />
          </Stack>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <TextInput
              {...props}
              label={{
                text: 'Custom width',
              }}
              id="text-4"
              inputCustomClassName="gi-w-full sm:gi-w-[100px]"
            />
          </Stack>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <TextInput
              {...props}
              label={{
                text: 'Char Width',
              }}
              id="text-4"
              maxLength={5}
              characterWidth={5}
            />
          </Stack>
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

export const HalfFluid: Story = {
  args: {
    id: 'text-input-id',
    label: {
      text: 'Half Fluid Input',
      htmlFor: 'text-input-id',
    },
  },
};

export const FullFluid: Story = {
  args: {
    id: 'text-input-id',
    label: {
      text: 'Full Fluid Input',
      htmlFor: 'text-input-id',
    },
  },
};

export const CharacterWidth: Story = {
  args: {
    id: 'text-input-id',
    label: {
      text: '4 characters width',
      htmlFor: 'text-input-id',
    },
    characterWidth: 4,
    maxLength: 4,
  },
};

export const DateInput: Story = {
  args: {
    id: 'text-input-id',
    label: {
      text: '4 characters width',
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
