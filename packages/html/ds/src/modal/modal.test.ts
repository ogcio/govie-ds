import { render } from '../common/render';
import {
  modalBody,
  modalFooter,
  modalTitle,
  triggerButton,
} from './modal.content';
import html from './modal.html?raw';
import { ModalProps } from './modal.schema';

describe('modal', () => {
  const renderModal = render<ModalProps>({
    componentName: 'modal',
    macroName: 'govieModal',
    html,
  });

  it('should render the modal on load', () => {
    const screen = renderModal({
      title: modalTitle,
      body: modalBody,
      footer: modalFooter,
      isOpen: true,
    });
    const modalElement = screen.getByTestId('modal');
    const modalContainerElement = screen.getByTestId('modal-container');
    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    expect(modalContainerElement).toBeTruthy();
  });

  it('should open the modal on button trigger', () => {
    const screen = renderModal({
      triggerButton,
      title: modalTitle,
      body: modalBody,
      footer: modalFooter,
      isOpen: false,
    });
    const modalElement = screen.getByTestId('modal');
    const triggerButtonElement = screen.getByTestId('trigger-button-container');

    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);

    triggerButtonElement.click();

    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
  });

  it('should close the modal on icon click', () => {
    const screen = renderModal({
      triggerButton,
      title: modalTitle,
      body: modalBody,
      footer: modalFooter,
      isOpen: false,
    });
    const modalElement = screen.getByTestId('modal');
    const iconElement = screen
      .getByTestId('modal-container')
      .querySelector('.gi-modal-icon') as HTMLElement;
    const triggerButtonElement = screen.getByTestId('trigger-button-container');

    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
    triggerButtonElement.click();

    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    iconElement.click();

    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
  });

  it('should close the modal on overlay click', () => {
    const screen = renderModal({
      triggerButton,
      title: modalTitle,
      body: modalBody,
      footer: modalFooter,
      isOpen: false,
    });
    const modalElement = screen.getByTestId('modal');
    const triggerButtonElement = screen.getByTestId('trigger-button-container');

    // Default state with Modal closed
    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
    triggerButtonElement.click();

    // Modal Open
    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    modalElement.click();

    // Modal Closed by modal overlay
    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderModal({
      triggerButton,
      title: modalTitle,
      body: modalBody,
      footer: modalFooter,
    });

    await screen.axe();
  });
});
