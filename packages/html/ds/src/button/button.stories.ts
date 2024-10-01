import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './button.html?raw';
import { ButtonProps } from './button-schema';
import { ButtonVariant, ButtonSize } from './button-schema';
import { IconId, IconSize } from '../icon/icon.schema';

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
  args: {
    variant: ButtonVariant.Primary,
  },
};

export const Icon: Story = {
  args: {
    icon: {
      props: {
        icon: IconId.ThumbUp,
      },
    },
    label: 'Primary Button',
    disabled: true,
  },
};

export const IconRight: Story = {
  args: {
    icon: {
      props: {
        icon: IconId.ThumbUp,
      },
      position: 'right',
    },
  },
};

export const Large: Story = {
  args: {
    size: ButtonSize.Large,
    icon: {
      props: {
        icon: IconId.ThumbUp,
      },
    },
    disabled: true
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.Secondary,
    icon: {
      props: {
        icon: IconId.ThumbUp,
      },
    },
  },
};

export const Tertiary: Story = {
  args: {
    variant: ButtonVariant.Tertiary,
    icon: {
      props: {
        icon: IconId.ThumbUp,
      },
    },
  },
};

export const Flat: Story = {
  args: {
    variant: ButtonVariant.Flat,
    icon: {
      props: {
        icon: IconId.ThumbUp,
      },
    },
  },
};

export const Outlined: Story = {
  args: {
    variant: ButtonVariant.Outlined,
    icon: {
      props: {
        icon: IconId.ThumbUp,
      },
    },
  },
};
