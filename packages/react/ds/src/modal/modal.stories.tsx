import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button/button.js';
import { Paragraph } from '../paragraph/paragraph.js';
import {
  ModalTitle,
  ModalBody,
  ModalFooter,
  Modal,
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
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerButton: <Button>Open modal</Button>,
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
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ModalFooter>,
    ],
  },
};

export const StateControlledModal: Story = {
  args: {
    children: <></>,
    triggerButton: <></>,
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <ModalWrapper
          dataTestId={'test-id'}
          isOpen={isOpen}
          onClose={handleClose}
        >
          <ModalTitle key="title">Modal Title</ModalTitle>
          <ModalBody key="body">
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              esse magnam quis sit soluta cupiditate at deserunt exercitationem
              voluptas doloribus asperiores.
            </Paragraph>
          </ModalBody>
          <ModalFooter key="footer">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary">Save</Button>
          </ModalFooter>
        </ModalWrapper>
      </>
    );
  },
};

export const WithoutFooter: Story = {
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
    ],
  },
};

export const WithLongContent: Story = {
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
          doloribus asperiores. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Incidunt esse magnam quis sit soluta cupiditate at
          deserunt exercitationem voluptas doloribus asperiores. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Incidunt esse magnam quis
          sit soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Incidunt esse magnam quis sit soluta cupiditate at deserunt
          exercitationem voluptas doloribus asperiores. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Incidunt esse magnam quis sit
          soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Incidunt esse magnam quis sit soluta cupiditate at deserunt
          exercitationem voluptas doloribus asperiores. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Incidunt esse magnam quis sit
          soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Incidunt esse magnam quis sit soluta cupiditate at deserunt
          exercitationem voluptas doloribus asperiores. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Incidunt esse magnam quis sit
          soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Incidunt esse magnam quis sit soluta cupiditate at deserunt
          exercitationem voluptas doloribus asperiores. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Incidunt esse magnam quis sit
          soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores.
        </Paragraph>
      </ModalBody>,
      <ModalFooter key="footer">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ModalFooter>,
    ],
  },
};

export const WithAllFooterButtonVariants: Story = {
  args: {
    triggerButton: <Button>Open modal</Button>,
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
        <Button variant="flat">Flat</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="primary">Primary</Button>
      </ModalFooter>,
    ],
  },
};

export const ModalNotCloseOnClick: Story = {
  args: {
    triggerButton: <Button>Open modal</Button>,
    closeOnClick: false,
    children: [
      <ModalTitle key="title">Modal Title</ModalTitle>,
      <ModalBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </ModalBody>,
    ],
  },
};

export const ModalNotCloseOnOverlayClick: Story = {
  args: {
    triggerButton: <Button>Open modal</Button>,
    closeOnOverlayClick: false,
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
        <Button variant="primary" appearance="dark">
          Primary
        </Button>
      </ModalFooter>,
    ],
  },
};

export const ModalOpen: Story = {
  args: {
    startsOpen: true,
    triggerButton: <Button>Open modal</Button>,
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
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ModalFooter>,
    ],
  },
};

export const WithCenterLarge: Story = {
  args: {
    startsOpen: true,
    size: 'lg',
    triggerButton: <Button>Open modal</Button>,
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
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ModalFooter>,
    ],
  },
};

export const WithCenterMedium: Story = {
  args: {
    startsOpen: true,
    size: 'md',
    triggerButton: <Button>Open modal</Button>,
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
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ModalFooter>,
    ],
  },
};

export const WithCenterSmall: Story = {
  args: {
    startsOpen: true,
    size: 'sm',
    triggerButton: <Button>Open modal</Button>,
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
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ModalFooter>,
    ],
  },
};
