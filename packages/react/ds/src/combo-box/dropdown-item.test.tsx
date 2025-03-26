import { fireEvent, render, screen } from '../test-utils.js';
import { DropdownItem } from './dropdown-item.js';

const OPTIONS = [
  { label: 'Design', value: 'design' },
  { label: 'Development', value: 'development' },
  { label: 'Marketing', value: 'marketing' },
];

describe('DropdownItem', () => {
  it('renders with title and options', () => {
    render(
      <DropdownItem options={OPTIONS} defaultValue={[]} onChange={() => {}}>
        Categories
      </DropdownItem>,
    );

    expect(
      screen.getByRole('group', { name: 'Categories dropdown' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  it('toggles open and closed on button click', () => {
    render(
      <DropdownItem options={OPTIONS} defaultValue={[]} onChange={() => {}}>
        Categories
      </DropdownItem>,
    );

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByPlaceholderText('Search')).not.toBeVisible();
  });

  it('renders with default selected values', () => {
    render(
      <DropdownItem
        options={OPTIONS}
        defaultValue={['design']}
        onChange={() => {}}
      >
        Categories
      </DropdownItem>,
    );

    fireEvent.click(screen.getByRole('button'));

    const checkbox = screen.getByLabelText('Design') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('fires onChange when checkbox is clicked (uncontrolled)', () => {
    const onChange = vi.fn();
    render(
      <DropdownItem options={OPTIONS} defaultValue={[]} onChange={onChange}>
        Categories
      </DropdownItem>,
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByLabelText('Development'));

    expect(onChange).toHaveBeenCalledWith(['development']);
  });

  it('shows no results when search yields none', () => {
    render(
      <DropdownItem options={OPTIONS} defaultValue={[]} onChange={() => {}}>
        Categories
      </DropdownItem>,
    );

    fireEvent.click(screen.getByRole('button'));

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('calls onSearch callback when typing in search', () => {
    const onSearch = vi.fn();
    render(
      <DropdownItem
        options={OPTIONS}
        defaultValue={[]}
        onChange={() => {}}
        onSearch={onSearch}
      >
        Categories
      </DropdownItem>,
    );

    fireEvent.click(screen.getByRole('button'));

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Des' } });

    expect(onSearch).toHaveBeenCalledWith('Des');
  });

  it('disables search when noSearch is true', () => {
    render(
      <DropdownItem
        options={OPTIONS}
        defaultValue={[]}
        onChange={() => {}}
        noSearch
      >
        Categories
      </DropdownItem>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument();
  });

  it('should pass axe accessibility tests', async () => {
    const screen = render(
      <DropdownItem options={OPTIONS} defaultValue={[]} onChange={() => {}}>
        Categories
      </DropdownItem>,
    );

    await screen.axe();
  });
});
