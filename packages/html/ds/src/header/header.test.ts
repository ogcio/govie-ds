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

  it('should pass axe tests', async () => {
    const screen = renderHeader({ title: 'Application service' });
    await screen.axe();
  });
});
