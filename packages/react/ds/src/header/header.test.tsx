import { renderComponent, cleanup } from '../test-utilities.js';
import { HeaderSearch } from './components/header-search.js';
import { Header } from './header.js';
import { HeaderProps } from './types.js';

const standardProps: HeaderProps = {
  items: [
    {
      label: 'Search',
      icon: 'search',
      itemType: 'slot',
      component: <HeaderSearch />,
      slotAppearance: 'dropdown',
      showItemMode: 'desktop-only',
    },
    {
      itemType: 'divider',
      showItemMode: 'desktop-only',
    },
    {
      label: 'News',
      itemType: 'link',
      href: '#',
      showItemMode: 'desktop-only',
    },
    {
      label: 'Departments',
      itemType: 'link',
      href: '#',
      showItemMode: 'desktop-only',
    },
    {
      label: 'Services',
      itemType: 'link',
      href: '#',
      showItemMode: 'desktop-only',
    },
  ],
  secondaryLinks: [
    {
      href: '#',
      label: 'Gaeilge',
    },
  ],
};

describe('header', () => {
  afterEach(cleanup);
  const renderHeader = (props: HeaderProps) =>
    renderComponent(<Header {...props} />);

  it('should pass axe tests', async () => {
    const screen = renderHeader({
      logo: { href: '/home' },
      ...standardProps,
    });

    await screen.axe();
  });

  it('should show the nav link', () => {
    const screen = renderHeader(standardProps);

    for (const index of standardProps?.items?.keys() || []) {
      const linkElement = screen.getByTestId(`header-item-${index}`);
      expect(linkElement).toBeTruthy();
    }
  });

  it('should show the language links', () => {
    const screen = renderHeader(standardProps);

    for (const index of standardProps?.secondaryLinks?.keys() || []) {
      const linkElement = screen.getByTestId(`secondary-link-desktop-${index}`);
      expect(linkElement).toBeTruthy();
    }
  });

  it('should render header menu slots', () => {
    const screen = renderHeader({
      ...standardProps,
      items: [
        {
          itemType: 'slot',
          icon: 'thumb_up',
          label: 'Slot',
          component: <div>Here is a slot component</div>,
          slotAppearance: 'dropdown',
        },
        {
          itemType: 'slot',
          label: 'Slot 2',
          icon: 'info',
          component: <div>Here is a slot component 2</div>,
          slotAppearance: 'dropdown',
        },
        ...(standardProps?.items || []),
      ],
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

    const searchElement = screen.getByTestId('header-search-form');
    expect(searchElement).toBeTruthy();
  });
});
