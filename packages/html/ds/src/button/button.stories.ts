import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { createButton } from '../helpers/buttons';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ButtonProps } from './types';

const meta: Meta<ButtonProps> = {
  title: 'Form/Button',
};

export default meta;
type Story = StoryObj<ButtonProps>;

const createElement = (arguments_: ButtonProps) => {
  const component = createButton(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  argTypes: {
    content: {
      control: 'text',
      type: { name: 'string' },
      description: 'The content that the button will accept',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'flat'],
      description: 'The variants of the button',
    },
    appearance: {
      control: 'radio',
      options: ['default', 'dark', 'light'],
      description: 'The appearance of the button',
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
    content: 'Button',
    variant: 'primary',
    appearance: 'default',
    size: 'medium',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.hover(button);
    await userEvent.click(button);
  },
};

export const Primary: Story = {
  args: {
    content: `Primary Button`,
    appearance: 'default',
    size: 'medium',
  },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryHover: Story = {
  args: {
    content: `Primary Button (Hover)`,
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryFocus: Story = {
  args: {
    content: `Primary Button (Focused)`,
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryDisabled: Story = {
  args: {
    content: `Primary Button (Disabled)`,
    appearance: 'default',
    size: 'medium',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryLight: Story = {
  args: {
    content: `Primary Light Button`,
    appearance: 'light',
    size: 'medium',
  },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryLightHover: Story = {
  args: {
    content: `Primary Light Button (Hover)`,
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryLightFocus: Story = {
  args: {
    content: `Primary Light Button (Focused)`,
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryLightDisabled: Story = {
  args: {
    content: `Primary Light Button (Disabled)`,
    appearance: 'light',
    size: 'medium',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryDark: Story = {
  args: {
    content: `Primary Dark Button`,
    appearance: 'dark',
    size: 'medium',
  },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryDarkHover: Story = {
  args: {
    content: `Primary Dark Button (Hover)`,
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryDarkFocus: Story = {
  args: {
    content: `Primary Dark Button (Focused)`,
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryDarkDisabled: Story = {
  args: {
    content: `Primary Dark Button (Disabled)`,
    appearance: 'dark',
    size: 'medium',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const Secondary: Story = {
  args: {
    content: `Secondary Button`,
    variant: 'secondary',
    appearance: 'default',
    size: 'medium',
  },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryHover: Story = {
  args: {
    content: `Secondary Button (Hover)`,
    variant: 'secondary',
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryFocus: Story = {
  args: {
    content: `Secondary Button (Focused)`,
    variant: 'secondary',
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryDisabled: Story = {
  args: {
    content: `Secondary Button (Disabled)`,
    variant: 'secondary',
    appearance: 'default',
    size: 'medium',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryLight: Story = {
  args: {
    content: `Secondary Light Button`,
    appearance: 'light',
    size: 'medium',
  },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryLightHover: Story = {
  args: {
    content: `Secondary Light Button (Hover)`,
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryLightFocus: Story = {
  args: {
    content: `Secondary Light Button (Focused)`,
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryLightDisabled: Story = {
  args: {
    content: `Secondary Light Button (Disabled)`,
    appearance: 'light',
    size: 'medium',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryDark: Story = {
  args: {
    content: `Secondary Dark Button`,
    appearance: 'dark',
    size: 'medium',
  },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryDarkHover: Story = {
  args: {
    content: `Secondary Dark Button (Hover)`,
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryDarkFocus: Story = {
  args: {
    content: `Secondary Dark Button (Focused)`,
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryDarkDisabled: Story = {
  args: {
    content: `Secondary Dark Button (Disabled)`,
    appearance: 'dark',
    size: 'medium',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const Flat: Story = {
  args: {
    content: `Flat Button`,
    variant: 'flat',
    appearance: 'default',
    size: 'medium',
  },
  render: (arguments_) => createElement(arguments_),
};

export const FlatHover: Story = {
  args: {
    content: `Flat Button (Hover)`,
    variant: 'flat',
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createElement(arguments_),
};

export const FlatFocus: Story = {
  args: {
    content: `Flat Button (Focused)`,
    variant: 'flat',
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createElement(arguments_),
};

export const FlatDisabled: Story = {
  args: {
    content: `Flat Button (Disabled)`,
    variant: 'flat',
    appearance: 'default',
    size: 'medium',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const FlatLight: Story = {
  args: {
    content: `Flat Light Button`,
    appearance: 'light',
    size: 'medium',
  },
  render: (arguments_) => createElement(arguments_),
};

export const FlatLightHover: Story = {
  args: {
    content: `Flat Light Button (Hover)`,
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createElement(arguments_),
};

export const FlatLightFocus: Story = {
  args: {
    content: `Flat Light Button (Focused)`,
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createElement(arguments_),
};

export const FlatLightDisabled: Story = {
  args: {
    content: `Flat Light Button (Disabled)`,
    appearance: 'light',
    size: 'medium',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const FlatDark: Story = {
  args: {
    content: `Flat Dark Button`,
    appearance: 'dark',
    size: 'medium',
  },
  render: (arguments_) => createElement(arguments_),
};

export const FlatDarkHover: Story = {
  args: {
    content: `Flat Dark Button (Hover)`,
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createElement(arguments_),
};

export const FlatDarkFocus: Story = {
  args: {
    content: `Flat Dark Button (Focused)`,
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createElement(arguments_),
};

export const FlatDarkDisabled: Story = {
  args: {
    content: `Flat Dark Button (Disabled)`,
    appearance: 'dark',
    size: 'medium',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithLeftIcon: Story = {
  args: {
    content: `<span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">thumb_up</span> Button`,
    appearance: 'default',
    size: 'medium',
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithIconRight: Story = {
  args: {
    content: `Button <span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">thumb_up</span>`,
    appearance: 'default',
    size: 'medium',
  },
  render: (arguments_) => createElement(arguments_),
};

export const ButtonWithSpinner: Story = {
  args: {
    disabled: true,
    appearance: 'default',
    size: 'medium',
    content: `Button <svg
    class="gi-w-6 gi-h-6"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <circle
        cx="12"
        cy="12"
        r="9.5"
        fill="none"
        stroke-width="3"
        stroke-linecap="round"
      >
        <animate
          attributeName="stroke-dasharray"
          dur="1.5s"
          calcMode="spline"
          values="0 150;42 150;42 150;42 150"
          keyTimes="0;0.475;0.95;1"
          keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          dur="1.5s"
          calcMode="spline"
          values="0;-16;-59;-59"
          keyTimes="0;0.475;0.95;1"
          keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
          repeatCount="indefinite"
        />
      </circle>
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="2s"
        values="0 12 12;360 12 12"
        repeatCount="indefinite"
      />
    </g>
  </svg>`,
  },
  render: (arguments_) => createElement(arguments_),
};
