import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import {
  modalBody,
  modalFooter,
  modalTitle,
  triggerButton,
} from './modal.content';
import html from './modal.html?raw';
import { ModalProps } from './modal.schema';

const path = import.meta.url.split('/modal')[0];

const macro = { name: 'govieModal', html, path };

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
    title: {
      control: 'text',
      description: 'The content that will be inserted in the modal component',
    },
    body: {
      control: 'text',
      description: 'The content that will be inserted in the modal body',
    },
    footer: {
      control: 'text',
      description: 'The content that will be inserted in the modal footer',
    },

    triggerButton: {
      control: 'text',
      description: 'The button that will trigger the modal component',
    },
  },
  args: {
    title: modalTitle,
    body: modalBody,
    footer: modalFooter,
    triggerButton,
  },
};

export const ModalOpen: Story = {
  args: {
    title: modalTitle,
    body: modalBody,
    footer: modalFooter,
    isOpen: true,
  },
};
