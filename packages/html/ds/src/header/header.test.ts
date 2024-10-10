import { render } from '../common/render';
import html from './header.html?raw';
import { HeaderProps } from './header.schema';

const standardProps = {
  logo: { href: '/home' },
  tools: {
    search: {
      action: '/search_page',
      label: 'Search',
    },
    menu: {
      label: 'Menu',
    },
  },
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
};

describe('header', () => {
  const renderHeader = render<HeaderProps>({
    componentName: 'header',
    macroName: 'govieHeader',
    html,
  });

  it('should pass axe tests', async () => {
    const screen = renderHeader({
      logo: { href: '/home' },
      tools: {
        search: {
          label: 'Search',
          action: '/search_page',
        },
        menu: {},
      },
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

  it('should show the nav link', () => {
    const screen = renderHeader(standardProps);

    for (const index of standardProps.navLinks.keys()) {
      const linkElement = screen.getByTestId(`nav-link-desktop-${index}`);
      expect(linkElement).toBeTruthy();
    }
  });

  it('should show the language links', () => {
    const screen = renderHeader(standardProps);

    for (const index of standardProps.languages.keys()) {
      const linkElement = screen.getByTestId(`language-link-desktop-${index}`);
      expect(linkElement).toBeTruthy();
    }
  });

  it('should show the search button', () => {
    const screen = renderHeader(standardProps);

    const searchElement = screen.getByTestId('SearchTrigger');
    expect(searchElement).toBeTruthy();
  });
});
