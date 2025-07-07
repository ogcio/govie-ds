import { createPopper } from '@popperjs/core';
import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type PopoverOptions = BaseComponentOptions;

export class Popover extends BaseComponent<PopoverOptions> {
  container: HTMLElement;
  triggerElement: HTMLElement;
  popoverElement: HTMLElement & { __popperInstance: any };

  constructor(options: any) {
    super(options);
    this.container = this.options.element as HTMLElement;

    this.popoverElement = this.container.querySelector('.gi-popover') as any;
    this.triggerElement = this.container.querySelector(
      `[data-trigger-element-id="trigger-element-${this.container.getAttribute('id')}"]`,
    ) as HTMLElement;
  }

  toggleDisplayState(force?: boolean) {
    if (this.popoverElement) {
      const isOpen =
        force === undefined
          ? this.popoverElement.classList.contains('gi-hidden')
          : force;

      if (isOpen) {
        this.popoverElement.classList.add('gi-block');
        this.popoverElement.classList.remove('gi-hidden');
        this.popoverElement.setAttribute('aria-hidden', 'false');
        const popperInstance = createPopper(
          this.triggerElement,
          this.popoverElement,
          {
            strategy: 'absolute',
            placement: 'bottom-start',
            modifiers: [
              { name: 'offset', options: { offset: [0, 4] } },
              { name: 'preventOverflow', options: { padding: 8 } },
              {
                name: 'flip',
                options: {
                  fallbackPlacements: ['right', 'top'],
                },
              },
            ],
          },
        );
        this.popoverElement.__popperInstance = popperInstance;
      } else {
        this.popoverElement.classList.add('gi-hidden');
        this.popoverElement.classList.remove('gi-block');
        this.popoverElement.setAttribute('aria-hidden', 'true');
      }
    }
  }

  initComponent() {
    this.triggerElement?.addEventListener('click', () => {
      this.toggleDisplayState();
    });

    this.container.addEventListener('closePopover', () => {
      this.toggleDisplayState(false);
    });
  }

  destroyComponent(): void {
    this.triggerElement.removeEventListener(
      'click',
      this.toggleDisplayState as any,
    );
  }
}

export const initPopover = initialiseModule({
  name: 'popover',
  component: 'Popover',
});
