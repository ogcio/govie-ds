import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './checkbox.html?raw';
import { CheckboxSizeEnum, type CheckboxProps } from './checkboxes.schema';

// Name of the folder the macro resides
const path = import.meta.url.split('/checkbox')[0];

const macro = { name: 'govieCheckbox', html, path };

const Checkbox = renderComponent<CheckboxProps>(macro);

const meta = {
  component: Checkbox,
  title: 'form/Checkbox/Checkbox',
  parameters: {
    macro,
    docs: {
      description: {
        component: 'Checkboxes component',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    checkboxId: {
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
    disabled: {
      control: 'boolean',
      description: 'if true the component is disabled',
    },
  },
  args: {
    checkboxId: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
  },
};

export const withHint: Story = {
  args: {
    checkboxId: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    hint: 'This is a hint',
  },
};

export const withDefaultChecked: Story = {
  args: {
    checkboxId: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    checked: true,
  },
};

export const withoutLabel: Story = {
  args: {
    checkboxId: 'checkbox-id-1',
    value: 'value-1',
  },
};

export const smallCheckbox: Story = {
  args: {
    checkboxId: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    size: CheckboxSizeEnum.Small,
  },
};

export const mediumCheckbox: Story = {
  args: {
    checkboxId: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    size: CheckboxSizeEnum.Medium,
  },
};

export const largeCheckbox: Story = {
  args: {
    checkboxId: 'checkbox-id-1',
    value: 'value-1',
    label: 'Checkbox',
    size: CheckboxSizeEnum.Large,
  },
};
