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
    <div className='gi-h-[400px]'><Story /></div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'use this modal component where it is appropiate',
      },
    },
  },
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerButton: <Button>Open Modal</Button>,
    children: (
      <>
        <Heading>Title</Heading>
        <Paragraph> Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores, accusamus rerum totam ullam, atque sed
          temporibus expedita animi.</Paragraph>
        <div className='gi-flex gi-gap-3 gi-justify-between'>
          <Button>Primary action</Button>
          <Button variant={ButtonVariant.Secondary}>Cancel action</Button>
        </div>
      </>
    ),
  },
};
