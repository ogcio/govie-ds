import { act } from 'react';
import { Button } from '../button/button.js';
import { render, cleanup, waitFor } from '../test-utilities.js';
import { HtmlContent, TriggerButton } from './modal.content.js';
import { Modal, ModalFooter } from './modal.js';

import type { ModalProps } from './types.js';

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

  it('should render modal footer buttons in correct order', async () => {
    const screen = renderModal({
      dataTestId: 'modal-footer',
      children: (
        <>
          <ModalFooter>
            <Button variant="flat">Help</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save</Button>
          </ModalFooter>
        </>
      ),
      triggerButton: TriggerButton,
      startsOpen: true,
    });

    const triggerButtonElement = screen.getByTestId(
      'modal-trigger-button-container',
    );
    triggerButtonElement.click();

    await waitFor(() => {
      const footerButtons = screen
        .getByTestId('modal-footer')
        .querySelectorAll('button');

      expect(footerButtons).toHaveLength(4);
      expect(footerButtons[0].textContent).toBe('close');
      expect(footerButtons[1].textContent).toBe('Help');
      expect(footerButtons[2].textContent).toBe('Cancel');
      expect(footerButtons[3].textContent).toBe('Save');
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
