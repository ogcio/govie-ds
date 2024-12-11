import {
  BaseComponent,
  type BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type AccordionOptions = BaseComponentOptions;

type AccordionItemsType = {
  elements: {
    mainContainer: Element;
    triggerContainer: Element | null;
    contentContainer: Element | null;
    iconContainer: Element;
  };
  expanded: boolean;
  disabled: boolean;
};

export class Accordion extends BaseComponent<AccordionOptions> {
  mainContainer: Element;
  accordionItems: HTMLElement[];
  accordionItemsState: AccordionItemsType[];

  constructor(options: AccordionOptions) {
    super(options);
    this.mainContainer = options.element;
    this.accordionItems = [
      ...this.mainContainer.querySelectorAll(':scope > div'),
    ] as HTMLElement[];

    this.accordionItemsState = this.accordionItems.map((item) => {
      return {
        elements: {
          mainContainer: item,
          triggerContainer: item.querySelector(':scope > div:first-child'),
          contentContainer: item.querySelector(':scope > div:last-child'),
          iconContainer: item.querySelector(':scope > div:first-child span')!,
        },
        expanded: Boolean(item.dataset.defaultExpanded),
        disabled: Boolean(item.dataset.disabled),
      };
    });
  }

  initComponent() {
    for (const item of this.accordionItemsState) {
      const { triggerContainer, contentContainer, iconContainer } =
        item.elements;
      if (!item.disabled) {
        triggerContainer?.addEventListener('click', () => {
          item.expanded = !item.expanded;

          if (item.expanded) {
            iconContainer.textContent = 'keyboard_arrow_up';
            contentContainer?.classList.remove('gi-hidden');
            contentContainer?.classList.add('gi-block');
          } else {
            iconContainer.textContent = 'keyboard_arrow_down';
            contentContainer?.classList.add('gi-hidden');
            contentContainer?.classList.remove('gi-block');
          }
        });
      }
    }
  }
  destroyComponent() {}
}

export const initAccordion = initialiseModule({
  name: 'accordion',
  component: 'Accordion',
});
