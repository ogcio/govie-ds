import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { ButtonProps } from '../button/types.ts';
import { createDrawer } from '../helpers/modal.ts';
import { createParagraph } from '../helpers/typography.tsx';
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

  const element = parse(component.outerHTML) as React.ReactElement;
  return <div className="gi-h-[600px]">{element}</div>;
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
    closeButtonSize: 'large',
    triggerButton: { content: 'Open drawer' },
    closeButtonLabel: 'Close',
    body: drawerBody,
    footer: drawerFooter,
    position: 'right',
  },
  render: createElement,
};

export const DrawerRight: Story = {
  args: {
    closeButtonSize: 'small',
    triggerButton: { content: 'Open drawer' },
    body: beautifyHtmlNode(
      createParagraph({
        content:
          ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse magnam quis sit soluta cupiditate at deserunt exercitationem voluptas doloribus asperiores.',
      }),
    ),
    footer: drawerFooter,
    position: 'right',
  },
  render: createElement,
};

export const DrawerLeft: Story = {
  args: {
    position: 'left',
    closeButtonSize: 'small',
    triggerButton: { content: 'Open drawer' },
    body: beautifyHtmlNode(
      createParagraph({
        content:
          ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse magnam quis sit soluta cupiditate at deserunt exercitationem voluptas doloribus asperiores.',
      }),
    ),
    footer: drawerFooter,
  },
  render: createElement,
};

export const DrawerBottom: Story = {
  args: {
    position: 'bottom',
    closeButtonSize: 'small',
    triggerButton: { content: 'Open drawer' },
    body: beautifyHtmlNode(
      createParagraph({
        content:
          ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse magnam quis sit soluta cupiditate at deserunt exercitationem voluptas doloribus asperiores.',
      }),
    ),
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

export const DrawerMenuTablet: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  args: {
    triggerButton: { content: 'Open Modal' },
    body: drawerBody,
    position: 'right',
    startsOpen: true,
    footer: drawerFooter,
  },
  render: createElement,
};

export const DrawerMenuMobile: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    triggerButton: { content: 'Open Modal' },
    closeButtonLabel: 'Close',
    body: drawerBody,
    footer: drawerFooter,
  },
  render: createElement,
};
