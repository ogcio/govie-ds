import { userEvent } from '@testing-library/user-event';
import { render } from '../common/render';
import { testVariantsAxe } from '../helpers/test-helpers';
import html from '../toast/toast.html?raw';
import { ToastProps, ToastVariant } from './toast.schema';

const standardProps = {
  title: 'Toast Title',
  description: 'This is the toast content',
};

const variants: ToastProps['variant'][] = [
  ToastVariant.Info,
  ToastVariant.Success,
  ToastVariant.Warning,
  ToastVariant.Danger,
];

describe('toast', () => {
  const renderToast = render<ToastProps>({
    componentName: 'toast',
    macroName: 'govieToast',
    html,
  });

  testVariantsAxe(variants, (variant) =>
    renderToast({
      title: 'Axe test',
      description: 'axe test',
      variant,
    }),
  );

  it('should render toast with title and message', () => {
    const screen = renderToast(standardProps);

    expect(screen.getByText('Toast Title')).toBeInTheDocument();
    expect(screen.getByText('This is the toast content')).toBeInTheDocument();
  });

  it('should render all different variants', () => {
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
      variant: ToastVariant.Success,
      title: 'Accessible Toast',
      description: 'This toast should be accessible',
    });
    await screen.axe();
  });
  it('should render toast on button trigger', async () => {
    const screen = renderToast({
      title: 'Toast with Trigger',
      description: 'Toast has been triggered',
      trigger: {
        content: 'Click me',
      },
    });

    const buttonElement = screen.container.querySelector('button');
    buttonElement && userEvent.click(buttonElement);

    expect(screen.getByText('Toast with Trigger')).toBeInTheDocument();
    expect(screen.getByText('Toast has been triggered')).toBeInTheDocument();
  });
});
