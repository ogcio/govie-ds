import { act } from 'react';
import { render, cleanup, waitFor } from '../test-utils.js';
import { HtmlContent, TriggerButton } from './modal.content.js';
import { Modal } from './modal.js';
import { ModalProps } from './types.js';

describe('modal', () => {
  afterEach(cleanup);

  const renderModal = (props: ModalProps) => render(<Modal {...props} />);

  it('should render the modal on load if startsOpen is true', () => {
    const screen = renderModal({
      children: HtmlContent,
      triggerButton: TriggerButton,
      startsOpen: true,
    });

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

    const triggerButtonElement = screen.getByTestId(
      'modal-trigger-button-container',
    );
    triggerButtonElement.click();

    await waitFor(() => {
      const modalElement = screen.getByTestId('modal');
      expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    });
  });

  it('should close the modal on icon click', async () => {
    const screen = renderModal({
      children: HtmlContent,
      triggerButton: TriggerButton,
    });

    const modalElement = screen.getByTestId('modal');
    const triggerButtonElement = screen.getByTestId(
      'modal-trigger-button-container',
    );

    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);

    await act(async () => {
      triggerButtonElement.click();
    });

    await waitFor(() => {
      expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    });

    const iconElement = screen
      .getByTestId('modal-container')
      .querySelector('.gi-modal-icon') as HTMLElement;

    expect(iconElement).toBeVisible();

    await act(async () => {
      iconElement.click();
    });
  });

  it('should close the modal on overlay click', async () => {
    const screen = renderModal({
      children: HtmlContent,
      triggerButton: TriggerButton,
    });

    const triggerButtonElement = screen.getByTestId(
      'modal-trigger-button-container',
    );

    triggerButtonElement.click();

    await waitFor(() => {
      const modalElement = screen.getByTestId('modal');
      expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
      modalElement.click();
    });

    await waitFor(() => {
      const modalElement = screen.getByTestId('modal');
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
