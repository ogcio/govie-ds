import { BaseComponent, BaseComponentOptions } from '../common/component';
import { initialiseModule } from '../common/instances';

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

      classList.toggle('js:gi-max-height');
      classList.toggle('gi-max-h-0');
      classList.toggle('gi-opacity-0');
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
  className: 'Header',
});
