import { render } from '../common/render';
import { AlertProps, AlertVariant } from './alert-schema';
import html from './alert.html?raw';

const standardProps = {
  title: 'Title',
  children: '<p>Content</p>',
};

describe('alert', () => {
  const renderAlert = render<AlertProps>({
    componentName: 'alert',
    macroName: 'govieAlert',
    html,
  });

  it('should render alert with title and message', () => {
    const screen = renderAlert(standardProps);
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeTruthy();
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('should render different variants', () => {
    const variants: AlertVariant[] = [
      AlertVariant.INFO,
      AlertVariant.SUCCESS,
      AlertVariant.WARNING,
      AlertVariant.DANGER,
    ];
    for (const variant of variants) {
      const screen = renderAlert({ ...standardProps, variant });
      const alertElement = screen.getByRole('alert');
      expect(alertElement).toHaveClass(`gi-alert-${variant}`);
    }
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderAlert(standardProps);
    await screen.axe();
  });
});
