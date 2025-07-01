import { SelectGroupItemProps, SelectItemProps } from '../select/types';

export type SelectMenuProps = {
  id: string;
  items: (SelectItemProps | SelectGroupItemProps)[];
  dataTestid?: string;
  className?: string;
  disabled?: boolean;
  enableSearch?: boolean;
};

export const createSelectMenu = (arguments_: SelectMenuProps) => {
  const {
    items,
    dataTestid,
    className = '',
    disabled = false,
    enableSearch,
  } = arguments_;

  const container = document.createElement('div');
  container.dataset.testid = dataTestid;
  container.className = `gi-select-menu-container ${className}`.trim();

  if (enableSearch) {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'gi-select-menu-input-container';

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'gi-input-text-container';

    const inputInner = document.createElement('div');
    inputInner.className = 'gi-input-text-inner';

    const input = document.createElement('input');
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

  for (const item of items) {
    const li = document.createElement('li');
    li.className = 'gi-select-option-item';
    li.setAttribute('role', 'option');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-selected', 'false');
    li.setAttribute('aria-label', item.label);
    li.dataset.searchEnabled = 'true';
    li.dataset.testid = `option-${item.value.toString()}`;
    li.dataset.triggerElementId = 'select-menu-item-trigger';

    const span = document.createElement('span');
    span.className = 'gi-text-sm';
    span.textContent = item.label;
    span.dataset.triggerElementId = 'select-menu-span-trigger';

    li.append(span);
    ul.append(li);
  }

  optionsContainer.append(ul);
  container.append(optionsContainer);

  return container;
};
