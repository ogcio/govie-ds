import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const meta: Meta = {
  title: 'Form/Button',
  parameters: {
    docs: {
      description: {
        component:
          'Button component to help users carry out an action like starting an application or saving their information.',
      },
    },
  },
  argTypes: {
    children: { control: 'text' },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'flat'],
      description: 'The variants of the button',
    },
    appearance: {
      control: 'radio',
      options: ['default', 'dark', 'light'],
      description: 'The appearance of the button',
    },
    size: {
      control: 'radio',
      options: ['medium', 'small', 'large'],
      description: 'The sizes of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Specify if the button is disabled',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    appearance: 'default',
    size: 'medium',
    disabled: false,
    ariaLabel: undefined,
  },
  decorators: [
    (Story, context) => {
      const isLight =
        context?.args?.appearance === 'light' ? 'gi-bg-black' : '';
      return (
        <div class={`gi-p-4 ${isLight} gi-w-fit`}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj;

const renderButton = (args: any) => {
  const { children, ariaLabel, dataTestid, ...rest } = args;

  return (
    <govie-button {...rest} aria-label={ariaLabel} data-testid={dataTestid}>
      {children}
    </govie-button>
  );
};

export const Default: Story = { render: renderButton };

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    appearance: 'default',
    size: 'medium',
  },
  render: renderButton,
};

export const PrimaryHover: Story = {
  args: {
    children: 'Primary Button (Hover)',
    variant: 'primary',
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: renderButton,
};

export const PrimaryFocus: Story = {
  args: {
    children: 'Primary Button (Focused)',
    variant: 'primary',
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
  render: renderButton,
};

export const PrimaryDisabled: Story = {
  args: {
    children: 'Primary Button (Disabled)',
    variant: 'primary',
    appearance: 'default',
    size: 'medium',
    disabled: true,
  },
  render: renderButton,
};

export const PrimaryLight: Story = {
  args: {
    children: 'Primary Light Button',
    variant: 'primary',
    appearance: 'light',
    size: 'medium',
  },
  render: renderButton,
};

export const PrimaryLightHover: Story = {
  args: {
    children: 'Primary Light Button (Hover)',
    variant: 'primary',
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: renderButton,
};

export const PrimaryLightFocus: Story = {
  args: {
    children: 'Primary Light Button (Focused)',
    variant: 'primary',
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
  render: renderButton,
};

export const PrimaryLightDisabled: Story = {
  args: {
    children: 'Primary Light Button (Disabled)',
    variant: 'primary',
    appearance: 'light',
    size: 'medium',
    disabled: true,
  },
  render: renderButton,
};

export const PrimaryDark: Story = {
  args: {
    children: 'Primary Dark Button',
    variant: 'primary',
    appearance: 'dark',
    size: 'medium',
  },
  render: renderButton,
};

export const PrimaryDarkHover: Story = {
  args: {
    children: 'Primary Dark Button (Hover)',
    variant: 'primary',
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: renderButton,
};

export const PrimaryDarkFocus: Story = {
  args: {
    children: 'Primary Dark Button (Focused)',
    variant: 'primary',
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
  render: renderButton,
};

export const PrimaryDarkDisabled: Story = {
  args: {
    children: 'Primary Dark Button (Disabled)',
    variant: 'primary',
    appearance: 'dark',
    size: 'medium',
    disabled: true,
  },
  render: renderButton,
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    appearance: 'default',
    size: 'medium',
  },
  render: renderButton,
};

export const SecondaryHover: Story = {
  args: {
    children: 'Secondary Button (Hover)',
    variant: 'secondary',
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
  render: renderButton,
};
