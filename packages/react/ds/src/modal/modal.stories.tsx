import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../button/button.js';
import { ButtonVariant } from '../button/types.js';
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
        <Heading>Title</Heading>
        <Paragraph>
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores
        </Paragraph>
        <div className="gi-flex gi-gap-3 gi-justify-between">
          <Button>Primary action</Button>
          <Button variant={ButtonVariant.Secondary}>Cancel action</Button>
        </div>
      </>
    ),
  },
};

export const ModalOpen: Story = {
  args: {
    children: (
      <>
        <Heading>Title</Heading>
        <Paragraph>
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores
        </Paragraph>
        <div className="gi-flex gi-gap-3 gi-justify-between">
          <Button>Primary action</Button>
          <Button variant={ButtonVariant.Secondary}>Cancel action</Button>
        </div>
      </>
    ),
  },
};
