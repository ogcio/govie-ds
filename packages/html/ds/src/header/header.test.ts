import { render } from '../common/render';
import html from './header.html?raw';
import { HeaderProps } from './header.schema';

describe('header', () => {
  const renderHeader = render<HeaderProps>({
    componentName: 'header',
    macroName: 'govieHeader',
    html,
  });

  it('should pass axe tests', async () => {
    const screen = renderHeader({
      logoLink: '/home',
      noJsMenuLink: '/menu',
      noJsSearchLink: '/search',
      navLinks: [
        {
          href: '#link-1',
          label: 'News',
        },
        {
          href: '#link-2',
          label: 'Departments',
        },
        {
          href: '#link-3',
          label: 'Services',
        },
      ],
      languages: [
        {
          href: '#',
          label: 'Gaeilge',
        },
      ],
    });

    await screen.axe();
  });
});
