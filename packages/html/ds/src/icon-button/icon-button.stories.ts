import type { Meta, StoryObj } from '@storybook/react';
import { ButtonSize, ButtonVariant } from '../button/button.schema';
import { IconId } from '../icon/icon.schema';
import { renderComponent } from '../storybook/storybook';
import html from './icon-button.html?raw';
import { iconButtonProps } from './icon-button.schema';

const macro = { name: 'govieIconButton', html };

const IconButton = renderComponent<iconButtonProps>(macro);

const meta = {
  component: IconButton,
  title: 'form/IconButton',
  parameters: {
    macro,
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
      icon: IconId.ThumbUp,
    },
  },
};

export const Small: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    size: ButtonSize.Small,
  },
};

export const Large: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    size: ButtonSize.Large,
  },
};

export const SecondaryButton: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    variant: ButtonVariant.Secondary,
  },
};

export const FlatButton: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    variant: ButtonVariant.Flat,
  },
};

export const Disabled: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    disabled: true,
  },
};
