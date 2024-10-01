import type { Meta, StoryObj } from '@storybook/react';
import { IconId } from '../icon/icon.schema';
import { renderComponent } from '../storybook/storybook';
import { ButtonProps } from './button-schema';
import { ButtonVariant, ButtonSize, IconPosition } from './button-schema';
import html from './button.html?raw';

// Name of the folder the macro resides
const path = import.meta.url.split('/button')[0];

const macro = { name: 'govieButton', html, path };

const Button = renderComponent<ButtonProps>(macro);

const meta = {
  component: Button,
  title: 'form/Button',
  parameters: {
    macro,
  },
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
    },
    icon: {
      control: 'object',
      description: 'Add an icon to the button (See Icon Component)',
    },
  },
  args: {
    label: 'Button',
    variant: ButtonVariant.Primary,
  },
};

export const WithIcon: Story = {
  args: {
    icon: {
      props: {
        icon: IconId.ThumbUp,
      },
    },
    label: 'Button',
  },
};

export const WithIconRight: Story = {
  args: {
    icon: {
      props: {
        icon: IconId.ThumbUp,
      },
      position: IconPosition.Right,
    },
    label: 'Button',
  },
};

export const WithoutLabel: Story = {
  args: {
    icon: {
      props: {
        icon: IconId.ThumbUp,
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Button',
  },
};
