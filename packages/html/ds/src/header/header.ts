import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type HeaderOptions = BaseComponentOptions;

export class Header extends BaseComponent<HeaderOptions> {
  searchIconDesktop: Element;
  searchIconMobile: Element;
  menuIcon: Element;
  closeMenuIcon: Element;
  searchContainer: Element;
  searchContainerSmall: Element;
  menuContainer: Element;
  overlayDisabledContainer: Element;

  searchIconHandler: EventListenerOrEventListenerObject;
  menuIconHandler: EventListenerOrEventListenerObject;
  closeMenuHandler: EventListenerOrEventListenerObject;
  searchIconHandlerMobile:EventListenerOrEventListenerObject;

  constructor(options: HeaderOptions) {
    super(options);

    this.searchIconDesktop = this.query.getByElement({ name: 'search-desktop' });

    this.searchIconMobile = this.query.getByElement({ name: 'search-mobile' });
    
    this.menuIcon = this.query.getByElement({ name: 'menu-icon' });

    this.closeMenuIcon = this.query.getByElement({ name: 'close-menu-icon' });

    this.searchContainerSmall = this.query.getByElement({
      name: 'search-container-small',
    });

    this.searchContainer = this.query.getByElement({
      name: 'search-container',
    });

    this.overlayDisabledContainer = this.query.getByElement({name: 'overlay-disabled'})

    this.searchIconHandler = (event: Event) => {
      event.stopPropagation();

      const classList = this.searchContainer.classList;

      classList.toggle('xs:gi-h-40');
      classList.toggle('xs:gi-h-0');

      if (classList.contains('xs:gi-h-40')) {
        this.searchContainer.querySelector('input')?.focus();
      }
    };

    this.searchIconHandlerMobile = (event: Event) => {
      event.stopPropagation();

      const classList = this.searchContainerSmall.classList;

      classList.toggle('xs:gi-h-40');
      classList.toggle('xs:gi-h-0');

      if (classList.contains('xs:gi-h-40')) {
        this.searchContainerSmall.querySelector('input')?.focus();
      }
    };

    this.menuContainer = this.query.getByElement({
      name: 'menu-container',
    });

    this.menuIconHandler = (event: Event) => {
      event.stopPropagation();

      const classList = this.menuContainer.classList;
      const bodyElement = document.querySelector('body');
      const overlayContainerClassList = this.overlayDisabledContainer.classList;

      classList.remove('gi-translate-x-full');
      bodyElement?.classList.add('gi-overflow-hidden');
      overlayContainerClassList.remove('gi-hidden');
      overlayContainerClassList.add('gi-fixed');
    };

    this.closeMenuHandler = (event: Event) => {
      event.stopPropagation();

      const classList = this.menuContainer.classList;
      const overlayContainerClassList = this.overlayDisabledContainer.classList;
      const bodyElement = document.querySelector('body');

      classList.add('gi-translate-x-full');
      bodyElement?.classList.remove('gi-overflow-hidden');
      overlayContainerClassList.add('gi-hidden');
      overlayContainerClassList.remove('gi-fixed');
    };
  }

  initComponent() {
    this.searchIconDesktop.addEventListener('click', this.searchIconHandler);
    this.searchIconMobile.addEventListener('click', this.searchIconHandlerMobile);
    this.menuIcon.addEventListener('click', this.menuIconHandler);
    this.closeMenuIcon.addEventListener('click', this.closeMenuHandler);
  }

  destroyComponent(): void {
    this.searchIconDesktop.removeEventListener('click', this.searchIconHandler);
    this.searchIconMobile.removeEventListener('click', this.searchIconHandlerMobile);
    this.menuIcon.removeEventListener('click', this.menuIconHandler);
    this.closeMenuIcon.removeEventListener('click', this.closeMenuHandler);
  }
}

export const initHeader = initialiseModule({
  name: 'header',
  component: 'Header',
});
