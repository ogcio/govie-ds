import type { Meta, StoryObj } from '@storybook/react';
import { IconSize } from '../icon/icon.schema';
import { renderComponent } from '../storybook/storybook';
import html from './spinner.html?raw';
import { SpinnerProps } from './spinner.schema';

const macro = { name: 'govieSpinner', html };

const Spinner = renderComponent<SpinnerProps>(macro);

const meta = {
  component: Spinner,
  title: 'indicators/Spinner',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(IconSize),
      description: 'Specify the size of the spinner',
    },
    inline: {
      control: 'boolean',
      description: 'View the spinner as inline',
    },
  },
  args: {},
};

export const Small: Story = {
  args: {
    size: IconSize.Small,
  },
};

export const Large: Story = {
  args: {
    size: IconSize.Large,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: IconSize.ExtraLarge,
  },
};
