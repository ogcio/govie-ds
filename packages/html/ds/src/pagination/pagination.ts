import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';
import {
  Breakpoint,
  BreakpointObserver,
} from '../util/breakpoint-observer.util';

type PaginationOptions = BaseComponentOptions;

export class Pagination extends BaseComponent<PaginationOptions> {
  private currentPage: number;
  private totalPages: number;
  private breakpointObserver: BreakpointObserver;
  private isCompactView: boolean;

  constructor(options: PaginationOptions) {
    super(options);

    const element = document.querySelector(
      '[data-module="gieds-pagination"]',
    ) as HTMLElement;

    this.currentPage = Number(element.dataset.currentPage);
    this.totalPages = Number(element.dataset.totalPages);

    this.breakpointObserver = new BreakpointObserver();
    this.isCompactView = window.innerWidth < 524; // Initialize compact view based on width.

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.updateCompactView = this.updateCompactView.bind(this);
  }

  protected initComponent(): void {
    this.breakpointObserver.init(this.onBreakpointChange);
    window.addEventListener('resize', this.updateCompactView); // Listen to resize events.
    this.renderCompactView();
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

      this.renderCompactView(); // Re-render numbers to reflect compact view changes.
    }
  }

  private renderCompactView(): void {
    const numbersContainer = document.querySelector('.gi-pagination-numbers');

    if (!numbersContainer) {
      return
    };
  
    numbersContainer.innerHTML = `
        <span class="gi-text-md">
          <span class="gi-font-bold">Page ${this.currentPage}</span> of ${this.totalPages}
        </span>
      `;
  }
  

  private onBreakpointChange(breakpoint: Breakpoint, width: number): void {
    this.renderCompactView();
  }
}

export const initPagination = initialiseModule({
  name: 'pagination',
  component: 'Pagination',
});
