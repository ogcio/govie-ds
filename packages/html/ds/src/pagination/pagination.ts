import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';
import {
  Breakpoint,
  BreakpointObserver,
} from '../util/breakpoint-observer.util';
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

    const element = document.querySelector(
      '[data-module="gieds-pagination"]',
    ) as HTMLElement;

    this.currentPage = Number(element.dataset.currentPage);
    this.totalPages = Number(element.dataset.totalPages);

    this.breakpointObserver = new BreakpointObserver();
    this.breakpoint = Breakpoint.XL;
    this.isCompactView = window.innerWidth < 524; // Initialize compact view based on width.

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.updateCompactView = this.updateCompactView.bind(this);
  }

  protected initComponent(): void {
    this.breakpointObserver.init(this.onBreakpointChange);
    window.addEventListener('resize', this.updateCompactView); // Listen to resize events.
    this.renderNumbers();
  }

  protected destroyComponent(): void {
    this.breakpointObserver.destroy();
    window.removeEventListener('resize', this.updateCompactView); // Clean up resize listener.
  }

  private updateCompactView(): void {
    const compactView = window.innerWidth < 524;
    if (compactView !== this.isCompactView) {
      this.isCompactView = compactView;

      // Update the button labels dynamically
      const prevButton = document.querySelector(
        '[data-testid="govie-pagination-prev-btn"]',
      ) as HTMLElement;
      const nextButton = document.querySelector(
        '[data-testid="govie-pagination-next-btn"]',
      ) as HTMLElement;

      if (prevButton) {
        prevButton.innerHTML = this.isCompactView
          ? `<span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">arrow_left_alt</span>`
          : `<span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">arrow_left_alt</span> Previous`;
      }

      if (nextButton) {
        nextButton.innerHTML = this.isCompactView
          ? `<span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">arrow_right_alt</span>`
          : `Next <span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">arrow_right_alt</span>`;
      }

      this.renderNumbers(); // Re-render numbers to reflect compact view changes.
    }
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
  
    // Get the current URL and its search parameters
    const currentUrl = new URL(window.location.href);
    const currentParams = new URLSearchParams(currentUrl.search);
  
    // Render dynamic page numbers
    const displayedPages = getDisplayPages(
      this.currentPage,
      this.totalPages,
      this.breakpoint,
    );
  
    const pageButtonsHTML = displayedPages
      .map((page) => {
        if (page === -1 || page === -2) {
          return `<span class="material-symbols-outlined gi-gray-700">more_horiz</span>`;
        }
  
        // Create a copy of the current query parameters and update with the new page
        const pageParams = new URLSearchParams(currentParams.toString());
        pageParams.set('currentPage', page.toString());
        pageParams.set('totalPages', this.totalPages.toString());
  
        // Create the URL with the updated query parameters
        const pageUrl = `${currentUrl.pathname}?${pageParams.toString()}`;
  
        const isActive = page === this.currentPage;
        return `
        <a
          href="${pageUrl}"
          data-element="button-container"
          data-module="gieds-button"
          data-testid="govieButton-dark-flat-large-notDisabled"
          class="gi-btn ${isActive ? 'gi-btn-primary-dark' : 'gi-btn-flat-dark'} gi-btn-large"
        >
          ${page}
        </a>
        `;
      })
      .join('');
  
    numbersContainer.innerHTML = pageButtonsHTML;
  }
  

  private onBreakpointChange(breakpoint: Breakpoint, width: number): void {
    this.breakpoint = breakpoint;
    this.renderNumbers();
  }
}

export const initPagination = initialiseModule({
  name: 'pagination',
  component: 'Pagination',
});
