import { render, cleanup, act, waitFor } from '../test-utils.js';
import { ToastProvider, toaster } from './toast.js';
import type { ToastProps } from './types.js';

const variants: ToastProps['variant'][] = [
  'info',
  'success',
  'warning',
  'danger',
];

describe('Toast', () => {
  afterEach(cleanup);

  const triggerToast = (props: ToastProps) => {
    const screen = render(<ToastProvider />);
    toaster.create(props);

    return screen;
  };

  it('should render toast with title and message', async () => {
    const screen = triggerToast({
      title: 'Toast Title',
      description: 'This is the toast content',
    });
    expect(await screen.findByText('Toast Title')).toBeInTheDocument();
    expect(
      await screen.findByText('This is the toast content'),
    ).toBeInTheDocument();
  });

  it('should render all different variants', async () => {
    const screen = render(<ToastProvider />);
    for (const variant of variants) {
      const title = `Toast`;

      toaster.create({
        variant,
        title,
        description: `This is a Toast`,
      });

      await waitFor(() => {
        const toastElement = screen.getByTestId(`${title}-${variant}`);
        expect(toastElement).not.toBeNull();
      });
    }
  });

  it('should pass axe accessibility tests', async () => {
    const screen = triggerToast({
      variant: 'success',
      title: 'Accessible Toast',
      description: 'This toast should be accessible',
    });
    await screen.axe();
  });
});
