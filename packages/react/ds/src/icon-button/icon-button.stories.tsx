import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconButton } from './icon-button.js';

const meta = {
  title: 'form/IconButton',
  decorators: (Story, context) => {
    const isLight = context?.args?.appearance === 'light' && 'gi-bg-black';
    return (
      <div className={`gi-p-4 ${isLight}`}>
        <Story />
      </div>
    );
  },
  component: IconButton,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    icon: {
      control: 'text',
      type: { name: 'string' },
      description: 'The Icon component that the button will accept',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'flat'],
      description: 'The variants of the button',
    },
    appearance: {
      control: 'radio',
      options: ['default', 'dark', 'light'],
      description: 'The description of the button',
      type: 'string',
    },
    size: {
      control: 'radio',
      options: ['medium', 'small', 'large'],
      type: { name: 'string' },
      description: 'The sizes of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Specify if the button is disabled',
      type: 'boolean',
    },
  },
  args: {
    icon: {
      icon: 'thumb_up',
    },
  },
};

export const Small: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    size: 'large',
  },
};

export const SecondaryButton: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    variant: 'secondary',
  },
};

export const FlatButton: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    variant: 'flat',
  },
};

export const Disabled: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    disabled: true,
  },
};
