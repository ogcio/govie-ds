import { userEvent } from '@testing-library/user-event';
import { Button } from '../button/button.js';
import { render, cleanup } from '../test-utils.js';
import { type ToastProps, Toast } from './toast.js';

describe('Toast', () => {
  afterEach(cleanup);

  const renderToast = (props: ToastProps) => render(<Toast {...props} />);

  it('should render toast with title and message', async () => {
    const screen = renderToast({
      title: 'Toast Title',
      description: 'This is the toast content',
    });

    expect(await screen.findByText('Toast Title')).toBeInTheDocument();
    expect(
      await screen.findByText('This is the toast content'),
    ).toBeInTheDocument();
  });

  it('should render all different variants', async () => {
    const variants: ToastProps['variant'][] = [
      'info',
      'success',
      'warning',
      'danger',
    ];

    for (const variant of variants) {
      const screen = renderToast({
        variant,
        title: `${variant} Toast`,
        description: `This is a ${variant} toast`,
      });

      const toastElement = screen.getByText(`${variant} Toast`);

      expect(toastElement.parentElement?.parentElement).toHaveClass(
        `gi-toast-${variant}`,
      );
    }
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderToast({
      variant: 'success',
      title: 'Accessible Toast',
      description: 'This toast should be accessible',
    });
    await screen.axe();
  });

  it('should render toast on button trigger', async () => {
    const screen = renderToast({
      title: 'Toast with Trigger',
      description: 'Toast has been triggered',
      trigger: <Button>Click Me</Button>,
    });

    const buttonElement = screen.container.querySelector('button');
    buttonElement && userEvent.click(buttonElement);

    expect(await screen.findByText('Toast Title')).toBeInTheDocument();
    expect(
      await screen.findByText('This is the toast content'),
    ).toBeInTheDocument();
  });
});
