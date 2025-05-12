import { TabsProps } from '../tabs/tabs.schema';
import { generateRandomId, slugify } from '.';

export const createTabs = (arguments_: TabsProps) => {
  const tabsContainer = document.createElement('div');
  const tabId = arguments_.id || generateRandomId();

  tabsContainer.className = 'gi-tabs';
  tabsContainer.dataset.module = 'gieds-tabs';
  tabsContainer.id = tabId;

  if (arguments_.ariaLabelledBy) {
    tabsContainer.setAttribute('aria-labelledby', arguments_.ariaLabelledBy);
  }

  if (arguments_.dataTestid) {
    tabsContainer.dataset.testid = arguments_.dataTestid;
  }

  if (arguments_.items.length > 0) {
    const tabList = document.createElement('div');
    tabList.className = 'gi--mb-[1px]';
    tabList.setAttribute('role', 'tablist');
    tabsContainer.append(tabList);

    for (let index = 0; index < arguments_.items.length; index++) {
      const tabItem = arguments_.items[index];
      const slug = slugify(tabItem.label);

      const tab = document.createElement('button');
      tab.id = tabItem.id;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-roledescription', 'tab');
      tab.setAttribute('aria-controls', `tab-panel-${tabItem.id}`);
      tabList.append(tab);
      tab.className = `gi-tab-item ${
        tabItem.checked ? 'gi-tab-item-checked' : ''
      }`;

      const span = document.createElement('span');
      span.className = 'gi-decoration-xs';
      span.textContent = tabItem.label;
      tab.append(span);

      const tabPanel = document.createElement('div');
      tabPanel.setAttribute('role', 'tabpanel');
      tabPanel.setAttribute('aria-labelledby', `tab-${slug}`);
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
