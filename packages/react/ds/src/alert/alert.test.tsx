import { render, fireEvent, cleanup } from '../test-utils.js';
import { type AlertProps, Alert } from './alert.js';

describe('Alert', () => {
  afterEach(cleanup);

  const renderAlert = (props: AlertProps) => render(<Alert {...props} />);

  it('should render alert with title and message', () => {
    const screen = renderAlert({
      variant: 'info',
      title: 'Information',
      children: 'This is an info alert',
    });
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeTruthy();
    expect(screen.getByText('Information')).toBeTruthy();
    expect(screen.getByText('This is an info alert')).toBeTruthy();
  });

  it('should render different variants', () => {
    const variants: AlertProps['variant'][] = [
      'info',
      'success',
      'warning',
      'danger',
    ];
    for (const variant of variants) {
      const screen = renderAlert({
        variant,
        title: `${variant} alert`,
        children: `This is a ${variant} alert`,
      });
      const alertElement = screen.getByRole('alert');
      expect(alertElement).toHaveClass(`gi-alert-${variant}`);
      cleanup();
    }
  });

  it('should be dismissible when dismissable prop is true', () => {
    const screen = renderAlert({
      variant: 'info',
      title: 'Dismissible Alert',
      children: 'This alert can be dismissed',
      dismissable: true,
    });
    const dismissButton = screen.getByRole('button');
    expect(dismissButton).toBeTruthy();
    fireEvent.click(dismissButton);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('should not be dismissible when dismissable prop is false', () => {
    const screen = renderAlert({
      variant: 'info',
      title: 'Non-dismissible Alert',
      children: 'This alert cannot be dismissed',
      dismissable: false,
    });
    expect(screen.queryByRole('button')).toBeNull();
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
