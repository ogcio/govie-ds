import {
  renderComponent,
  cleanup,
  testVariantsAxe,
} from '../test-utilities.test.js';
import { type AlertProps, Alert } from './alert.js';

const variants: AlertProps['variant'][] = [
  'info',
  'success',
  'warning',
  'danger',
];

describe('Alert', () => {
  afterEach(cleanup);

  const renderAlert = (props: AlertProps) =>
    renderComponent(<Alert {...props} />);

  testVariantsAxe(Reflect.ownKeys(variants), (variant) =>
    renderAlert({
      variant,
      title: 'Information',
      children: 'This is an info alert',
    }),
  );

  it('should render alert with title and message', () => {
    const screen = renderAlert({
      variant: 'info',
      title: 'Information',
      children: 'This is an info alert',
      dataTestid: 'alert',
    });
    const alertElement = screen.getByTestId('alert');
    expect(alertElement).toBeTruthy();
    expect(screen.getByText('Information')).toBeTruthy();
    expect(screen.getByText('This is an info alert')).toBeTruthy();
  });

  it('should render different variants', () => {
    for (const variant of variants) {
      const screen = renderAlert({
        variant,
        title: `${variant} alert`,
        children: `This is a ${variant} alert`,
        dataTestid: 'alert',
      });
      const alertElement = screen.getByTestId('alert');
      expect(alertElement).toHaveClass(`gi-alert-${variant}`);
      cleanup();
    }
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderAlert({
      variant: 'success',
      title: 'Accessible Alert',
      children: 'This alert should be accessible',
    });
    await screen.axe();
  });
});
