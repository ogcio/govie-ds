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
    content: {
      control: 'text',
      type: { name: 'string' },
      description: 'the raw HTML that the button will accept',
    },
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
    disabled: {
      control: 'boolean',
      description: 'Specify if the button is disabled',
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
    content: `<span data-testid="govie-icon" role="presentation" class="material-icons gi-block gi-text-[24px]">thumb_up</span> Button`,
  },
};

export const WithIconRight: Story = {
  args: {
    content: `Button <span data-testid="govie-icon" role="presentation" class="material-icons gi-block gi-text-[24px]">thumb_up</span>`,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    content: `Button`,
  },
};
