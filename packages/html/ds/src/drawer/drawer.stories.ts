import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import {
  drawerBody,
  drawerTriggerButton,
  drawerFooter,
} from './drawer.content.ts';
import html from './drawer.html?raw';
import { DrawerProps } from './drawer.schema';

const macro = { name: 'govieDrawer', html };

const Drawer = renderComponent<DrawerProps>(macro);

const meta = {
  component: Drawer,
  title: 'Application/Drawer',
  parameters: {
    macro,
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A drawer component that slides from the left, right, or bottom and can be triggered by a button.',
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

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
    triggerButton: drawerTriggerButton,
    body: drawerBody,
    position: 'right',
  },
};

export const DrawerOpen: Story = {
  args: {
    triggerButton: drawerTriggerButton,
    body: drawerBody,
    position: 'right',
    startsOpen: true,
    footer: drawerFooter,
    aria: {
      'aria-labelledby': 'drawer-title',
      'aria-describedby': 'drawer-title',
    },
  },
};
