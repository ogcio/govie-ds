import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './radio.html?raw';
import type { RadioProps } from './radio.schema';

const macro = { name: 'govieRadio', html };

const Radio = renderComponent<RadioProps>(macro);

const meta = {
  component: Radio,
  title: 'form/Radio/Radio',
  parameters: {
    macro,
    docs: {
      description: {
        component: 'Radio component',
      },
    },
  },
} satisfies Meta<typeof Radio>;

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

    checked: {
      control: 'boolean',
      description: 'if true the component is checked',
    },
  },
  args: {
    value: 'radio-value',
    label: 'Radio',
  },
};

export const withHint: Story = {
  args: {
    value: 'radio-with-hint',
    label: 'With hint',
    hint: 'This is a hint',
  },
};

export const withDefaultChecked: Story = {
  args: {
    value: 'radio-with-default-checked',
    label: 'Default checked',
    checked: true,
  },
};

export const withoutLabel: Story = {
  args: {
    value: 'radio-without-label',
  },
};
