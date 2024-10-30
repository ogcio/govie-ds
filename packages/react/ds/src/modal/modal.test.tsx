import { render, cleanup, waitFor } from '../test-utils.js';
import { HtmlContent, TriggerButton } from './modal.content.js';
import { Modal, ModalProps } from './modal.js';

describe('modal', () => {
  afterEach(cleanup);
  const renderModal = (props: ModalProps) => render(<Modal {...props} />);

  it('should render the modal on load', () => {
    const screen = renderModal({ children: HtmlContent });
    const modalElement = screen.getByTestId('modal');
    const modalContainerElement = screen.getByTestId('modal-container');
    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    expect(modalContainerElement).toBeTruthy();
  });
  it('should open the modal on button trigger', async () => {
    const screen = renderModal({
      children: HtmlContent,
      triggerButton: TriggerButton,
    });
    const modalElement = screen.getByTestId('modal');
    const triggerButtonElement = screen.getByTestId('trigger-button-container');

    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);

    triggerButtonElement.click();

    await waitFor(() => {
      expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    });
  });
  it('should close the modal on icon click', async () => {
    const screen = renderModal({
      children: HtmlContent,
      triggerButton: TriggerButton,
    });
    const modalElement = screen.getByTestId('modal');
    const iconElement = screen
      .getByTestId('modal-container')
      .querySelector('.gi-modal-icon') as HTMLElement;
    const triggerButtonElement = screen.getByTestId('trigger-button-container');

    // Default state with Modal closed
    expect(iconElement).not.toBeVisible();
    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
    triggerButtonElement.click();

    // Modal Open
    await waitFor(() => {
      expect(iconElement).toBeVisible();
      expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    });
    iconElement.click();

    // Modal Closed by icon
    await waitFor(() => {
      expect(iconElement).not.toBeFalsy();
      expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
    });
  });
  it('should close the modal on overlay click', async () => {
    const screen = renderModal({
      children: HtmlContent,
      triggerButton: TriggerButton,
    });
    const modalElement = screen.getByTestId('modal');
    const triggerButtonElement = screen.getByTestId('trigger-button-container');

    // Default state with Modal closed
    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
    triggerButtonElement.click();

    // Modal Open
    await waitFor(() => {
      expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    });
    modalElement.click();

    // Modal Closed by modal overlay
    await waitFor(() => {
      expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
    });
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderModal({
      children: HtmlContent,
      triggerButton: TriggerButton,
    });

    await screen.axe();
  });
});
