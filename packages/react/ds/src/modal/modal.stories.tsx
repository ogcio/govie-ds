import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button.js';
import { Heading } from '../heading/heading.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Modal } from './modal.js';

const meta = {
  title: 'Application/Modal',
  decorators: (Story) => (
    <div className="gi-h-[400px]">
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
  argTypes: {
    children: {
      control: 'text',
      description: 'The content that will be inserted in the modal component',
    },
    triggerButton: {
      control: 'text',
      description: 'The button that will trigger the modal component',
    },
  },
  args: {
    triggerButton: <Button>Open Modal</Button>,
    children: (
      <>
        <Heading as="h2">Title</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores
        </Paragraph>
        <div className="gi-flex gi-gap-6 gi-justify-end">
          <Button variant="secondary" appearance="dark">
            Cancel action
          </Button>
          <Button>Primary action</Button>
        </div>
      </>
    ),
  },
};

export const ModalOpen: Story = {
  args: {
    children: (
      <>
        <Heading as="h2">Title</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores
        </Paragraph>
        <div className="gi-flex gi-gap-6 gi-justify-end">
          <Button variant="secondary" appearance="dark">
            Cancel action
          </Button>
          <Button>Primary action</Button>
        </div>
      </>
    ),
  },
};
