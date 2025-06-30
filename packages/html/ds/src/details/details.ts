import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type DetailsOptions = BaseComponentOptions;

export class Details extends BaseComponent<DetailsOptions> {
  summaryEl: HTMLElement | null;
  iconEl: HTMLElement | null;
  detailsEl: HTMLDetailsElement | null;

  constructor(options: DetailsOptions) {
    super(options);

    this.detailsEl = options.element as HTMLDetailsElement;
    this.summaryEl = options.element.querySelector<HTMLElement>('summary');
    this.iconEl =
      this.summaryEl?.querySelector<HTMLElement>(
        '.material-symbols-outlined',
      ) || null;

    console.log('test');
  }

  initComponent() {
    if (!this.summaryEl || !this.iconEl || !this.detailsEl) {
      return;
    }
    this.detailsEl.addEventListener('toggle', this.toggleHandler);
  }

  destroyComponent() {
    if (this.detailsEl) {
      this.detailsEl.removeEventListener('toggle', this.toggleHandler);
    }
  }

  private toggleHandler = () => {
    if (!this.detailsEl || !this.iconEl) {
      return;
    }

    const isOpen = this.detailsEl.open;
    this.iconEl.textContent = isOpen
      ? 'keyboard_arrow_up'
      : 'keyboard_arrow_down';
    this.detailsEl.ariaExpanded = isOpen.toString();

    const contentElement =
      this.detailsEl.querySelector<HTMLElement>('#details-content');
    if (contentElement) {
      contentElement.ariaHidden = (!isOpen).toString();
    }
  };
}

export const initDetails = initialiseModule({
  name: 'details',
  component: 'Details',
});
