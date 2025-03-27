import type { Meta, StoryObj } from '@storybook/react';
import { ButtonProps } from '../button/types.ts';
import { createDrawer } from '../helpers/modal.tsx';
import { beautifyHtmlNode } from '../storybook/storybook.tsx';
import { drawerBody, drawerFooter } from './drawer.content.ts';
import { DrawerWrapperProps } from './types.ts';

type DrawerWrapperPropsExtension = DrawerWrapperProps & {
  triggerButton?: ButtonProps;
};

const meta: Meta<DrawerWrapperPropsExtension> = {
  title: 'Application/Drawer',
};

export default meta;
type Story = StoryObj<DrawerWrapperPropsExtension>;

const createElement = (arguments_: DrawerWrapperPropsExtension) => {
  const component = createDrawer(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Optional custom class name for styling.',
    },
    closeButtonLabel: {
      control: 'text',
      description: 'Custom label for the close button.',
    },
    triggerButton: {
      control: 'text',
      description: 'The button that will trigger the drawer component.',
    },
    startsOpen: {
      control: 'boolean',
      description: 'Determines if the drawer is initially open.',
    },
    position: {
      control: 'radio',
      options: ['left', 'right', 'bottom'],
      description: 'Drawer position relative to the screen.',
    },
    closeButtonSize: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the close button.',
    },
    body: {
      control: 'text',
      description: 'The content that will be inserted inside the drawer.',
    },
  },
  args: {
    triggerButton: { content: 'Open Modal' },
    body: drawerBody,
    position: 'right',
  },
  render: createElement,
};

export const DrawerOpen: Story = {
  args: {
    triggerButton: { content: 'Open Modal' },
    body: drawerBody,
    position: 'right',
    startsOpen: true,
    footer: drawerFooter,
  },
  render: createElement,
};
