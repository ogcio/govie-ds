import { render, cleanup } from '../test-utils.js';
import { HeaderProps, Header } from './header.js';

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
  afterEach(cleanup);
  const renderHeader = (props: HeaderProps) => render(<Header {...props} />);

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

  it('should render header menu slots', () => {
    const screen = renderHeader({
      ...standardProps,
      tools: {
        ...standardProps.tools,
        items: [
          {
            href: '#',
            icon: 'thumb_up',
            slot: <div>Here is a slot component</div>,
            label: 'Slot',
          },
          {
            href: '#',
            icon: 'info',
            slot: <div>Here is a slot component 2</div>,
            label: 'Slot 2',
          },
        ],
      },
    });

    const slotMenu = screen.getByTestId('ItemActionTrigger-0');
    expect(slotMenu).toBeInTheDocument();
    expect(screen.getByText('Slot'));

    const slotMenu1 = screen.getByTestId('ItemActionTrigger-1');
    expect(slotMenu1).toBeInTheDocument();
    expect(screen.getByText('Slot 2'));
  });

  it('should show the search button', () => {
    const screen = renderHeader(standardProps);

    const searchElement = screen.getByTestId('SearchTrigger');
    expect(searchElement).toBeTruthy();
  });

  it('should show menu when mobile when having just languages props', () => {
    const screen = renderHeader({
      logo: { href: '/home' },
      languages: [
        {
          href: '#',
          label: 'Gaeilge',
        },
        {
          href: '#',
          label: 'English',
        },
      ],
    });

    const mobileMenu = screen.getByTestId('header-mobile-menu');
    expect(mobileMenu).toBeInTheDocument();
  });
});
