import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './button.html?raw';
import { ButtonProps } from './button-schema';

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
  args: {},
};
