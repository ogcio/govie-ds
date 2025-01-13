import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button.js';
import { Paragraph } from '../paragraph/paragraph.js';

import {
  ModalClose,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalWrapper,
} from './modal.js';

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
  component: ModalWrapper,
} satisfies Meta<typeof ModalWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    position: {
      control: 'radio',
      options: ['center', 'left', 'right'],
      description: 'Positioning of the modal content.',
    },
  },
  args: {
    position: 'center',
    ModalTriggerComponent: <Button>Open modal</Button>,
    className: 'gi-w-[600px]',
    children: [
      <ModalClose key="close" aria-label="Close modal" />,
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

export const ModalOpen: Story = {
  args: {
    position: 'center',
    className: 'gi-w-[600px]',
    startsOpen: true,
    ModalTriggerComponent: <Button>Open modal</Button>,
    children: [
      <ModalClose key="close" aria-label="Close modal" />,
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
