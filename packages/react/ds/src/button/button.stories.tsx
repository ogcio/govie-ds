import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../icon/icon.js';
import { Button } from './button.js';
import { ButtonAppearance, ButtonVariant, ButtonSize } from './types.js';

const meta = {
  title: 'Form/Button',
  decorators: (Story, context) => {
    const isLight = context?.args?.appearance === 'light' && 'gi-bg-black';
    return (
      <div className={`gi-p-4 ${isLight}`}>
        <Story />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        component: 'use this button where it is appropiate',
      },
    },
  },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    variant: {
      control: 'radio',
      options: Object.values(ButtonVariant),
      description: 'The variants of the button',
    },
    appearance: {
      control: 'radio',
      options: Object.values(ButtonAppearance),
      description: 'The description of the button',
      type: 'string',
    },
    size: {
      control: 'radio',
      options: Object.values(ButtonSize),
      type: { name: 'string' },
      description: 'The sizes of the button',
    },
    label: {
      control: 'text',
      type: { name: 'string' },
      description: 'Label of the Button',
    },
    disabled: {
      control: 'boolean',
      description: 'Specify if the button is disabled',
      type: 'boolean',
    },
    icon: {
      control: 'object',
      description: 'Add an icon to the button (See Icon Component)',
      type: 'string',
    },
    iconEnd: {
      control: 'boolean',
      description: 'Specify if the icon should be at the end of the button',
      type: 'boolean',
    },
  },
  args: {
    label: 'Button',
    variant: ButtonVariant.Primary,
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Icon icon="thumb_up" />,
    label: 'Button',
  },
};

export const WithIconRight: Story = {
  args: {
    icon: <Icon icon="thumb_up" />,
    iconEnd: true,
    label: 'Button',
  },
};

export const WithoutLabel: Story = {
  args: {
    icon: <Icon icon="thumb_up" />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Button',
  },
};
