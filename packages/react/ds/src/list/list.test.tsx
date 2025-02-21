import { Link } from '../link/link.js';
import { render, cleanup } from '../test-utils.js';
import { ListProps, ListTypeEnum, List } from './list.js';

describe('govieList', () => {
  afterEach(cleanup);
  const renderList = (props: ListProps) => render(<List {...props} />);

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
    const items = [<Link href="#">Link 1</Link>, <Link href="#">Link 2</Link>];

    const screen = renderList({
      items,
    });

    const listElement = screen.getByRole('list');
    const links = screen.getAllByRole('link');

    for (const link of links) {
      const linkWithHref = link.getAttribute('href');
      expect(linkWithHref).toEqual('#');
    }
    expect(links.length).toBe(items.length);
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
      type: ListTypeEnum.Number,
    });

    const listContainer = screen.getByTestId('govieList');
    expect(listContainer.classList.contains('gi-list-number')).toBe(true);
  });

  it('should have correct className when type is "bullet"', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const screen = renderList({
      items,
      type: ListTypeEnum.Bullet,
    });

    const listContainer = screen.getByTestId('govieList');
    expect(listContainer.classList.contains('gi-list-bullet')).toBe(true);
  });

  it('should have correct className when type is "none"', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const screen = renderList({
      items,
      type: ListTypeEnum.None,
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
      type: ListTypeEnum.Bullet,
    });

    const listContainer = screen.getByTestId('govieList');
    expect(listContainer.classList.contains('gi-list-spaced')).toBe(true);
    expect(listContainer.classList.contains('gi-list-bullet')).toBe(true);
  });

  it('should pass axe accessibility tests', async () => {
    const items = [<Link href="#">Link 1</Link>, <Link href="#">Link 2</Link>];
    const screen = renderList({
      items,
      spaced: true,
      type: ListTypeEnum.Number,
    });

    await screen.axe();
  });
});
