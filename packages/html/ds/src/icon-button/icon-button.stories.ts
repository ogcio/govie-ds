import type { Meta, StoryObj } from '@storybook/react';
import { createIconButton } from '../helpers/buttons';
import { IconId } from '../icon/icon.schema';
import { beautifyHtmlNode } from '../storybook/storybook';
import { IconButtonProps } from './types';

const meta: Meta<IconButtonProps> = {
  title: 'Form/IconButton',
  decorators: (story, context) => {
    const isLight = context?.args?.appearance === 'light' && 'gi-bg-black';
    return `<div class="gi-p-4 ${isLight} gi-w-fit">
    ${story()}
      </div>` as any;
  },
  parameters: {
    docs: {
      description: {
        component:
          'IconButton is a clickable button designed to contain only an icon. It supports multiple appearances and is commonly used for toolbars, actions, or navigation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<IconButtonProps>;

const createElement = (arguments_: IconButtonProps) => {
  const component = createIconButton(arguments_);
  return beautifyHtmlNode(component);
};

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
      icon: IconId.ThumbUp,
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const Small: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    size: 'small',
  },
  render: (arguments_) => createElement(arguments_),
};

export const Large: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    size: 'large',
  },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryButton: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    variant: 'secondary',
  },
  render: (arguments_) => createElement(arguments_),
};

export const FlatButton: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    variant: 'flat',
  },
  render: (arguments_) => createElement(arguments_),
};

export const Disabled: Story = {
  args: {
    icon: {
      icon: IconId.ThumbUp,
    },
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryDefault: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'primary',
  },
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryDisabled: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'primary',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryDefault: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'secondary',
  },
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryDisabled: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'secondary',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const FlatDefault: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'flat',
  },
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
};

export const FlatDisabled: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'flat',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryLight: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'primary',
    appearance: 'light',
  },
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
};

export const PrimaryLightDisabled: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'primary',
    appearance: 'light',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryLight: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'secondary',
    appearance: 'light',
  },
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
};

export const SecondaryLightDisabled: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'secondary',
    appearance: 'light',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const FlatLight: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'flat',
    appearance: 'light',
  },
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
};

export const FlatLightDisabled: Story = {
  args: {
    icon: { icon: 'thumb_up' },
    size: 'medium',
    variant: 'flat',
    appearance: 'light',
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
};
