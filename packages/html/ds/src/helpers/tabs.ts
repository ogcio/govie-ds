import { TabsProps } from '../tabs/tabs.schema';
import { generateRandomId } from '.';

export const createTabs = (arguments_: TabsProps) => {
  const tabsContainer = document.createElement('div');
  const tabId = arguments_.id || generateRandomId();
  const {
    appearance = 'default',
    size = 'md',
    stretch = false,
    padding = true,
    labelAlignment = 'center',
  } = arguments_;

  tabsContainer.className = 'gi-tabs';
  tabsContainer.dataset.module = 'gieds-tabs';
  tabsContainer.id = tabId;

  if (arguments_.dataTestid) {
    tabsContainer.dataset.testid = arguments_.dataTestid;
  }

  if (arguments_.items.length > 0) {
    const classNames = [];
    classNames.push('gi-tab-list');
    const tabList = document.createElement('div');

    tabList.setAttribute('role', 'tablist');
    tabList.setAttribute('id', `${tabId}-list`);
    tabList.setAttribute('aria-orientation', 'horizontal');
    tabList.dataset.appearance = appearance;

    if (stretch) {
      classNames.push('gi-tab-list-stretch');
    }
    if (padding) {
      classNames.push('gi-gap-4');
    } else {
      classNames.push('gi-gap-0');
    }

    tabList.className = classNames.join(' ');
    tabsContainer.append(tabList);

    for (let index = 0; index < arguments_.items.length; index++) {
      const tabItem = arguments_.items[index];

      const tab = document.createElement('button');
      tab.id = `tab-${tabItem.id}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-roledescription', 'tab');
      tab.setAttribute('aria-selected', tabItem.checked ? 'true' : 'false');
      tab.dataset.selected = tabItem.checked ? 'true' : 'false';
      tab.setAttribute('aria-controls', `tab-panel-${tabItem.id}`);
      tabList.append(tab);
      const tabItemClassNames = ['gi-tab-item'];

      if (size === 'sm') {
        tabItemClassNames.push('gi-text-sm gi-py-2');
      } else {
        tabItemClassNames.push('gi-text-md gi-py-4');
      }

      if (tabItem.checked) {
        tabItemClassNames.push('gi-tab-item-checked');
      }

      switch (labelAlignment) {
        case 'start': {
          tabItemClassNames.push('gi-text-start');
          break;
        }
        case 'end': {
          tabItemClassNames.push('gi-text-end');
          break;
        }
        default: {
          tabItemClassNames.push('gi-text-center');
          break;
        }
      }

      if (stretch) {
        tabItemClassNames.push('gi-flex-1');
      }

      tab.className = tabItemClassNames.join(' ');

      tab.append(tabItem.label);

      const tabItemBorder = document.createElement('div');
      const tabItemBorderClassName = ['gi-tab-item-border'];

      if (tabItem.checked) {
        if (appearance === 'default') {
          tabItemBorderClassName.push(
            'gi-bg-color-border-tone-primary-accent-selected',
          );
        } else {
          tabItemBorderClassName.push(
            'gi-bg-color-text-system-neutral-interactive-default',
          );
        }
      }

      tabItemBorder.className = tabItemBorderClassName.join(' ');

      tab.append(tabItemBorder);

      const tabPanel = document.createElement('div');
      tabPanel.setAttribute('role', 'tabpanel');
      tabPanel.setAttribute('aria-labelledby', `tab-panel-${tabItem.id}`);
      tabPanel.id = `tab-panel-${tabItem.id}`;
      tabPanel.tabIndex = 0;
      tabPanel.className = 'gi-tab-panel';

      if (tabItem.panel.content) {
        tabPanel.innerHTML = tabItem.panel.content;
      }

      tabsContainer.append(tabPanel);
    }
  }
  return tabsContainer;
};
