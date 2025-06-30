import { PopoverProps } from '../popover/types';

export const createPopover = (arguments_: PopoverProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const { triggerElement } = arguments_;

  container.dataset.module = 'gieds-popover';
  container.dataset.element = 'popover';
  container.id = arguments_.id;
  container.classList = 'gi-popover-container';

  wrapper.ariaRoleDescription = 'dialog';
  wrapper.ariaHidden = 'true';
  wrapper.classList = 'gi-popover gi-hidden';
  wrapper.innerHTML = arguments_.content;
  wrapper.dataset.element = 'popover';

  const triggerWrapper = document.createElement('div');
  triggerWrapper.innerHTML = triggerElement;
  const triggerHTMLElement = triggerWrapper.firstChild as HTMLElement;

  if (triggerHTMLElement) {
    triggerHTMLElement.dataset.element = 'trigger-element';
    triggerHTMLElement.dataset.triggerElementId = `trigger-element-${arguments_.id}`;
  }

  container.append(triggerHTMLElement);
  container.append(wrapper);

  return container;
};
