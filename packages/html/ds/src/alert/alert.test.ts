import { render } from '../common/render';
import { testVariantsAxe } from '../helpers/test-helpers';
import { AlertProps, AlertVariant } from './alert-schema';
import html from './alert.html?raw';

const standardProps = {
  title: 'Title',
  children: '<p>Content</p>',
};

const variants: AlertVariant[] = [
  AlertVariant.INFO,
  AlertVariant.SUCCESS,
  AlertVariant.WARNING,
  AlertVariant.DANGER,
];

describe('alert', () => {
  const renderAlert = render<AlertProps>({
    componentName: 'alert',
    macroName: 'govieAlert',
    html,
  });

  testVariantsAxe(Reflect.ownKeys(variants), (variant) =>
    renderAlert({
      variant,
      title: 'Information',
      children: 'This is an info alert',
    }),
  );

  it('should render alert with title and message', () => {
    const screen = renderAlert(standardProps);
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeTruthy();
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('should render different variants', () => {
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
