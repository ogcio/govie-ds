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
    triggerButton: <Button>Open modal</Button>,
    className: 'gi-w-[600px]',
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

export const DrawerOpen: Story = {
  args: {
    className: 'gi-w-[600px] gi-bg-gray-500',
    startsOpen: true,
    triggerButton: <Button>Open modal</Button>,
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
