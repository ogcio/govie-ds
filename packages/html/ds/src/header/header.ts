import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type HeaderOptions = BaseComponentOptions;

const hidden = 'gi-hidden';
const block = 'gi-block';

const addClass = (
  element: HTMLInputElement | HTMLElement | Element,
  className: string,
) => {
  if (element && element.classList) {
    element.classList.add(className);
  }
};

const removeClass = (
  element: HTMLInputElement | HTMLElement | Element,
  className: string,
) => {
  if (element && element.classList) {
    element.classList.remove(className);
  }
};

export class Header extends BaseComponent<HeaderOptions> {
  getElements: () => {
    itemSlotActions: NodeListOf<Element>;
    slotContainers: NodeListOf<Element>;
    searchTrigger: HTMLInputElement;
    accordionContainers: NodeListOf<Element>;
  };
  closeAllSlotContainers: (target: HTMLInputElement) => void;
  attachEventsToAccordion: () => void;
  attachEventsToItemActionTriggers: () => void;
  handleSlotItemChange: (event: Event) => void;
  handleOnAAccordionItemClick: (element: HTMLElement) => (event: Event) => void;

  constructor(options: HeaderOptions) {
    super(options);

    this.getElements = () => {
      const itemSlotActions = document.querySelectorAll(
        "[id^='ItemActionTrigger-']",
      );

      const slotContainers = document.querySelectorAll(
        "[id^='SlotContainer-']",
      );
      const searchTrigger = document.querySelector(
        `#SearchTrigger`,
      ) as HTMLInputElement;

      const accordionContainers = document.querySelectorAll(
        "[id^='Accordion-item-']",
      );

      return {
        itemSlotActions,
        slotContainers,
        searchTrigger,
        accordionContainers,
      };
    };

    this.closeAllSlotContainers = (searchTarget: HTMLInputElement) => {
      const { itemSlotActions } = this.getElements();

      if (searchTarget.checked) {
        for (const container of itemSlotActions) {
          const item = container as HTMLInputElement;
          item.checked = false;
          item.dispatchEvent(
            new CustomEvent('click', {
              detail: {
                fromSearchTrigger: true,
              },
            }),
          );
        }
      }
    };

    this.handleSlotItemChange = (event: Event) => {
      const { slotContainers, searchTrigger } = this.getElements();
      const customEvent = event as CustomEvent;
      const fromFilteredItems = customEvent?.detail?.fromFilteredItems;
      const fromSearchTrigger = customEvent?.detail?.fromSearchTrigger;
      const target = event.target as HTMLInputElement;

      const toggleIcons = (
        currentTrigger: HTMLInputElement,
        fromFilteredItems?: boolean,
        fromSearchTrigger?: boolean,
      ) => {
        const index = currentTrigger.dataset.index || '';
        const icon = document.querySelector(
          `#ItemIconActionTrigger-${index}`,
        ) as HTMLInputElement;
        const closeIcon = document.querySelector(
          `#ItemCloseTrigger-${index}`,
        ) as HTMLInputElement;
        const { itemSlotActions } = this.getElements();
        const slot = document.querySelector(
          `#SlotContainer-${index}`,
        ) as HTMLInputElement;
        const drawer = document.querySelector(
          `#Drawer-${index}`,
        ) as HTMLInputElement;

        if (!fromFilteredItems || fromSearchTrigger) {
          for (const container of slotContainers) {
            removeClass(container, block);
            addClass(container, hidden);
          }
        }

        if (currentTrigger.dataset.open === 'false' && !fromFilteredItems) {
          if (drawer) {
            const elements = drawer.querySelectorAll('[data-element="modal"]');
            const modal = elements[0];
            modal.classList.add('gi-modal-open');
            modal.classList.remove('gi-modal-close');
            modal.setAttribute('aria-hidden', 'false');
            currentTrigger.checked = false;
          } else {
            addClass(icon, hidden);
            addClass(closeIcon, block);
            removeClass(closeIcon, hidden);

            removeClass(slot, hidden);
            addClass(slot, block);

            currentTrigger.dataset.open = 'true';
          }
        } else {
          if (slot) {
            addClass(closeIcon, hidden);
            removeClass(closeIcon, block);

            addClass(icon, block);
            removeClass(icon, hidden);

            addClass(slot, hidden);
            removeClass(slot, block);

            currentTrigger.dataset.open = 'false';
          }
          return;
        }

        const filteredItems = [...itemSlotActions].filter(
          (element) => element.id !== currentTrigger.id,
        );

        for (const element of filteredItems) {
          const elementItem = element as HTMLInputElement;
          elementItem.dataset.open = 'false';
          toggleIcons(elementItem, true);
        }
      };

      toggleIcons(target, fromFilteredItems, fromSearchTrigger);

      if (searchTrigger?.checked && target?.checked) {
        (searchTrigger as HTMLInputElement).dataset.open = 'false';
        searchTrigger.dispatchEvent(new Event('click', { bubbles: true }));
      }
    };

    this.handleOnAAccordionItemClick =
      (accordionItemContainer: HTMLElement) => (event: Event) => {
        const slotContainer = accordionItemContainer.querySelector(
          '.gi-accordion-item-slot',
        ) as HTMLElement;

        event.preventDefault();

        if (slotContainer) {
          const isOpen = slotContainer.classList.contains(block);

          if (isOpen) {
            removeClass(slotContainer, block);
            addClass(slotContainer, hidden);
          } else {
            addClass(slotContainer, block);
            removeClass(slotContainer, hidden);
          }

          accordionItemContainer.dataset.open = (!isOpen).toString();

          const toggleIcon = accordionItemContainer.querySelector(
            '.gi-accordion-item-icon',
          );
          if (toggleIcon) {
            if (isOpen) {
              removeClass(toggleIcon, 'gi-rotate-90');
            } else {
              addClass(toggleIcon, 'gi-rotate-90');
            }
          }
        }
      };

    this.attachEventsToItemActionTriggers = () => {
      const { itemSlotActions } = this.getElements();

      if (itemSlotActions.length > 0) {
        for (const container of itemSlotActions) {
          (container as HTMLInputElement).dataset.open = 'false';
          container.addEventListener('click', this.handleSlotItemChange);
        }
      }
    };

    this.attachEventsToAccordion = () => {
      const { accordionContainers } = this.getElements();

      for (const accordionItemContainer of accordionContainers) {
        const toggleLink = accordionItemContainer.querySelector(
          '.gi-header-accordion-item-toggle',
        );

        if (toggleLink) {
          toggleLink.addEventListener(
            'click',
            this.handleOnAAccordionItemClick(
              accordionItemContainer as HTMLElement,
            ),
          );
        }
      }
    };
  }

  initComponent() {
    this.attachEventsToItemActionTriggers();
    this.attachEventsToAccordion();
  }

  destroyComponent(): void {
    const { itemSlotActions } = this.getElements();

    for (const container of itemSlotActions) {
      container?.removeEventListener('click', this.handleSlotItemChange);
    }
  }
}

export const initHeader = initialiseModule({
  name: 'header',
  component: 'Header',
});
