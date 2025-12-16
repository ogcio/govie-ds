import { DrawerWrapperProps } from '../drawer/types';
import { ModalWrapperPropsExtension } from '../modal/types';
import { beautifyHtmlNode } from '../storybook/storybook';
import { createButton, createIconButton } from './buttons';
import { createIcon } from './icons';
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
  const position = arguments_.position || 'right';
  modal.dataset.position = position;
  modal.dataset.open = (arguments_.isOpen || false).toString();

  const modalContainer = document.createElement('div');
  modal.append(modalContainer);
  modalContainer.dataset.element = 'modal-container';
  modalContainer.dataset.testid = 'modal-container';
  modalContainer.className = `gi-modal-container-control gi-modal-container gi-modal-container-${position} gi-drawer-container`;

  const modalHeader = document.createElement('div');
  modalContainer.append(modalHeader);
  if (arguments_.title) {
    const heading = createHeading(arguments_.title);
    modalHeader.append(heading);
  }

  if (arguments_.closeButtonLabel) {
    modalHeader.classList.add('gi-py-2');
    modalHeader.classList.add('xs:gi-py-4');
    const closeButton = createButton({
      onClick: arguments_.onClose,
      appearance: 'dark',
      size: arguments_.closeButtonSize || 'small',
      className: 'gi-modal-icon',
      variant: 'flat',
      content:
        arguments_.closeButtonLabel +
        beautifyHtmlNode(
          createIcon({
            icon: 'close',
            size: arguments_.closeButtonSize === 'small' ? 'sm' : 'md',
          }),
        ),
    });
    modalHeader.append(closeButton);
  } else {
    modalHeader.classList.add('gi-py-4');
    modalHeader.classList.add('xs:gi-py-6');
    const closeButton = createIconButton({
      icon: {
        icon: 'close',
      },
      onClick: arguments_.onClose,
      appearance: 'dark',
      size: arguments_.closeButtonSize || 'small',
      className: 'gi-modal-icon',
      variant: 'flat',
    });
    modalHeader.append(closeButton);
  }

  const modalInnerContainer = document.createElement('div');
  modalInnerContainer.className = 'gi-pb-6';

  const modalBody = document.createElement('div');
  modalInnerContainer.append(modalBody);
  modalBody.dataset.testid = 'modal-body';
  modalBody.className = 'gi-drawer-body';
  modalBody.innerHTML = arguments_.body;

  if (arguments_.footer) {
    const modalFooter = document.createElement('div');
    modalInnerContainer.className = '';
    modalInnerContainer.append(modalFooter);
    modalFooter.dataset.testid = 'modal-footer';
    modalFooter.className = 'gi-modal-footer gi-drawer-footer';
    modalFooter.innerHTML = arguments_.footer;
  }

  modalContainer.append(modalInnerContainer);

  return modalWrapper;
};

export const createModal = (arguments_: ModalWrapperPropsExtension) => {
  const modalWrapper = document.createElement('div');
  modalWrapper.dataset.module = 'gieds-modal';
  const position = arguments_.position || 'center';
  const closeOnClick =
    arguments_.closeOnClick === undefined || arguments_.closeOnClick;
  const onClose =
    closeOnClick && arguments_.onClose ? arguments_.onClose : () => null;

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
  modal.dataset.position = position;
  modal.dataset.open = (arguments_.isOpen || false).toString();

  const modalContainer = document.createElement('div');
  modal.append(modalContainer);
  modalContainer.dataset.element = 'modal-container';
  modalContainer.dataset.testid = 'modal-container';
  modalContainer.dataset.size = arguments_.size;
  modal.dataset.closeonclick = (
    arguments_.closeOnClick === undefined || arguments_.closeOnClick
  ).toString();
  modal.dataset.closeonoverlayclick = (
    arguments_.closeOnOverlayClick === undefined ||
    arguments_.closeOnOverlayClick
  ).toString();
  modal.dataset.closeonescape = (
    arguments_.closeOnEscape === undefined || arguments_.closeOnEscape
  ).toString();

  modalContainer.className = `gi-modal-container-control gi-modal-container gi-modal-container-${position}`;

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('gi-py-2');
  modalHeader.classList.add('xs:gi-py-4');
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
      onClick: onClose,
      appearance: 'dark',
      size: 'small',
      className: 'gi-modal-icon',
      variant: 'flat',
      content:
        arguments_.closeButtonLabel +
        ' <span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[16px]">close</span>',
    });
    closeButton.dataset.element = 'modal-close-button';
    modalHeader.append(closeButton);
  } else if (closeOnClick) {
    const closeButton = createIconButton({
      icon: {
        icon: 'close',
      },
      onClick: onClose,
      appearance: 'dark',
      size: 'small',
      className: 'gi-modal-icon',
      variant: 'flat',
    });
    closeButton.dataset.element = 'modal-close-button';
    modalHeader.append(closeButton);
  }

  const modalInnerContainer = document.createElement('div');
  modalInnerContainer.className = 'gi-pb-6';

  const modalBody = document.createElement('div');
  modalInnerContainer.append(modalBody);
  modalBody.dataset.testid = 'modal-body';
  modalBody.dataset.element = 'modal-body';
  modalBody.className = 'gi-modal-body';
  modalBody.innerHTML = arguments_.body;
  modalBody.tabIndex = -1;

  if (arguments_.footer) {
    const modalFooter = document.createElement('div');
    modalInnerContainer.className = '';
    modalInnerContainer.append(modalFooter);
    modalFooter.dataset.testid = 'modal-footer';
    modalFooter.className = 'gi-modal-footer';
    modalFooter.innerHTML = arguments_.footer;
  }

  modalContainer.append(modalInnerContainer);

  return modalWrapper;
};
