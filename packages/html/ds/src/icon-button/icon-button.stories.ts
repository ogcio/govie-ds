import type { Meta, StoryObj } from '@storybook/react';
import { createIconButton } from '../helpers/buttons';
import { IconId } from '../icon/icon.schema';
import { beautifyHtmlNode } from '../storybook/storybook';
import { IconButtonProps } from './types';

const meta: Meta<IconButtonProps> = {
  title: 'Form/IconButton',
};

export default meta;
type Story = StoryObj<IconButtonProps>;

const createElement = (arguments_: IconButtonProps) => {
  const component = createIconButton(arguments_);
  return beautifyHtmlNode(component);
};

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
      icon: IconId.ThumbUp,
    },
  },
  render: (arguments_) => createElement(arguments_),
  
};

export const Small: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    size: 'small',
  },
  render: (arguments_) => createElement(arguments_),
  
};

export const Large: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    size: 'large',
  },
  render: (arguments_) => createElement(arguments_),
  
};

export const SecondaryButton: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    variant: 'secondary',
  },
  render: (arguments_) => createElement(arguments_),
  
};

export const FlatButton: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    variant: 'flat',
  },
  render: (arguments_) => createElement(arguments_),
  
};

export const Disabled: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
  
};
