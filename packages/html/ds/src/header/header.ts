import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type HeaderOptions = BaseComponentOptions;

export class Header extends BaseComponent<HeaderOptions> {
  searchIcon: Element;
  menuIcon: Element;
  searchContainer: Element;
  menuContainer: Element;

  searchIconHandler: EventListenerOrEventListenerObject;
  menuIconHandler: EventListenerOrEventListenerObject;

  constructor(options: HeaderOptions) {
    super(options);

    this.searchIcon = this.query.getByElement({ name: 'search' });

    this.menuIcon = this.query.getByElement({ name: 'menu-icon' });

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

    this.menuContainer = this.query.getByElement({
      name: 'menu-container',
    });

    this.menuIconHandler = (event: Event) => {
      event.stopPropagation();

      const classList = this.menuContainer.classList;

      classList.toggle('gi-translate-x-full');
      classList.toggle('gi-opacity-0');
    };
  }

  initComponent() {
    this.searchIcon.addEventListener('click', this.searchIconHandler);
    this.menuIcon.addEventListener('click', this.menuIconHandler);
  }

  destroyComponent(): void {
    this.searchIcon.removeEventListener('click', this.searchIconHandler);
    this.menuIcon.addEventListener('click', this.menuIconHandler);
  }
}

export const initHeader = initialiseModule({
  name: 'header',
  component: 'Header',
});
