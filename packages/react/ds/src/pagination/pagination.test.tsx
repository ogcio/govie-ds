import { render, fireEvent, cleanup } from '../test-utils.js';
import { Pagination, PaginationProps } from './pagination.js';
<<<<<<< HEAD
=======

vi.mock('../hooks/use-breakpoint.js');

const mockUseBreakpoint = vi.mocked(useBreakpoint);

>>>>>>> 13749f3 (feat: update test and add minor comment to component css)
const standardProps = {
  currentPage: 5,
  totalPages: 10,
  onPageChange: vi.fn(),
};

describe('Pagination', () => {
  afterEach(cleanup);

  const renderPagination = (props: PaginationProps) =>
    render(<Pagination {...props} />);

  it('should render the previous and next buttons', () => {
    const screen = renderPagination(standardProps);
    const previousButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('should disable previous button on first page', () => {
    const props = { ...standardProps, currentPage: 1 };
    const screen = renderPagination(props);
    const previousButton = screen.getByText('Previous').closest('button');

    expect(previousButton).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    const props = { ...standardProps, currentPage: 10 };
    const screen = renderPagination(props);
    const nextButton = screen.getByText('Next').closest('button');

    expect(nextButton).toBeDisabled();
  });

  it('should render ellipses correctly for page ranges', () => {
    const screen = renderPagination(standardProps);
    const ellipsisIcons = screen.getAllByText('more_horiz');
    expect(ellipsisIcons.length).toBeGreaterThan(0);
  });

  it('should render the pagination label with current page and total pages', () => {
    const screen = renderPagination(standardProps);
    const label = screen.getByText(
      `Page ${standardProps.currentPage} of ${standardProps.totalPages}`,
    );
    expect(label).toBeInTheDocument();
  });

  it('should call onPageChange when a page number button is clicked', () => {
    const screen = renderPagination(standardProps);
    const pageButton = screen.getByText('3');

    fireEvent.click(pageButton);
    expect(standardProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it('should call onPageChange when the next button is clicked', () => {
    const screen = renderPagination(standardProps);
    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton);
    expect(standardProps.onPageChange).toHaveBeenCalledWith(6);
  });

  it('should call onPageChange when the previous button is clicked', () => {
    const screen = renderPagination(standardProps);
    const previousButton = screen.getByText('Previous');

    fireEvent.click(previousButton);
    expect(standardProps.onPageChange).toHaveBeenCalledWith(4);
  });

  it('should hide pagination buttons on small screens', () => {
    window.innerWidth = 480;
    window.dispatchEvent(new Event('resize'));

    const screen = renderPagination(standardProps);
    const paginationBtns = screen.container.querySelector(
      '.gi-pagination-layout-btn',
    );

    expect(paginationBtns).toBeInTheDocument();

    if (paginationBtns) {
      expect(getComputedStyle(paginationBtns).display).toBe('none');
    }
  });

  it('should pass axe accessibility checks', async () => {
    const screen = renderPagination(standardProps);
    await screen.axe();
  });
});
