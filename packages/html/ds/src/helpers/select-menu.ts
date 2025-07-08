import { SelectGroupItemProps, SelectItemProps } from '../select/types';
import { createLabel } from './forms';

const createListItem = (
  item: SelectItemProps,
  enableSearch?: boolean,
  ignorePopoverEvents?: boolean,
): HTMLLIElement => {
  const li = document.createElement('li');
  li.dataset.ignorePopoverEvents = ignorePopoverEvents ? 'true' : 'false';
  const span = document.createElement('span');
  span.dataset.ignorePopoverEvents = ignorePopoverEvents ? 'true' : 'false';

  li.className = 'gi-select-option-item';
  span.className = 'gi-text-sm';
  span.textContent = item.label;
  span.dataset.value = item.value?.toString();
  span.dataset.label = item.label?.toString();

  li.setAttribute('role', 'option');
  li.setAttribute('tabindex', '0');
  li.setAttribute('aria-selected', 'false');
  li.setAttribute('aria-label', item.label);
  li.dataset.isDisabled = 'false';
  span.dataset.isDisabled = 'false';
  li.dataset.testid = `option-${item.value?.toString()}`;
  li.dataset.value = item.value?.toString();
  li.dataset.label = item.label?.toString();
  li.dataset.searchEnabled = enableSearch ? 'true' : 'false';

  if (item.hidden) {
    li.style.display = 'none';
  }

  if (item.disabled) {
    li.className = 'gi-select-option-item gi-select-option-item-disabled';
    li.dataset.isDisabled = 'true';
    span.dataset.isDisabled = 'true';
  }

  li.append(span);
  return li;
};

export type SelectMenuProps = {
  id: string;
  items: (SelectItemProps | SelectGroupItemProps)[];
  dataTestid?: string;
  className?: string;
  disabled?: boolean;
  enableSearch?: boolean;
  ignorePopoverEvents?: boolean;
};

export const createSelectMenu = (arguments_: SelectMenuProps) => {
  const {
    items,
    dataTestid,
    className = '',
    disabled = false,
    enableSearch,
    id,
    ignorePopoverEvents,
  } = arguments_;

  const container = document.createElement('div');
  container.dataset.testid = dataTestid;
  container.id = `select-menu-${id}`;
  container.className = `gi-select-menu-container ${className}`.trim();

  if (enableSearch) {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'gi-select-menu-input-container';

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'gi-input-text-container';

    const inputInner = document.createElement('div');
    inputInner.className = 'gi-input-text-inner';

    const input = document.createElement('input');
    input.id = `search-input-${id}`;
    input.className = 'gi-input-text';
    input.type = 'text';
    input.placeholder = 'Search';
    input.tabIndex = 0;
    input.dataset.iconStart = 'false';
    input.dataset.iconEnd = 'true';
    input.dataset.endElement = 'false';
    input.dataset.prefix = 'false';
    input.dataset.suffix = 'false';
    input.dataset.triggerElementId = 'select-menu-search-input-trigger';
    input.disabled = disabled;
    input.dataset.ignorePopoverEvents = ignorePopoverEvents ? 'true' : 'false';

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'gi-input-text-icon-end';
    iconWrapper.dataset.endElement = 'false';
    iconWrapper.dataset.suffix = 'false';

    const icon = document.createElement('span');
    icon.className = 'gi-block material-symbols-outlined';
    icon.dataset.testid = 'govie-icon';
    icon.setAttribute('aria-label', 'search');
    icon.setAttribute('role', 'presentation');
    icon.style.fontSize = '24px';
    icon.textContent = 'search';

    iconWrapper.append(icon);

    inputInner.append(input);
    inputInner.append(iconWrapper);
    inputWrapper.append(inputInner);
    inputContainer.append(inputWrapper);
    container.append(inputContainer);
  }

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'gi-select-menu-option-container';

  const ul = document.createElement('ul');
  ul.dataset.ignorePopoverEvents = ignorePopoverEvents ? 'true' : 'false';

  for (const item of items) {
    if ('items' in item) {
      const groupDiv = document.createElement('div');
      groupDiv.setAttribute('role', 'option');
      groupDiv.className = 'gi-px-3';

      const groupLabel = createLabel({
        content: item.label,
        size: 'sm',
        className: 'gi-font-bold gi-pb-1',
      });
      groupDiv.append(groupLabel);

      for (const child of item.items.filter((opt) => !opt.hidden)) {
        const li = createListItem(child, enableSearch, ignorePopoverEvents);
        groupDiv.append(li);
      }
      ul.append(groupDiv);
    } else if (!item.hidden) {
      const li = createListItem(item, enableSearch, ignorePopoverEvents);
      ul.append(li);
    }
  }

  optionsContainer.append(ul);
  container.append(optionsContainer);

  return container;
};
