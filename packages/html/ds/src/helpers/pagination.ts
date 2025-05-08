import { PaginationProps } from '../pagination/pagination.schema';
import { createButton } from './buttons';
import { createIcon } from './icons';

export const createPagination = (arguments_: PaginationProps) => {
  const { currentPage, totalPages } = arguments_;

  const pagination = document.createElement('div');
  pagination.className = 'gi-pagination';
  pagination.dataset.currentPage = currentPage.toString();
  pagination.dataset.totalPages = totalPages.toString();
  pagination.dataset.testid = 'govie-pagination';
  pagination.dataset.module = 'gieds-pagination';

  const previousButton = createButton({
    variant: 'flat',
    size: 'large',
    disabled: currentPage === 1,
    className: 'gi-pagination-prev-btn',
    appearance: 'dark',
  });
  previousButton.dataset.testid = 'govie-pagination-prev-btn';
  const iconPrevious = createIcon({ icon: 'arrow_left_alt' });
  previousButton.append(iconPrevious);

  const labelPrevious = document.createElement('span');
  labelPrevious.className = 'sm:gi-block gi-hidden';
  labelPrevious.textContent = 'Previous';
  previousButton.append(labelPrevious);
  pagination.append(previousButton);

  // Compact view
  const compactView = document.createElement('div');
  compactView.className = 'xs:gi-hidden gi-block gi-text-md';
  const compactViewText = document.createElement('span');
  compactViewText.className = 'gi-font-bold';
  compactViewText.textContent = `Page ${currentPage} of ${totalPages}`;
  compactView.append(compactViewText);
  pagination.append(compactView);

  // Compact view with buttons
  const compactViewWithButtons = document.createElement('div');
  compactViewWithButtons.className =
    'sm:gi-flex xs:gi-flex gi-items-center gi-justify-between gi-gap-2 md:gi-hidden gi-hidden';
  let display_pages = [1];
  if (currentPage > 2) {
    display_pages.push(-1);
  }
  if (currentPage > 1 && currentPage < totalPages) {
    display_pages.push(currentPage);
  }
  if (currentPage < totalPages - 1) {
    display_pages.push(-2);
  }
  if (totalPages <= 3) {
    display_pages = [];
    for (let index = 1; index <= totalPages + 1; index++) {
      display_pages.push(index);
    }
  }

  for (const page of display_pages) {
    const compactViewWithButtonsText = document.createElement('span');
    compactViewWithButtons.append(compactViewWithButtonsText);

    if (page == -1 || page == -2) {
      const ellipsis = createIcon({ icon: 'more_horiz' });
      ellipsis.dataset.testid = 'govie-icon';
      compactViewWithButtons.append(ellipsis);
    } else {
      const pageButton = createButton({
        variant: page === currentPage ? 'primary' : 'flat',
        size: 'large',
        appearance: 'dark',
      });
      pageButton.dataset.page = page.toString();
      pageButton.textContent = page.toString();
      compactViewWithButtons.append(pageButton);
    }
  }
  pagination.append(compactViewWithButtons);

  // Standard view with buttons
  const standardViewWithButtons = document.createElement('div');
  standardViewWithButtons.className =
    'md:gi-flex gi-items-center gi-justify-between gi-gap-2 gi-hidden';
  display_pages = [];
  if (currentPage > 3) {
    display_pages.push(1);
  }
  if (currentPage > 4) {
    display_pages.push(-1);
  }
  for (let index = currentPage - 2; index <= currentPage + 3; index++) {
    if (index < 1 || index > totalPages) {
      continue;
    }
    display_pages.push(index);
  }
  if (currentPage < totalPages - 3) {
    display_pages.push(-2);
  }
  if (currentPage < totalPages - 2) {
    display_pages.push(totalPages);
  }

  for (const page of display_pages) {
    const standardViewWithButtonsText = document.createElement('span');
    standardViewWithButtons.append(standardViewWithButtonsText);

    if (page == -1 || page == -2) {
      const ellipsis = createIcon({ icon: 'more_horiz' });
      ellipsis.dataset.testid = 'govie-icon';
      standardViewWithButtons.append(ellipsis);
    } else {
      const pageButton = createButton({
        variant: page === currentPage ? 'primary' : 'flat',
        size: 'large',
        appearance: 'dark',
      });
      pageButton.dataset.page = page.toString();
      pageButton.textContent = page.toString();
      standardViewWithButtons.append(pageButton);
    }
  }
  pagination.append(standardViewWithButtons);

  const nextButton = createButton({
    variant: 'flat',
    size: 'large',
    disabled: currentPage === totalPages,
    className: 'gi-pagination-next-btn',
    appearance: 'dark',
  });
  nextButton.dataset.testid = 'govie-pagination-next-btn';

  const labelNext = document.createElement('span');
  labelNext.className = 'sm:gi-block gi-hidden';
  labelNext.textContent = 'Next';
  nextButton.append(labelNext);
  const iconNext = createIcon({ icon: 'arrow_right_alt' });
  nextButton.append(iconNext);

  pagination.append(nextButton);

  return pagination;
};
