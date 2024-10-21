import { render } from '../common/render';
import html from './list.html?raw';
import { ListProps, TypeEnum } from './list.schema';

describe('govieList', () => {
  const renderList = render<ListProps>({
    componentName: 'list',
    macroName: 'govieList',
    html,
  });

  it('should render a list correctly with items', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const screen = renderList({
      items,
    });
    const listElement = screen.getByRole('list');

    for (const item of items) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }

    expect(listElement).toBeInTheDocument();
  });

  it('should render a list of links correctly', () => {
    const items = [
      {
        href: '#',
        label: 'Link 1',
      },
      {
        href: '#',
        label: 'Link 1',
      },
    ];

    const screen = renderList({
      items,
    });

    const listElement = screen.getByRole('list');

    for (const item of items) {
      const links = screen.getAllByRole('link', { name: item.label });
      const linkWithHref = links.find(
        (link) => link.getAttribute('href') === item.href,
      );
      expect(linkWithHref).toBeInTheDocument();
    }
    expect(listElement).toBeInTheDocument();
  });

  it('should have correct className for default type "normal"', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const screen = renderList({
      items,
    });

    const listContainer = screen.getByTestId('govieList');
    expect(listContainer.classList.contains('gi-list')).toBe(true);
  });

  it('should have correct className when type is "number"', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const screen = renderList({
      items,
      type: TypeEnum.Number,
    });

    const listContainer = screen.getByTestId('govieList');
    expect(listContainer.classList.contains('gi-list-number')).toBe(true);
  });

  it('should have correct className when type is "bullet"', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const screen = renderList({
      items,
      type: TypeEnum.Bullet,
    });

    const listContainer = screen.getByTestId('govieList');
    expect(listContainer.classList.contains('gi-list-bullet')).toBe(true);
  });

  it('should have correct className when type is "none"', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const screen = renderList({
      items,
      type: TypeEnum.None,
    });
    const listContainer = screen.getByTestId('govieList');
    expect(listContainer.classList.contains('gi-list')).toBe(true);
  });

  it('should have correct className when is "spaced"', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const screen = renderList({
      items,
      spaced: true,
    });

    const listContainer = screen.getByTestId('govieList');
    expect(listContainer.classList.contains('gi-list-spaced')).toBe(true);
  });

  it('should have correct "spaced" class combined with the "type" class', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const screen = renderList({
      items,
      spaced: true,
      type: TypeEnum.Bullet,
    });

    const listContainer = screen.getByTestId('govieList');
    expect(listContainer.classList.contains('gi-list-spaced')).toBe(true);
    expect(listContainer.classList.contains('gi-list-bullet')).toBe(true);
  });

  it('should pass axe accessibility tests', async () => {
    const items = [
      {
        href: '#',
        label: 'Link 1',
      },
      {
        href: '#',
        label: 'Link 1',
      },
    ];
    const screen = renderList({
      items,
      spaced: true,
      type: TypeEnum.Number,
    });

    await screen.axe();
  });
});
