import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { DrawerMenuExample } from './drawer.content.js';
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
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    closeButtonSize: 'large',
    startsOpen: true,
    triggerButton: <Button>Open drawer</Button>,
    closeButtonLabel: 'Close',
    children: [
      <DrawerBody
        key="body"
        className="gi-border-t-xs gi-border-color-border-system-neutral-subtle"
      >
        <DrawerMenuExample />
      </DrawerBody>,
      <DrawerFooter key="footer">
        <Button
          variant="secondary"
          appearance="dark"
          className="gi-justify-center xs:gi-justify-start"
        >
          Cancel
        </Button>
        <Button className="gi-justify-center xs:gi-justify-start">
          Primary
        </Button>
      </DrawerFooter>,
    ],
  },
};

export const DrawerRight: Story = {
  argTypes: {},
  args: {
    triggerButton: <Button>Open drawer</Button>,
    startsOpen: true,
    children: [
      <DrawerBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </DrawerBody>,
      <DrawerFooter key="footer">
        <div className="gi-flex gi-flex-col-reverse gi-gap-4 xs:gi-gap-6 xs:gi-justify-end xs:gi-flex-row">
          <Button
            variant="secondary"
            appearance="dark"
            className="gi-justify-center xs:gi-justify-start"
          >
            Cancel
          </Button>
          <Button className="gi-justify-center xs:gi-justify-start">
            Primary
          </Button>
        </div>
      </DrawerFooter>,
    ],
  },
} as unknown as Story;

export const DrawerLeft: Story = {
  args: {
    position: 'left',
    triggerButton: <Button>Open drawer</Button>,
    startsOpen: true,
    children: [
      <DrawerBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </DrawerBody>,
      <DrawerFooter key="footer">
        <div className="gi-flex gi-flex-col-reverse gi-gap-4 xs:gi-gap-6 xs:gi-justify-end xs:gi-flex-row">
          <Button
            variant="secondary"
            appearance="dark"
            className="gi-justify-center xs:gi-justify-start"
          >
            Cancel
          </Button>
          <Button className="gi-justify-center xs:gi-justify-start">
            Primary
          </Button>
        </div>
      </DrawerFooter>,
    ],
  },
};

export const DrawerBottom: Story = {
  args: {
    position: 'bottom',
    triggerButton: <Button>Open drawer</Button>,
    startsOpen: true,
    children: [
      <DrawerBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </DrawerBody>,
      <DrawerFooter key="footer">
        <div className="gi-flex gi-flex-col-reverse gi-gap-4 xs:gi-gap-6 xs:gi-justify-end xs:gi-flex-row">
          <Button
            variant="secondary"
            appearance="dark"
            className="gi-justify-center xs:gi-justify-start"
          >
            Cancel
          </Button>
          <Button className="gi-justify-center xs:gi-justify-start">
            Primary
          </Button>
        </div>
      </DrawerFooter>,
    ],
  },
};

export const DrawerMenuTablet: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  args: {
    triggerButton: <Button>Open drawer</Button>,
    startsOpen: true,
    closeButtonLabel: 'Close',
    children: [
      <DrawerBody
        key="body"
        className="gi-border-t-xs gi-border-color-border-system-neutral-subtle"
      >
        <DrawerMenuExample />
      </DrawerBody>,
      <DrawerFooter key="footer">
        <Button
          variant="secondary"
          appearance="dark"
          className="gi-justify-center xs:gi-justify-start"
        >
          Cancel
        </Button>
        <Button className="gi-justify-center xs:gi-justify-start">
          Primary
        </Button>
      </DrawerFooter>,
    ],
  },
};

export const DrawerMenuMobile: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    triggerButton: <Button>Open drawer</Button>,
    startsOpen: true,
    closeButtonLabel: 'Close',
    children: [
      <DrawerBody
        key="body"
        className="gi-border-t-xs gi-border-color-border-system-neutral-subtle"
      >
        <DrawerMenuExample />
      </DrawerBody>,
      <DrawerFooter key="footer">
        <Button
          variant="secondary"
          appearance="dark"
          className="gi-justify-center xs:gi-justify-start"
        >
          Cancel
        </Button>
        <Button className="gi-justify-center xs:gi-justify-start">
          Primary
        </Button>
      </DrawerFooter>,
    ],
  },
};

export const DesktopButtonStacked: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    closeButtonSize: 'large',
    triggerButton: <Button>Open drawer</Button>,
    closeButtonLabel: 'Close',
    children: [
      <DrawerBody
        key="body"
        className="gi-border-t-xs gi-border-color-border-system-neutral-subtle"
      >
        <DrawerMenuExample />
      </DrawerBody>,
      <DrawerFooter key="footer" stacked>
        <Button>Primary</Button>
        <Button variant="secondary" appearance="dark">
          Cancel
        </Button>
        <Button variant="secondary" appearance="dark">
          Cancel
        </Button>
        <Button variant="secondary" appearance="dark">
          Cancel
        </Button>
      </DrawerFooter>,
    ],
  },
};
