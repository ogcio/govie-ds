import { userEvent } from '@testing-library/user-event';
import { render } from '../common/render';
import html from './header.html?raw';
import { HeaderProps } from './header.schema';

describe('header', () => {
  const renderHeader = render<HeaderProps>({
    name: 'govieHeader',
    html,
  });

  it('should render header title', () => {
    const screen = renderHeader({ title: 'Application service' });
    expect(screen.getByText('Application service')).toBeTruthy();
  });

  it('should hide container by default', () => {
    const screen = renderHeader({ title: 'Application service' });

    const searchContainer = screen.getByTestId('container');
    expect(searchContainer).toHaveClass('js:gi-max-height');
  });

  it('should display container when search icon is selected', async () => {
    const screen = renderHeader({ title: 'Application service' });

    const searchIcon = screen.getByTestId('search');
    const searchContainer = screen.getByTestId('container');

    await userEvent.click(searchIcon);

    expect(searchContainer).not.toHaveClass('js:gi-max-height');
  });

  it('should pass axe tests', async () => {
    const screen = renderHeader({ title: 'Application service' });
    await screen.axe();
  });
});
