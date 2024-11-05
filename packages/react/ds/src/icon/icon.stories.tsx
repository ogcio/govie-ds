import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon.js';

const meta = {
  title: 'components/Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    icon: {
      control: 'text',
      description: 'Specify the name of the icon',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Specify the size of the icon',
    },
    filled: {
      control: 'boolean',
      description: 'Specify if the icon has a filled style',
    },
    disabled: {
      control: 'boolean',
      description: 'Specify if the icon is disabled',
    },
    ariaHidden: {
      control: 'text',
      description: 'Hide non-interactive content from the accessibility',
    },
    ariaLabel: {
      control: 'text',
      description:
        'Define a string value that can be used to name an element (for accessibilty purposes)',
    },
    inline: {
      control: 'boolean',
      description: 'View the icon as inline',
    },
  },
  args: {
    icon: 'thumb_up',
  },
};

export const Small: Story = {
  args: {
    icon: 'thumb_up',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    icon: 'thumb_up',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: 'thumb_up',
    size: 'xl',
  },
};

export const Filled: Story = {
  args: {
    icon: 'thumb_up',
    filled: true,
  },
};

export const Disabled: Story = {
  args: {
    icon: 'thumb_up',
    disabled: true,
  },
};

export const AriaHidden: Story = {
  args: {
    icon: 'thumb_up',
    ariaHidden: true,
  },
};

export const AriaLabel: Story = {
  args: {
    icon: 'thumb_up',
    ariaLabel: 'Thumbs up',
  },
};
