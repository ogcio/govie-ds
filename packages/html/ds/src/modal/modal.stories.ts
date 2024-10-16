import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './modal.html?raw';
import { ModalProps } from './modal.schema';

const path = import.meta.url.split('/modal')[0];

const macro = { name: 'govieModal', html, path };

const Modal = renderComponent<ModalProps>(macro);

const htmlContent = `
<div>
    <h2 class="gi-heading-lg">Title</h2>
    <p class="gi-paragraph-md">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam molestias error accusantium non nobis excepturi doloremque dolorem possimus corrupti. Nostrum quisquam est voluptate! Iure suscipit, commodi cupiditate sit minima veritatis.</p>
    <div class="gi-flex gi-gap-3 gi-justify-between">
        <button class="gi-btn gi-btn-primary gi-btn-regular">Primary Action</button>
        <button class="gi-btn gi-btn-secondary gi-btn-regular ">Cancel Action</button>
    </div>
</div>
`;

const meta = {
  component: Modal,
  title: 'Application/Modal',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    html: htmlContent,
    triggerButton:
      '<button class="gi-btn gi-btn-primary gi-btn-regular">Open Modal</button>',
  },
};

export const ModalOpen: Story = {
  args: {
    html: htmlContent,
  },
};
