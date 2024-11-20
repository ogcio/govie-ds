import { BaseComponent, BaseComponentOptions, initialiseModule } from '../common/component';
import { Breakpoint, BreakpointObserver } from '../util/breakpoint-observer.util';
import { getDisplayPages } from './pagination.util';

type PaginationOptions = BaseComponentOptions;

export class Pagination extends BaseComponent<PaginationOptions> {
  private currentPage: number;
  private totalPages: number;
  private breakpointObserver: BreakpointObserver;
  private breakpoint: Breakpoint;
  private isCompactView: boolean;

  constructor(options: PaginationOptions) {
    super(options);

    const element = document.querySelector('[data-module="gieds-pagination"]') as HTMLElement;

    this.currentPage = Number(element.dataset.currentPage);
    this.totalPages = Number(element.dataset.totalPages);

    this.breakpointObserver = new BreakpointObserver();
    this.breakpoint = Breakpoint.XL;
    this.isCompactView = window.innerWidth < 524; // Initialize compact view based on width.

    this.onPageChange = this.onPageChange.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.updateCompactView = this.updateCompactView.bind(this);
  }

  protected initComponent(): void {
    this.breakpointObserver.init(this.onBreakpointChange);
    window.addEventListener('resize', this.updateCompactView); // Listen to resize events.
    this.renderNumbers();
    this.attachEventListeners();
  }

  protected destroyComponent(): void {
    this.breakpointObserver.destroy();
    window.removeEventListener('resize', this.updateCompactView); // Clean up resize listener.
    this.removeEventListeners();
  }

  private updateCompactView(): void {
    const compactView = window.innerWidth < 524;
    if (compactView !== this.isCompactView) {
      this.isCompactView = compactView;
  
      // Update the button labels dynamically
      const prevButton = document.querySelector('[data-testid="govie-pagination-prev-btn"]') as HTMLElement;
      const nextButton = document.querySelector('[data-testid="govie-pagination-next-btn"]') as HTMLElement;
  
      if (prevButton) {
        if (this.isCompactView) {
          prevButton.innerHTML = `
            <span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">
              arrow_left_alt
            </span>
          `;
        } else {
          prevButton.innerHTML = `
            <span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">
              arrow_left_alt
            </span> Previous
          `;
        }
      }
  
      if (nextButton) {
        if (this.isCompactView) {
          nextButton.innerHTML = `
            <span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">
              arrow_right_alt
            </span>
          `;
        } else {
          nextButton.innerHTML = `
            Next 
            <span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">
              arrow_right_alt
            </span>
          `;
        }
      }
  
      this.renderNumbers(); // Re-render numbers to reflect compact view changes.
    }
  }
  

  private attachEventListeners(): void {
    const prevButton = document.querySelector('[data-testid="govie-pagination-prev-btn"]');
    const nextButton = document.querySelector('[data-testid="govie-pagination-next-btn"]');

    if (prevButton) {
      prevButton.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        this.onPageChange(this.currentPage - 1);
      });
    }
    if (nextButton) {
      nextButton.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        this.onPageChange(this.currentPage + 1);
      });
    }

    const pageButtons = document.querySelectorAll('[data-page]');
    pageButtons.forEach((button) => {
      button.addEventListener('click', this.handlePageClick);
    });
  }

  private removeEventListeners(): void {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.removeEventListener('click', this.handlePageClick);
    });
  }

  private handlePageClick(event: Event): void {
    const page = Number((event.target as HTMLElement).dataset.page);
    if (!isNaN(page)) {
      this.onPageChange(page);
    }
  }

  private onPageChange(page: number): void {
    // Prevent going beyond the valid range
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;

    if (page !== this.currentPage) {
      this.currentPage = page;
      this.renderNumbers();
    }
  }

  private onBreakpointChange(breakpoint: Breakpoint, width: number): void {
    this.breakpoint = breakpoint;
    this.renderNumbers();
  }

  private renderNumbers(): void {
    const numbersContainer = document.querySelector('.gi-pagination-numbers');
    if (!numbersContainer) return;

    // Compact view logic
    if (this.isCompactView) {
      numbersContainer.innerHTML = `
        <span class="gi-text-md">
          <span class="gi-font-bold">Page ${this.currentPage}</span> of ${this.totalPages}
        </span>
      `;
      return; // Skip rendering buttons in compact view.
    }

    // Render dynamic page numbers
    const displayedPages = getDisplayPages(this.currentPage, this.totalPages, this.breakpoint);

    const pageButtonsHTML = displayedPages
      .map((page) => {
        if (page === -1 || page === -2) {
          return `<span class="material-symbols-outlined gi-gray-700">more_horiz</span>`;
        }
        return `
        <button
          data-element="button-container"
          data-module="gieds-button"
          data-testid="govieButton-dark-flat-large-notDisabled"
          data-page="${page}"
          class="gi-btn ${page === this.currentPage ? 'gi-btn-primary-dark' : 'gi-btn-flat-dark'}  gi-btn-large "
        >
          ${page}
        </button>
        `;
      })
      .join('');

    numbersContainer.innerHTML = pageButtonsHTML;

    // Reattach event listeners to updated elements
    this.attachEventListeners();
  }
}

export const initPagination = initialiseModule({
  name: 'pagination',
  component: 'Pagination',
});
