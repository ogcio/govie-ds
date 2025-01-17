import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button/button.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Drawer, DrawerBody, DrawerFooter } from './drawer.js';

const meta = {
  title: 'Application/Drawer',
  decorators: (Story) => (
    <div className="gi-h-[600px]">
      <Story />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The Drawer component is a sliding panel for additional content, supporting both left and right positions.',
      },
    },
  },
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {},
  args: {
    triggerButton: <Button>Open drawer</Button>,
    children: [
      <DrawerBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </DrawerBody>,
      <DrawerFooter key="footer">
        <div className="gi-flex gi-gap-6 gi-justify-end">
          <Button variant="secondary" appearance="dark">
            Cancel
          </Button>
          <Button>Primary</Button>
        </div>
      </DrawerFooter>,
    ],
  },
} as unknown as Story;

export const DrawerLeft: Story = {
  args: {
    position: 'left',
    triggerButton: <Button>Open drawer</Button>,
    children: [
      <DrawerBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </DrawerBody>,
      <DrawerFooter key="footer">
        <div className="gi-flex gi-gap-6 gi-justify-end">
          <Button variant="secondary" appearance="dark">
            Cancel
          </Button>
          <Button>Primary</Button>
        </div>
      </DrawerFooter>,
    ],
  },
};

export const DrawerRight: Story = {
  args: {
    position: 'right',
    triggerButton: <Button>Open drawer</Button>,
    children: [
      <DrawerBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </DrawerBody>,
      <DrawerFooter key="footer">
        <div className="gi-flex gi-gap-6 gi-justify-end">
          <Button variant="secondary" appearance="dark">
            Cancel
          </Button>
          <Button>Primary</Button>
        </div>
      </DrawerFooter>,
    ],
  },
};

export const DrawerBottom: Story = {
  args: {
    position: 'bottom',
    triggerButton: <Button>Open drawer</Button>,
    children: [
      <DrawerBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </DrawerBody>,
      <DrawerFooter key="footer">
        <div className="gi-flex gi-gap-6 gi-justify-end">
          <Button variant="secondary" appearance="dark">
            Cancel
          </Button>
          <Button>Primary</Button>
        </div>
      </DrawerFooter>,
    ],
  },
};

export const DrawerOpen: Story = {
  args: {
    startsOpen: true,
    triggerButton: <Button>Open drawer</Button>,
    children: [
      <DrawerBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </DrawerBody>,
      <DrawerFooter key="footer">
        <div className="gi-flex gi-gap-6 gi-justify-end">
          <Button variant="secondary" appearance="dark">
            Cancel
          </Button>
          <Button>Primary</Button>
        </div>
      </DrawerFooter>,
    ],
  },
};
