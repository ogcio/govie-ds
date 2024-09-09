import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type HeaderOptions = BaseComponentOptions;

export class Header extends BaseComponent<HeaderOptions> {
  searchIcon: Element;
  menuIcon: Element;
  closeMenuIcon: Element;
  searchContainer: Element;
  menuContainer: Element;

  searchIconHandler: EventListenerOrEventListenerObject;
  menuIconHandler: EventListenerOrEventListenerObject;
  closeMenuHandler: EventListenerOrEventListenerObject;

  constructor(options: HeaderOptions) {
    super(options);

    this.searchIcon = this.query.getByElement({ name: 'search' });

    this.menuIcon = this.query.getByElement({ name: 'menu-icon' });

    this.closeMenuIcon = this.query.getByElement({ name: 'close-menu-icon' });

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

      classList.remove('gi-translate-x-full');
    };

    this.closeMenuHandler = (event: Event) => {
      event.stopPropagation();

      const classList = this.menuContainer.classList;
      classList.add('gi-translate-x-full');
    };
  }

  initComponent() {
    this.searchIcon.addEventListener('click', this.searchIconHandler);
    this.menuIcon.addEventListener('click', this.menuIconHandler);
    this.closeMenuIcon.addEventListener('click', this.closeMenuHandler);
  }

  destroyComponent(): void {
    this.searchIcon.removeEventListener('click', this.searchIconHandler);
    this.menuIcon.addEventListener('click', this.menuIconHandler);
    this.closeMenuIcon.addEventListener('click', this.closeMenuHandler);
  }
}

export const initHeader = initialiseModule({
  name: 'header',
  component: 'Header',
});
