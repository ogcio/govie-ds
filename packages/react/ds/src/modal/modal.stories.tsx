import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button.js';
import { Paragraph } from '../paragraph/paragraph.js';

import { ModalTitle, ModalBody, ModalFooter, Modal } from './modal.js';

const meta = {
  title: 'Application/Modal',
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
          'A modal component that displays content on a button trigger or on page load',
      },
    },
  },
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {},
  args: {
    triggerButton: <Button>Open modal</Button>,
    className: 'gi-w-[600px]',
    children: [
      <ModalTitle key="title">Modal Title</ModalTitle>,
      <ModalBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </ModalBody>,
      <ModalFooter key="footer">
        <div className="gi-flex gi-gap-6 gi-justify-end">
          <Button variant="secondary" appearance="dark">
            Cancel
          </Button>
          <Button>Primary</Button>
        </div>
      </ModalFooter>,
    ],
  },
};

export const ModalOpen: Story = {
  args: {
    className: 'gi-w-[600px] gi-bg-gray-500',
    startsOpen: true,
    triggerButton: <Button>Open modal</Button>,
    closeButtonLabel: 'Close',
    children: [
      <ModalTitle key="title">Title</ModalTitle>,
      <ModalBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </ModalBody>,
      <ModalFooter key="footer">
        <div className="gi-flex gi-gap-6 gi-justify-end">
          <Button variant="secondary" appearance="dark">
            Cancel
          </Button>
          <Button>Primary</Button>
        </div>
      </ModalFooter>,
    ],
  },
};
