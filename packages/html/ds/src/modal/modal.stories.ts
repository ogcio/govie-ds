import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import { htmlContent, triggerButton } from './modal.content';
import html from './modal.html?raw';
import { ModalProps } from './modal.schema';

const macro = { name: 'govieModal', html };

const Modal = renderComponent<ModalProps>(macro);

const meta = {
  component: Modal,
  title: 'Application/Modal',
  parameters: {
    macro,
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A modal component that displays content on a button trigger or on page load',
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    html: {
      control: 'text',
      description: 'The content that will be inserted in the modal component',
    },
    triggerButton: {
      control: 'text',
      description: 'The button that will trigger the modal component',
    },
  },
  args: {
    html: htmlContent,
    triggerButton,
  },
};

export const ModalOpen: Story = {
  args: {
    html: htmlContent,
  },
};
