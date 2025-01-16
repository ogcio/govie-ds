import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button/button.js';
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

const DrawerExample = ({ position = 'right', ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="gi-drawer-controller">
      <Button variant="primary" onClick={handleOpen}>
        Open Drawer
      </Button>

      <Drawer
        onClose={handleClose}
        position={position}
        {...props}
        isOpen={isOpen}
      >
        <DrawerBody>
          <p>This is the body of the drawer. Add your content here.</p>
        </DrawerBody>
        <DrawerFooter>
          <div className="gi-flex gi-justify-end">
            <Button variant="secondary">Logout</Button>
          </div>
        </DrawerFooter>
      </Drawer>
    </div>
  );
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    position: {
      control: 'radio',
      options: ['left', 'right', 'bottom'],
      table: {
        category: 'Appearance',
        type: { summary: 'Position of the Drawer' },
        defaultValue: { summary: 'right' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'Additional class names' },
      },
    },
    onClose: {
      table: {
        category: 'Events',
        type: {
          summary:
            'Callback when the Drawer closed button or overlay is clicked',
        },
      },
    },
  },
  render: (props: any) => <DrawerExample {...props} />,
} as unknown as Story;

export const DrawerOpen: Story = {
  args: {
    position: 'right',
    isOpen: true,
    onClose: () => {},
    children: (
      <>
        <DrawerBody>
          <p>Here is the body content of the drawer.</p>
        </DrawerBody>
        <DrawerFooter>
          <div className="gi-flex gi-justify-end">
            <Button variant="secondary">Logout</Button>
          </div>
        </DrawerFooter>
      </>
    ),
  },
};
