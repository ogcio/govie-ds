import { render } from '../common/render';
import html from './pagination.html?raw';
import { PaginationProps } from './pagination.schema';

describe('goviePagination', () => {
  const renderPagination = render<PaginationProps>({
    componentName: 'pagination',
    macroName: 'goviePagination',
    html,
  });

  it('should render pagination with previous and next buttons', () => {
    const screen = renderPagination({
      currentPage: 5,
      totalPages: 10,
    });

    expect(screen.getByTestId('govie-pagination-prev-btn')).toBeInTheDocument();
    expect(screen.getByTestId('govie-pagination-next-btn')).toBeInTheDocument();
  });

  it('should disable previous button on first page', () => {
    const screen = renderPagination({
      currentPage: 1,
      totalPages: 10,
    });

    expect(
      screen
        .getByTestId('govie-pagination-prev-btn')
        .classList.contains('gi-btn-flat-dark-disabled'),
    ).toBe(true);
  });

  it('should disable next button on last page', () => {
    const screen = renderPagination({
      currentPage: 10,
      totalPages: 10,
    });

    expect(
      screen
        .getByTestId('govie-pagination-next-btn')
        .classList.contains('gi-btn-flat-dark-disabled'),
    ).toBe(true);
  });

  it('should render correct page numbers for compact view', () => {
    const screen = renderPagination({
      currentPage: 5,
      totalPages: 10,
    });

    expect(screen.getByText('Page 5')).toBeInTheDocument();
    expect(screen.getByText('of 10')).toBeInTheDocument();
  });

  it('should render page numbers in pagination buttons compact view', () => {
    const screen = renderPagination({
      currentPage: 3,
      totalPages: 10,
    });

    const iconSpans = screen.getAllByTestId('govie-icon');
    const moreHorizIcon = iconSpans.find(
      (icon) => icon.textContent === 'more_horiz',
    );

    expect(moreHorizIcon).toBeInTheDocument();
    const elements1 = screen.getAllByText('1');
    elements1.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    const elements2 = screen.getAllByText('3');
    elements2.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    const elements3 = screen.getAllByText('10');
    elements3.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('should handle edge cases for pagination buttons', () => {
    const screen = renderPagination({
      currentPage: 1,
      totalPages: 1,
    });

    expect(
      screen
        .getByTestId('govie-pagination-prev-btn')
        .classList.contains('gi-btn-flat-dark-disabled'),
    ).toBe(true);
    expect(
      screen
        .getByTestId('govie-pagination-next-btn')
        .classList.contains('gi-btn-flat-dark-disabled'),
    ).toBe(true);
  });

  it('should apply gi-hidden class to goviePagintationCompactView for screen size of 478px', () => {
    window.innerWidth = 478;
    window.dispatchEvent(new Event('resize'));

    const screen = renderPagination({
      currentPage: 5,
      totalPages: 10,
    });

    const compactView = screen.getByText(/Page 5/i).closest('div'); // Locate the compact view container
    expect(compactView).toHaveClass('xs:gi-hidden');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderPagination({
      currentPage: 5,
      totalPages: 10,
    });

    await screen.axe();
  });
});
