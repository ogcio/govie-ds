import { render } from '../common/render';
import {
  drawerBody,
  drawerFooter,
  drawerTriggerButton,
} from './drawer.content';
import html from './drawer.html?raw';
import { DrawerProps } from './drawer.schema.js';

describe('drawer', () => {
  const renderDrawer = render<DrawerProps>({
    componentName: 'drawer',
    macroName: 'govieDrawer',
    html,
  });

  it('should render the drawer on load if startsOpen is true', () => {
    const screen = renderDrawer({
      body: drawerBody,
      footer: drawerFooter,
      startsOpen: true,
      dataTestid: 'drawer-trigger-button-container',
    });

    const modalElement = screen.getByTestId('modal');
    const modalContainerElement = screen.getByTestId('modal-container');

    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    expect(modalContainerElement).toBeTruthy();
  });
  it('should open the drawer on button trigger', async () => {
    const screen = renderDrawer({
      triggerButton: drawerTriggerButton,
      body: drawerBody,
      footer: drawerFooter,
      startsOpen: false,
      dataTestid: 'drawer-trigger-button-container',
    });

    const triggerButtonElement = screen.getByTestId(
      'drawer-trigger-button-container',
    );
    triggerButtonElement.click();

    const modalElement = screen.getByTestId('modal');
    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
  });

  it('should close the drawer on icon click', async () => {
    const screen = renderDrawer({
      triggerButton: drawerTriggerButton,
      body: drawerBody,
      footer: drawerFooter,
      startsOpen: false,
      dataTestid: 'drawer-trigger-button-container',
    });

    const modalElement = screen.getByTestId('modal');
    const triggerButtonElement = screen.getByTestId(
      'drawer-trigger-button-container',
    );

    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);

    triggerButtonElement.click();

    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);

    const iconElement = screen
      .getByTestId('modal-container')
      .querySelector('.gi-modal-icon') as HTMLElement;

    expect(iconElement).toBeVisible();

    iconElement.click();
  });

  it('should close the drawer on overlay click', async () => {
    const screen = renderDrawer({
      triggerButton: drawerTriggerButton,
      body: drawerBody,
      footer: drawerFooter,
      startsOpen: false,
      dataTestid: 'drawer-trigger-button-container',
    });

    const triggerButtonElement = screen.getByTestId(
      'drawer-trigger-button-container',
    );

    triggerButtonElement.click();

    const modalElement = screen.getByTestId('modal');
    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
    modalElement.click();

    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderDrawer({
      triggerButton: drawerTriggerButton,
      body: drawerBody,
      footer: drawerFooter,
      startsOpen: false,
      dataTestid: 'drawer-trigger-button-container',
    });

    await screen.axe();
  });
});
