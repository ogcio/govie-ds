import { Button } from '../button/button.js';
import { render, cleanup, waitFor } from '../test-utils.js';
import { Drawer, DrawerBody, DrawerFooter } from './drawer.js';

describe('drawer', () => {
  afterEach(cleanup);

  const renderDrawer = (props: any) =>
    render(
      <Drawer {...props}>
        <DrawerBody>Here is the body content of the drawer.</DrawerBody>
        <DrawerFooter>
          <Button>Close Drawer</Button>
        </DrawerFooter>
      </Drawer>,
    );

  it('should render the drawer open on load if isOpen is true', () => {
    const screen = renderDrawer({
      isOpen: true,
      position: 'right',
    });

    const drawerElement = screen.getByTestId('modal');
    const drawerContainerElement = screen.getByTestId('modal-container');

    expect(drawerElement.classList.contains('gi-modal-open')).toBe(true);
    expect(drawerContainerElement).toBeTruthy();
  });

  it('should close the drawer on overlay click', async () => {
    const onClose = vitest.fn();
    const screen = renderDrawer({ isOpen: true, onClose, position: 'right' });

    const drawerElement = screen.getByTestId('modal');

    await waitFor(() => {
      expect(drawerElement.classList.contains('gi-modal-open')).toBe(true);
      drawerElement.click();
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderDrawer({
      isOpen: true,
      position: 'right',
    });

    await screen.axe();
  });
});
