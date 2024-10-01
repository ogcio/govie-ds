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
  closeMenuIcon: HTMLButtonElement;
  searchContainer: Element;
  searchContainerSmall: Element;
  menuContainer: Element;
  overlayDisabledContainer: Element;

  searchIconHandler: EventListenerOrEventListenerObject;
  menuIconHandler: EventListenerOrEventListenerObject;
  closeMenuHandler: EventListenerOrEventListenerObject;
  searchIconHandlerMobile: EventListenerOrEventListenerObject;
  isLinkActive: () => void;

  constructor(options: HeaderOptions) {
    super(options);

    this.searchIconDesktop = this.query.getByElement({
      name: 'search-desktop',
    });

    this.searchIconMobile = this.query.getByElement({ name: 'search-mobile' });

    this.menuIcon = this.query.getByElement({ name: 'menu-icon' });

    this.closeMenuIcon = document.querySelector(
      '[data-element="close-menu-icon"]',
    )!;

    this.searchContainerSmall = this.query.getByElement({
      name: 'search-container-small',
    });

    this.searchContainer = this.query.getByElement({
      name: 'search-container',
    });

    this.overlayDisabledContainer = this.query.getByElement({
      name: 'overlay-disabled',
    });

    this.searchIconHandler = (event: Event) => {
      event.stopPropagation();

      const classList = this.searchContainer.classList;

      const classListSearchIcon = this.query.getByElement({
        name: 'search-icon',
      }).classList;
      const classListCloseIcon = this.query.getByElement({
        name: 'search-close-icon',
      }).classList;

      classList.toggle('xs:gi-h-40');
      classList.toggle('xs:gi-h-0');

      if (classList.contains('xs:gi-h-40')) {
        this.searchContainer.querySelector('input')?.focus();
        classListSearchIcon.add('gi-hidden');
        classListCloseIcon.remove('gi-hidden');
      } else {
        classListSearchIcon.remove('gi-hidden');
        classListCloseIcon.add('gi-hidden');
      }
    };

    this.searchIconHandlerMobile = (event: Event) => {
      event.stopPropagation();

      const classList = this.searchContainerSmall.classList;
      const classListSearchIcon = this.query.getByElement({
        name: 'search-mobile-search-icon',
      }).classList;
      const classListCloseIcon = this.query.getByElement({
        name: 'search-mobile-close-icon',
      }).classList;

      classList.toggle('xs:gi-h-40');
      classList.toggle('xs:gi-h-0');

      if (classList.contains('xs:gi-h-40')) {
        this.searchContainerSmall.querySelector('input')?.focus();
        classListSearchIcon.add('gi-hidden');
        classListCloseIcon.remove('gi-hidden');
      } else {
        classListSearchIcon.remove('gi-hidden');
        classListCloseIcon.add('gi-hidden');
      }
    };

    this.menuContainer = this.query.getByElement({
      name: 'menu-container',
    });

    this.menuIconHandler = (event: Event) => {
      event.stopPropagation();
      this.closeMenuIcon.focus();

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

    this.isLinkActive = () => {
      if (window) {
        const URL = window.location.href;
        const linksDesktop = document.querySelectorAll<HTMLAnchorElement>(
          `#links-container-desktop a`,
        );
        for (const link of linksDesktop) {
          if (link.href === URL) {
            link.classList.add('gi-underline', 'gi-underline-offset-sm');
          }
        }

        const linksMobile = document.querySelectorAll<HTMLAnchorElement>(
          `#links-container-mobile a`,
        );
        for (const link of linksMobile) {
          if (link.href === URL) {
            link.classList.add('gi-underline', 'gi-underline-offset-sm');
          }
        }
      }
    };
  }

  initComponent() {
    const isSearchEnabled = this.searchIconDesktop && this.searchIconMobile;
    if (isSearchEnabled) {
      this.searchIconDesktop.addEventListener('click', this.searchIconHandler);
      this.searchIconMobile.addEventListener(
        'click',
        this.searchIconHandlerMobile,
      );
    }
    this.menuIcon.addEventListener('click', this.menuIconHandler);
    this.closeMenuIcon.addEventListener('click', this.closeMenuHandler);
    this.overlayDisabledContainer.addEventListener(
      'click',
      this.closeMenuHandler,
    );
    this.isLinkActive();
  }

  destroyComponent(): void {
    const isSearchEnabled = this.searchIconDesktop && this.searchIconMobile;
    if (isSearchEnabled) {
      this.searchIconDesktop.removeEventListener(
        'click',
        this.searchIconHandler,
      );
      this.searchIconMobile.removeEventListener(
        'click',
        this.searchIconHandlerMobile,
      );
    }
    this.menuIcon.removeEventListener('click', this.menuIconHandler);
    this.closeMenuIcon.removeEventListener('click', this.closeMenuHandler);
    this.overlayDisabledContainer.removeEventListener(
      'click',
      this.closeMenuHandler,
    );
    this.isLinkActive();
  }
}

export const initHeader = initialiseModule({
  name: 'header',
  component: 'Header',
});
