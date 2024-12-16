import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type HeaderOptions = BaseComponentOptions;

const hidden = 'gi-hidden';
const block = 'gi-block';

export class Header extends BaseComponent<HeaderOptions> {
  getElements: any
  closeAllSlotContainers: any
  handleSearchChange: any
  attachEventsToSearchTrigger: any
  attachEventsToItemActionTriggers: any
  addNewGovieHeaderSlotElement: any
  handleSlotItemChange: any

  constructor(options: HeaderOptions) {
    super(options);

    /* Slots */
    this.getElements = () =>  {
      const itemSlotActions = document.querySelectorAll(
        "[id^='ItemActionTrigger-']",
      );
      const slotContainers = document.querySelectorAll("[id^='SlotContainer-']");
      const searchTrigger = document.querySelector(
        `#SearchTrigger`,
      ) as HTMLInputElement;
    
      return {
        itemSlotActions,
        slotContainers,
        searchTrigger,
      };
    };

    this.closeAllSlotContainers = (searchTarget: HTMLInputElement) => {
      const { itemSlotActions } = this.getElements();
    
      if (searchTarget.checked) {
        for (const container of itemSlotActions) {
          const item = container as HTMLInputElement;
          item.checked = false;
          item.dispatchEvent(
            new CustomEvent('change', {
              detail: {
                fromSearchTrigger: true,
              },
            }),
          );
        }
      }
    };

    this.handleSearchChange = (event: Event) => {
      this.closeAllSlotContainers(event.target as HTMLInputElement);
    };

    this.handleSlotItemChange = (event: Event) => {
      const { slotContainers, searchTrigger } = this.getElements();
      const customEvent = event as CustomEvent;
      const fromFilteredItems = customEvent?.detail?.fromFilteredItems;
      const fromSearchTrigger = customEvent?.detail?.fromSearchTrigger;
      const target = event.target as HTMLInputElement;

      const toggleIcons = (
        currentTrigger: HTMLInputElement,
        fromFilteredItems: boolean,
        fromSearchTrigger: boolean,
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

        const addClass = (element: any, className: string) => {
          if (element && element.classList) {
            element.classList.add(className);
          }
        };

        const removeClass = (element: any, className: string) => {
          if (element && element.classList) {
            element.classList.remove(className);
          }
        };
  
        if (!fromFilteredItems || fromSearchTrigger) {
          for (const container of slotContainers) {
            removeClass(container, block);
            addClass(container, hidden);
          }
        }
  
        if (currentTrigger.checked && !fromFilteredItems) {
          addClass(icon, hidden);
          console.log(icon, hidden, `#ItemIconActionTrigger-${index}`)
          addClass(closeIcon, block);
          removeClass(closeIcon, hidden);
    
          removeClass(slot, hidden);
          addClass(slot, block);
        } else {
          addClass(closeIcon, hidden);
          removeClass(closeIcon, block);
          addClass(icon, block);
          removeClass(icon, hidden);
          return;
        }
  
        const filteredItems = [...itemSlotActions].filter(
          (element) =>
            (element as HTMLInputElement).checked &&
            element.id !== currentTrigger.id,
        );
  
        for (const element of filteredItems) {
          (element as HTMLInputElement).checked = false;
          element.dispatchEvent(
            new CustomEvent('change', {
              detail: {
                fromFilteredItems: true,
              },
            }),
          );
        }
      };

      toggleIcons(target, fromFilteredItems, fromSearchTrigger);

      if (searchTrigger?.checked && target?.checked) {
        searchTrigger.checked = false;
        searchTrigger.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    this.attachEventsToSearchTrigger = () => {
      const searchTrigger = document.querySelector(`#SearchTrigger`);
    
      if (searchTrigger) {
        searchTrigger.addEventListener('change', this.handleSearchChange);
      }
    };

    this.attachEventsToItemActionTriggers = () => {
      const { itemSlotActions } = this.getElements();

      if (itemSlotActions.length > 0) {
        for (const container of itemSlotActions) {
          container.addEventListener('change', this.handleSlotItemChange);
        }
      }
    };

    this.addNewGovieHeaderSlotElement = (
      index: number,
      slotHtml : any,
    ) => {
      const parent = document.querySelector('#GovieHeader');

      if (parent) {
        const childNode = document.createElement('div');
        childNode.id = `SlotContainer-${index}`;
        childNode.dataset.index = index.toString();
        childNode.className =
          'gi-hidden gi-bg-gray-50 gi-px-8 gi-pt-8 gi-pb-14 gi-border-b-2xl gi-border-b-emerald-800';

        parent.appendChild(childNode);

        if (typeof slotHtml === 'string') {
          childNode.innerHTML = slotHtml;
        }

        /*return () => {
          queueMicrotask(() => {
            if (childNode.parentNode) {
              childNode.parentNode.removeChild(childNode);
            }
          });
        };*/
      }

      return null;
    };


    /* Slots */
  }

  initComponent() {
    this.attachEventsToItemActionTriggers()

    const {searchTrigger} = this.getElements()

    if(searchTrigger){
      this.attachEventsToSearchTrigger()
    }
  }

  destroyComponent(): void {
    const { itemSlotActions, searchTrigger } = this.getElements();
    if (searchTrigger) {
      searchTrigger.removeEventListener('change', this.handleSearchChange);
    }

    for (const container of itemSlotActions) {
      container?.removeEventListener('change', this.handleSlotItemChange);
    }
  }  
}

export const initHeader = initialiseModule({
  name: 'header',
  component: 'Header',
});
