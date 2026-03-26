import type { Meta, StoryObj } from '@storybook/react';
import { fn, expect, within } from 'storybook/test';
import { IconButton } from './icon-button.js';

const meta = {
  title: 'form/IconButton',
  decorators: (Story, context) => {
    const isLight = context?.args?.appearance === 'light' && 'gi-bg-black';
    return (
      <div className={`gi-p-4 ${isLight} gi-w-fit`}>
        <Story />
      </div>
    );
  },
  component: IconButton,
  args: {
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'IconButton is a clickable button designed to contain only an icon. It supports multiple appearances and is commonly used for toolbars, actions, or navigation.',
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    icon: {
      control: 'text',
      type: { name: 'string' },
      description: 'The Icon component that the button will accept',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'flat'],
      description: 'The variants of the button',
    },
    appearance: {
      control: 'radio',
      options: ['default', 'dark', 'light'],
      description: 'The description of the button',
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
    icon: {
      icon: 'thumb_up',
    },
    dataTestid: 'govieIconButton',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvasElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('type')).toBe('button');

    await step('should render a regular icon button', async () => {
      const iconElement = canvas.getByTestId('govie-icon');
      const buttonElement = canvas.getByTestId('govieIconButton');

      expect(iconElement).toHaveStyle('font-size: 24px');
      expect(buttonElement.classList.contains('gi-icon-btn-regular')).toBe(
        true,
      );
    });
  },
};

export const Small: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    size: 'small',
    dataTestid: 'govieIconButton',
  },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render a small icon button', async () => {
      const iconElement = canvas.getByTestId('govie-icon');
      const buttonElement = canvas.getByTestId('govieIconButton');

      expect(iconElement).toHaveStyle('font-size: 16px');
      expect(buttonElement.classList.contains('gi-icon-btn-small')).toBe(true);
    });
  },
};

export const Large: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    size: 'large',
    dataTestid: 'govieIconButton',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render a large icon button', async () => {
      const iconElement = canvas.getByTestId('govie-icon');
      const buttonElement = canvas.getByTestId('govieIconButton');

      expect(iconElement).toHaveStyle('font-size: 24px');
      expect(buttonElement.classList.contains('gi-icon-btn-large')).toBe(true);
    });
  },
};

export const Disabled: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    disabled: true,
  },
};

export const PrimaryDefault: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'primary',
  },
};

export const PrimaryHover: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'primary',
    className: 'hover-selector',
  },
  parameters: {
    pseudo: { hover: '.hover-selector' },
  },
};

export const PrimaryFocus: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'primary',
    className: 'focus-selector',
  },
  parameters: {
    pseudo: { focus: '.focus-selector' },
  },
};

export const PrimaryDisabled: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'primary',
    disabled: true,
  },
};

export const SecondaryDefault: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'secondary',
  },
};

export const SecondaryHover: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'secondary',
    className: 'hover-selector',
  },
  parameters: {
    pseudo: { hover: '.hover-selector' },
  },
};

export const SecondaryFocus: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'secondary',
    className: 'focus-selector',
  },
  parameters: {
    pseudo: { focus: '.focus-selector' },
  },
};

export const SecondaryDisabled: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'secondary',
    disabled: true,
  },
};

export const FlatDefault: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'flat',
  },
};

export const FlatHover: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'flat',
    className: 'hover-selector',
  },
  parameters: {
    pseudo: { hover: '.hover-selector' },
  },
};

export const FlatFocus: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'flat',
    className: 'focus-selector',
  },
  parameters: {
    pseudo: { focus: '.focus-selector' },
  },
};

export const FlatDisabled: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'flat',
    disabled: true,
  },
};

export const PrimaryLight: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'primary',
    appearance: 'light',
  },
};

export const PrimaryLightHover: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'primary',
    appearance: 'light',
    className: 'hover-selector',
  },
  parameters: { pseudo: { hover: '.hover-selector' } },
};

export const PrimaryLightFocus: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'primary',
    appearance: 'light',
    className: 'focus-selector',
  },
  parameters: { pseudo: { focus: '.focus-selector' } },
};

export const PrimaryLightDisabled: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'primary',
    appearance: 'light',
    disabled: true,
  },
};

export const SecondaryLight: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'secondary',
    appearance: 'light',
  },
};

export const SecondaryLightHover: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'secondary',
    appearance: 'light',
    className: 'hover-selector',
  },
  parameters: { pseudo: { hover: '.hover-selector' } },
};

export const SecondaryLightFocus: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'secondary',
    appearance: 'light',
    className: 'focus-selector',
  },
  parameters: { pseudo: { focus: '.focus-selector' } },
};

export const SecondaryLightDisabled: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'secondary',
    appearance: 'light',
    disabled: true,
  },
};

export const FlatLight: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'flat',
    appearance: 'light',
  },
};

export const FlatLightHover: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'flat',
    appearance: 'light',
    className: 'hover-selector',
  },
  parameters: { pseudo: { hover: '.hover-selector' } },
};

export const FlatLightFocus: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'flat',
    appearance: 'light',
    className: 'focus-selector',
  },
  parameters: { pseudo: { focus: '.focus-selector' } },
};

export const FlatLightDisabled: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'flat',
    appearance: 'light',
    disabled: true,
  },
};
