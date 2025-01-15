import { render } from '../common/render';
import { htmlContent, triggerButton } from './modal.content';
import html from './modal.html?raw';
import { ModalProps } from './modal.schema';

describe('modal', () => {
  const renderModal = render<ModalProps>({
    componentName: 'modal',
    macroName: 'govieModal',
    html,
  });

  it('should render the modal on load', () => {
    const screen = renderModal({ html: htmlContent });
    const modalElement = screen.getByTestId('modal');
    const modalContainerElement = screen.getByTestId('modal-container');
    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    expect(modalContainerElement).toBeTruthy();
  });
  it('should open the modal on button trigger', () => {
    const screen = renderModal({ html: htmlContent, triggerButton });
    const modalElement = screen.getByTestId('modal');
    const triggerButtonElement = screen.getByTestId('trigger-button-container');

    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);

    triggerButtonElement.click();

    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
  });
  it('should close the modal on icon click', () => {
    const screen = renderModal({ html: htmlContent, triggerButton });
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
    expect(iconElement).toBeVisible();
    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    iconElement.click();

    // Modal Closed by icon
    expect(iconElement).not.toBeFalsy();
    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
  });
  it('should close the modal on overlay click', () => {
    const screen = renderModal({ html: htmlContent, triggerButton });
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

  it('should apply aria attributes correctly', () => {
    const screen = renderModal({
      html: htmlContent,
      triggerButton,
      aria: {
        'aria-labelledby': 'modal-title',
        'aria-describedby': 'modal-description',
      },
    });

    const modalElement = screen.getByTestId('modal');

    expect(modalElement.getAttribute('aria-labelledby')).toBe('modal-title');
    expect(modalElement.getAttribute('aria-describedby')).toBe(
      'modal-description',
    );
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderModal({ html: htmlContent, triggerButton });

    await screen.axe();
  });
});
