import { createPopper } from '@popperjs/core';
import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type PopoverOptions = BaseComponentOptions;

export class Popover extends BaseComponent<PopoverOptions> {
  getAllPopovers: NodeListOf<HTMLElement>;

  constructor(options: any) {
    super(options);

    this.getAllPopovers = document?.querySelectorAll('.gi-popover-container');

    this.triggerElementEventLister = this.triggerElementEventLister.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  toggleDisplayState(wrapper: HTMLElement, force?: boolean) {
    const popoverElement = wrapper.querySelector('.gi-popover') as HTMLElement;
    const triggerElement = wrapper.querySelector(
      `[data-trigger-element-id="trigger-element-${wrapper.getAttribute('id')}"]`,
    ) as HTMLElement;

    if (popoverElement) {
      const isOpen =
        force === undefined
          ? popoverElement.getAttribute('aria-hidden') === 'true'
          : force;

      if (isOpen) {
        popoverElement.classList.add('gi-block');
        popoverElement.classList.remove('gi-hidden');
        popoverElement.setAttribute('aria-hidden', 'false');

        createPopper(triggerElement, popoverElement, {
          strategy: 'absolute',
          placement: 'bottom-start',
          modifiers: [
            { name: 'offset', options: { offset: [0, 4] } },
            { name: 'preventOverflow', options: { padding: 8 } },
          ],
        });
      } else {
        popoverElement.classList.add('gi-hidden');
        popoverElement.classList.remove('gi-block');
        popoverElement.setAttribute('aria-hidden', 'true');
      }
    }
  }

  triggerElementEventLister(wrapper: HTMLElement) {
    this.toggleDisplayState(wrapper);
  }

  handleClickOutside(event: MouseEvent | any) {
    const triggerId = event?.target?.dataset?.triggerElementId;

    if (!triggerId) {
      for (const wrapper of this.getAllPopovers) {
        this.toggleDisplayState(wrapper, false);
      }
    }
  }

  handleKeyDown(event: any) {
    if (event.key === 'Escape') {
      for (const wrapper of this.getAllPopovers) {
        this.toggleDisplayState(wrapper, false);
      }
    }
  }

  initComponent() {
    for (const wrapper of this.getAllPopovers) {
      const triggerElement = wrapper.querySelector(
        `[data-trigger-element-id="trigger-element-${wrapper.getAttribute('id')}"]`,
      );

      triggerElement?.addEventListener('click', () =>
        this.triggerElementEventLister(wrapper),
      );
    }
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  destroyComponent(): void {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyDown);
  }
}

export const initPopover = initialiseModule({
  name: 'popover',
  component: 'Popover',
});
