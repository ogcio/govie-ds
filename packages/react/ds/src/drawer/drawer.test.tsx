import { act } from 'react';
import { userEvent } from 'storybook/test';
import { Button } from '../button/button.js';
import { renderComponent, cleanup, waitFor } from '../test-utilities.js';
import { HtmlContent, TriggerButton } from './drawer.content.js';
import { Drawer, DrawerBody, DrawerFooter, DrawerProps } from './drawer.js';

describe('drawer', () => {
  afterEach(cleanup);

  const renderDrawer = (props: DrawerProps) =>
    renderComponent(
      <Drawer {...props}>
        <DrawerBody>Here is the body content of the drawer.</DrawerBody>
        <DrawerFooter>
          <Button>Close Drawer</Button>
        </DrawerFooter>
      </Drawer>,
    );

  it('should render the drawer on load if startsOpen is true', () => {
    const screen = renderDrawer({
      children: HtmlContent,
      triggerButton: TriggerButton,
      startsOpen: true,
    });

    const modalElement = screen.getByTestId('modal');
    const modalContainerElement = screen.getByTestId('modal-container');

    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    expect(modalContainerElement).toBeTruthy();
  });

  it('should open the drawer on button trigger', async () => {
    const screen = renderDrawer({
      children: HtmlContent,
      triggerButton: TriggerButton,
    });

    const triggerButtonElement = screen.getByTestId(
      'drawer-trigger-button-container',
    );
    triggerButtonElement.click();

    await waitFor(() => {
      const modalElement = screen.getByTestId('modal');
      expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    });
  });

  it('should close the drawer on icon click', async () => {
    const screen = renderDrawer({
      children: HtmlContent,
      triggerButton: TriggerButton,
    });

    const modalElement = screen.getByTestId('modal');
    const triggerButtonElement = screen.getByTestId(
      'drawer-trigger-button-container',
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

  it('should close the drawer on overlay click', async () => {
    const screen = renderDrawer({
      children: HtmlContent,
      triggerButton: TriggerButton,
    });

    const triggerButtonElement = screen.getByTestId(
      'drawer-trigger-button-container',
    );

    triggerButtonElement.click();
    const modalElement = screen.getByTestId('modal');

    await waitFor(() => {
      expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    });

    await userEvent.click(modalElement);

    await waitFor(() => {
      const modalElement = screen.getByTestId('modal');
      expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
    });
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderDrawer({
      children: HtmlContent,
      triggerButton: TriggerButton,
    });

    await screen.axe();
  });
});
