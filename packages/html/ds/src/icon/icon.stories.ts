import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './icon.html?raw';
import { IconId, IconProps, IconSize } from './icon.schema';

const macro = { name: 'govieIcon', html };

const Icon = renderComponent<IconProps>(macro);

const meta = {
  component: Icon,
  title: 'components/Icon',
  parameters: {
    macro,
  },
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
      options: Object.values(IconSize),
      description: 'Specify the size of the icon',
    },
    outlined: {
      control: 'boolean',
      description: 'Specify if the icon has an outline style',
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
    icon: IconId.ThumbUp,
  },
};

export const Small: Story = {
  args: {
    icon: IconId.ThumbUp,
    size: IconSize.Small,
  },
};

export const Large: Story = {
  args: {
    icon: IconId.ThumbUp,
    size: IconSize.Large,
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: IconId.ThumbUp,
    size: IconSize.ExtraLarge,
  },
};

export const Outlined: Story = {
  args: {
    icon: IconId.ThumbUp,
    outlined: true,
  },
};

export const Disabled: Story = {
  args: {
    icon: IconId.ThumbUp,
    disabled: true,
  },
};

export const AriaHidden: Story = {
  args: {
    icon: IconId.ThumbUp,
    ariaHidden: true,
  },
};

export const AriaLabel: Story = {
  args: {
    icon: IconId.ThumbUp,
    ariaLabel: 'Thumbs up',
  },
};
