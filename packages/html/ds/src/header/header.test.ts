import { userEvent } from '@testing-library/user-event';
import { render } from '../common/render';
import html from './header.html?raw';
import { HeaderProps } from './header.schema';

// TODO: replace these tests, use getByTestId as a last resort
// see https://testing-library.com/docs/queries/about/#priority
describe('header', () => {
  const renderHeader = render<HeaderProps>({
    componentName: 'header',
    macroName: 'govieHeader',
    html,
  });

  it('should throw exception for missing title', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => renderHeader({} as any)).toThrowError(
      `Missing required properties 'title'.`,
    );
  });

  it('should render header title', () => {
    const screen = renderHeader({ title: 'Application service' });
    expect(screen.getByText('Application service')).toBeTruthy();
  });

  it('should hide container by default', () => {
    const screen = renderHeader({ title: 'Application service' });

    const searchContainer = screen.getByTestId('container');
    expect(searchContainer.classList.contains('js:gi-max-height')).toBe(true);
  });

  it('should display container when search icon is selected', async () => {
    const screen = renderHeader({ title: 'Application service' });

    const searchIcon = screen.getByTestId('search');
    const searchContainer = screen.getByTestId('container');

    await userEvent.click(searchIcon);
    expect(searchContainer.classList.contains('js:gi-max-height')).toBe(false);
  });

  it('should pass axe tests', async () => {
    const screen = renderHeader({ title: 'Application service' });
    await screen.axe();
  });
});
