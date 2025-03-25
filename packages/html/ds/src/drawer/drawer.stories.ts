import type { Meta, StoryObj } from '@storybook/react';
import { ButtonProps } from '../button/types.ts';
import { createButton, createIconButton } from '../helpers/buttons.tsx';
import { createHeading } from '../helpers/typography.tsx';
import { beautifyHtmlNode } from '../storybook/storybook.tsx';
import { drawerBody, drawerFooter } from './drawer.content.ts';
import { DrawerWrapperProps } from './types.ts';

type DrawerWrapperPropsExtension = DrawerWrapperProps & {
  triggerButton: ButtonProps;
};

const meta: Meta<DrawerWrapperPropsExtension> = {
  title: 'Application/Drawer',
};

export default meta;
type Story = StoryObj<DrawerWrapperPropsExtension>;

const createDrawer = (arguments_: DrawerWrapperPropsExtension) => {
  const modalWrapper = document.createElement('div');
  modalWrapper.dataset.module = 'gieds-drawer';

  if (arguments_.triggerButton) {
    const triggerButton = createButton(arguments_.triggerButton);
    triggerButton.dataset.element = 'drawer-trigger-button';
    triggerButton.dataset.testid = 'drawer-trigger-button';

    modalWrapper.append(triggerButton);
  }

  const modal = document.createElement('div');
  modalWrapper.append(modal);
  modal.dataset.element = 'modal';
  modal.dataset.testid = 'modal';
  modal.className = 'gi-modal';
  modal.dataset.position = arguments_.position || 'center';
  modal.dataset.open = (arguments_.isOpen || false).toString();

  const modalContainer = document.createElement('div');
  modal.append(modalContainer);
  modalContainer.dataset.element = 'modal-container';
  modalContainer.dataset.testid = 'modal-container';
  modalContainer.className = `gi-modal-container gi-modal-container-${arguments_.position} gi-drawer`;

  const modalHeader = document.createElement('div');
  modalContainer.append(modalHeader);
  if (arguments_.title) {
    const heading = createHeading(arguments_.title);
    modalHeader.append(heading);
  }

  if (arguments_.closeButtonLabel) {
    const closeButton = createButton({
      onClick: arguments_.onClose,
      appearance: 'dark',
      size: 'small',
      className: 'gi-modal-icon',
      variant: 'flat',
      content:
        arguments_.closeButtonLabel +
        ' <span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[16px]">close</span>',
    });
    modalHeader.append(closeButton);
  } else {
    const closeButton = createIconButton({
      icon: {
        icon: 'close',
      },
      onClick: arguments_.onClose,
      appearance: 'dark',
      size: 'small',
      className: 'gi-modal-icon',
      variant: 'flat',
    });
    modalHeader.append(closeButton);
  }

  const modalBody = document.createElement('div');
  modalContainer.append(modalBody);
  modalBody.dataset.testid = 'modal-body';
  modalBody.className = 'gi-modal-body g-drawer-body';
  modalBody.innerHTML = arguments_.body;

  if (arguments_.footer) {
    const modalFooter = document.createElement('div');
    modalContainer.append(modalFooter);
    modalFooter.dataset.testid = 'modal-footer';
    modalFooter.className = 'gi-modal-footer gi-drawer-footer';
    modalFooter.innerHTML = arguments_.footer;
  }

  return modalWrapper;
};

const createElement = (arguments_: DrawerWrapperPropsExtension) => {
  const component = createDrawer(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Optional custom class name for styling.',
    },
    closeButtonLabel: {
      control: 'text',
      description: 'Custom label for the close button.',
    },
    triggerButton: {
      control: 'text',
      description: 'The button that will trigger the drawer component.',
    },
    startsOpen: {
      control: 'boolean',
      description: 'Determines if the drawer is initially open.',
    },
    position: {
      control: 'radio',
      options: ['left', 'right', 'bottom'],
      description: 'Drawer position relative to the screen.',
    },
    closeButtonSize: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the close button.',
    },
    body: {
      control: 'text',
      description: 'The content that will be inserted inside the drawer.',
    },
  },
  args: {
    triggerButton: { content: 'Open Modal' },
    body: drawerBody,
    position: 'right',
  },
  render: createElement,
};

export const DrawerOpen: Story = {
  args: {
    triggerButton: { content: 'Open Modal' },
    body: drawerBody,
    position: 'right',
    startsOpen: true,
    footer: drawerFooter,
  },
  render: createElement,
};
