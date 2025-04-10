import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { ButtonProps } from '../button/types';
import { createButton, createIconButton } from '../helpers/buttons';
import { createHeading } from '../helpers/typography';
import { beautifyHtmlNode } from '../storybook/storybook';
import { modalBody, modalFooter, modalTitle } from './modal.content';
import { ModalWrapperProps } from './types';

type ModalWrapperPropsExtension = ModalWrapperProps & {
  triggerButton: ButtonProps;
};

const meta: Meta<ModalWrapperPropsExtension> = {
  title: 'Application/Modal',
};

export default meta;
type Story = StoryObj<ModalWrapperPropsExtension>;

const createModal = (arguments_: ModalWrapperPropsExtension) => {
  const modalWrapper = document.createElement('div');
  modalWrapper.dataset.module = 'gieds-modal';

  if (arguments_.triggerButton) {
    const triggerButton = createButton(arguments_.triggerButton);
    triggerButton.dataset.element = 'trigger-button';
    triggerButton.dataset.testid = 'trigger-button';

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
  modalContainer.dataset.size = arguments_.size;
  modalContainer.className = `gi-modal-container-control gi-modal-container gi-modal-container-${arguments_.position}`;

  const modalHeader = document.createElement('div');
  modalContainer.append(modalHeader);

  if (arguments_.title) {
    const modalTitle = document.createElement('div');
    modalHeader.append(modalTitle);
    modalTitle.className = 'gi-flex-1';
    const heading = createHeading(arguments_.title);
    modalTitle.append(heading);
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
  modalBody.className = 'gi-modal-body';
  modalBody.innerHTML = arguments_.body;

  const modalFooter = document.createElement('div');
  modalContainer.append(modalFooter);
  modalFooter.dataset.testid = 'modal-footer';
  modalFooter.className = 'gi-modal-footer';
  modalFooter.innerHTML = arguments_.footer;

  return modalWrapper;
};

const createElement = (arguments_: ModalWrapperPropsExtension) => {
  const component = createModal(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    body: modalBody,
    footer: modalFooter,
    triggerButton: { content: 'Open Modal' },
    isOpen: false,
    size: 'md',
    position: 'center',
  },
  render: createElement,
};

export const Test: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    body: modalBody,
    footer: modalFooter,
    triggerButton: { content: 'Open Modal' },
    isOpen: false,
    size: 'md',
    position: 'center',
  },
  render: createElement,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const modalElement = canvas.getByTestId('modal');
    const triggerButtonElement = canvas.getByTestId('trigger-button');
    const iconElement = canvas
      .getByTestId('modal-container')
      .querySelector('.gi-modal-icon') as HTMLElement;

    // Default state with Modal closed
    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);

    // Modal Open
    await userEvent.click(triggerButtonElement);
    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);

    // Modal Close using close button
    await userEvent.click(iconElement);
    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);

    // Modal Open
    await userEvent.click(triggerButtonElement);
    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);

    // Modal Closed by modal overlay
    await userEvent.click(modalElement);
    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
  },
};

export const CenterLarge: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    body: modalBody,
    footer: modalFooter,
    isOpen: true,
    size: 'lg',
    position: 'center',
  },
  render: createElement,
};

export const CenterMedium: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    body: modalBody,
    footer: modalFooter,
    isOpen: true,
    size: 'md',
    position: 'center',
  },
  render: createElement,
};

export const CenterSmall: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    body: modalBody,
    footer: modalFooter,
    isOpen: true,
    size: 'sm',
    position: 'center',
  },
  render: createElement,
};
