import type { Meta, StoryObj } from '@storybook/react';
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

export const LargeCheckbox: Story = {
  args: {
    id: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    size: InputCheckboxSizeEnum.Large,
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

export const IndeterminateLarge: Story = {
  args: {
    indeterminate: true,
    id: 'checkbox-id-indeterminate',
    value: 'value-2',
    label: 'Checkbox',
    size: 'lg',
  },
};
