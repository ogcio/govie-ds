import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import { ButtonAppearance, ButtonProps } from './button-schema';
import { ButtonVariant, ButtonSize } from './button-schema';
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
    appearance: {
      control: 'radio',
      options: Object.values(ButtonAppearance),
      description: 'The description of the button',
      type: 'string',
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
      type: 'boolean',
    },
    icon: {
      control: 'object',
      description: 'Add an icon to the button (See Icon Component)',
      type: 'string',
    },
    iconEnd: {
      control: 'boolean',
      description: 'Specify if the icon should be at the end of the button',
      type: 'boolean',
    },
  },
  args: {
    content: 'Button',
    variant: ButtonVariant.Primary,
  },
};

export const WithIcon: Story = {
  args: {
    content: `<span role="presentation" class=" material-icons  gi-block 24px" style="font-size: 24px;">thumb_up</span> Button`,
  },
};

export const WithIconRight: Story = {
  args: {
    content: `Button <span role="presentation" class=" material-icons  gi-block 24px" style="font-size: 24px;">thumb_up</span>`,
  },
};

export const WithoutLabel: Story = {
  args: {
    content: `<span role="presentation" class=" material-icons  gi-block 24px" style="font-size: 24px;">thumb_up</span>`,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    content: `Button`,
  },
};
