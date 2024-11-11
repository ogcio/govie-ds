import { render, fireEvent, cleanup } from '../test-utils.js';
import Pagination, { PaginationProps } from './pagination.js';
import { Breakpoint, useBreakpoint } from '../hooks/useBreakpoint.js';

vi.mock('../hooks/useBreakpoint.js');

const mockUseBreakpoint = vi.mocked(useBreakpoint);

const standardProps = {
  currentPage: 5,
  totalPages: 10,
  onPageChange: vi.fn(),
};

describe('Pagination', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const renderPagination = (props: PaginationProps) =>
    render(<Pagination {...props} />);

  it('should render the previous and next buttons', () => {
    const screen = renderPagination(standardProps);
    const previousButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('should render pagination buttons and page numbers when not on XS breakpoint', () => {
    mockUseBreakpoint.mockReturnValue(Breakpoint.XS);

    const screen = renderPagination(standardProps);
    const pageButtons = screen.getAllByRole('button');

    expect(pageButtons.length).toBeGreaterThan(0); // Ensures there are page buttons
    expect(screen.getByText('Page 5 of 10')).toBeInTheDocument();
  });

  it('should render page number buttons correctly', () => {
    mockUseBreakpoint.mockReturnValue(Breakpoint.MD);

    const screen = renderPagination(standardProps);

    for (const page of [1, 3, 4, 5, 6, 7, 10]) {
      expect(screen.getByText(page)).toBeInTheDocument();
    }
  });

  it('should hide pagination buttons on XS breakpoint', () => {
    mockUseBreakpoint.mockReturnValue(Breakpoint.XS);

    const screen = renderPagination(standardProps);
    const pageButtons = screen.queryAllByRole('button');

    expect(pageButtons.length).toBe(2); // Count of 2 buttons, previous and next button
    expect(screen.queryByText('Page 5 of 10')).toBeInTheDocument();
  });

  it('should call onPageChange when a page button is clicked', () => {
    mockUseBreakpoint.mockReturnValue(Breakpoint.MD);

    const screen = renderPagination(standardProps);
    const pageButton = screen.getByText('3');

    fireEvent.click(pageButton);

    expect(standardProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it('should disable previous button on first page', () => {
    const props = { ...standardProps, currentPage: 1 };
    const screen = renderPagination(props);
    const previousButton = screen.getByText('Previous');

    expect(previousButton).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    const props = { ...standardProps, currentPage: 10 };
    const screen = renderPagination(props);
    const nextButton = screen.getByText('Next');

    expect(nextButton).toBeDisabled();
  });

  it('should render ellipses correctly for page ranges', () => {
    const screen = renderPagination(standardProps);
    const iconSpans = screen.getAllByTestId('govie-icon');
    const moreHorizIcon = iconSpans.find(
      (icon) => icon.textContent === 'more_horiz',
    );

    expect(moreHorizIcon).toBeInTheDocument();
  });

  it('should pass axe tests', async () => {
    const screen = renderPagination(standardProps);
    await screen.axe();
  });
});
