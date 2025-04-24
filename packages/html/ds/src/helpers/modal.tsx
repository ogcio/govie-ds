import { DrawerWrapperProps } from '../drawer/types';
import { createButton, createIconButton } from './buttons';
import { createHeading } from './typography';

export const createDrawer = (arguments_: DrawerWrapperProps) => {
  const modalWrapper = document.createElement('div');
  modalWrapper.dataset.module = 'gieds-drawer';

  if ('triggerButton' in arguments_ && arguments_.triggerButton) {
    const triggerButton = createButton(arguments_.triggerButton);
    triggerButton.dataset.element = 'drawer-trigger-button';
    triggerButton.dataset.testid = 'drawer-trigger-button';

    modalWrapper.append(triggerButton);
  }

  const modal = document.createElement('div');
  modalWrapper.append(modal);
  modal.dataset.element = 'modal';
  modal.dataset.testid = 'modal';
  modal.className = 'gi-modal gi-modal-close';
  modal.dataset.position = arguments_.position || 'center';
  modal.dataset.open = (arguments_.isOpen || false).toString();

  const modalContainer = document.createElement('div');
  modal.append(modalContainer);
  modalContainer.dataset.element = 'modal-container';
  modalContainer.dataset.testid = 'modal-container';
  modalContainer.className = `gi-modal-container-control gi-modal-container gi-modal-container-${arguments_.position} gi-drawer-container`;

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
