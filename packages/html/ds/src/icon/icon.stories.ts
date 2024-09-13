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

export const Small: Story = {
  args: {
    icon: IconId.ThumbUp,
    size: IconSize.Small,
  },
};

export const Default: Story = {
  args: {
    icon: IconId.ThumbUp,
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
