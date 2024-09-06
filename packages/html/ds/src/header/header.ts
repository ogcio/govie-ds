import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type HeaderOptions = BaseComponentOptions;

export class Header extends BaseComponent<HeaderOptions> {
  searchIcon: Element;
  searchContainer: Element;

  searchIconHandler: EventListenerOrEventListenerObject;

  constructor(options: HeaderOptions) {
    super(options);

    this.searchIcon = this.query.getByElement({ name: 'search' });

    this.searchContainer = this.query.getByElement({
      name: 'container',
    });

    this.searchIconHandler = (event: Event) => {
      event.stopPropagation();

      const classList = this.searchContainer.classList;

      classList.toggle('gi-h-40');
      classList.toggle('gi-h-0');

      if (classList.contains('gi-h-40')) {
        this.searchContainer.querySelector('input')?.focus();
      }
    };
  }

  initComponent() {
    this.searchIcon.addEventListener('click', this.searchIconHandler);
  }

  destroyComponent(): void {
    this.searchIcon.removeEventListener('click', this.searchIconHandler);
  }
}

export const initHeader = initialiseModule({
  name: 'header',
  component: 'Header',
});
