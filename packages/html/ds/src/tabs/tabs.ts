import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type TabsOptions = BaseComponentOptions;

class TabsAutomatic {
  tabs: HTMLInputElement[];
  firstTab!: HTMLInputElement;
  lastTab!: HTMLInputElement;
  tabElement: Element;
  tabPanels: HTMLElement[];

  constructor(tabElement: Element) {
    this.tabElement = tabElement;

    this.tabs = [];

    this.tabs = [
      ...this.tabElement.querySelectorAll('[role=tab]'),
    ] as HTMLInputElement[];
    this.tabPanels = [];

    for (const tab of this.tabs) {
      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;

      const ariaControlAttribute = tab.getAttribute('aria-controls');
      if (!ariaControlAttribute) {
        continue;
      }

      const tabpanel = document.querySelector(
        `#${ariaControlAttribute}`,
      ) as HTMLElement;

      if (tabpanel) {
        tab.setAttribute('aria-selected', 'false');
        this.tabPanels.push(tabpanel);

        tab.addEventListener('keydown', this.onKeydown.bind(this));
        tab.addEventListener('click', this.onClick.bind(this));
      }
    }

    this.setSelectedTab(this.firstTab);
  }

  initComponent() {
    for (const tab of this.tabs) {
      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));
    }
  }

  destroyComponent() {
    for (const tab of this.tabs) {
      tab.removeEventListener('keydown', this.onKeydown);
      tab.removeEventListener('click', this.onClick);
    }
  }

  setSelectedTab(currentTab: HTMLInputElement) {
    for (let index = 0; index < this.tabs.length; index += 1) {
      const tab = this.tabs[index];
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.classList.add('gi-tab-item-checked');
        this.tabPanels[index].style.display = 'block';
        tab.blur();
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.classList.remove('gi-tab-item-checked');
        this.tabPanels[index].style.display = 'none';
      }
    }
  }

  setSelectedToPreviousTab(currentTab: HTMLInputElement) {
    let index;

    if (currentTab === this.firstTab) {
      this.setSelectedTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index - 1]);
    }
  }

  setSelectedToNextTab(currentTab: HTMLInputElement) {
    let index;

    if (currentTab === this.lastTab) {
      this.setSelectedTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index + 1]);
    }
  }

  onKeydown(event: KeyboardEvent) {
    const tgt = event.currentTarget;
    let flag = false;

    switch (event.key) {
      case 'ArrowLeft': {
        this.setSelectedToPreviousTab(tgt as HTMLInputElement);
        flag = true;
        break;
      }

      case 'ArrowRight': {
        this.setSelectedToNextTab(tgt as HTMLInputElement);
        flag = true;
        break;
      }

      case 'Home': {
        this.setSelectedTab(this.firstTab);
        flag = true;
        break;
      }

      case 'End': {
        this.setSelectedTab(this.lastTab);
        flag = true;
        break;
      }

      default: {
        break;
      }
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onClick(event: Event) {
    this.setSelectedTab(event.currentTarget as HTMLInputElement);
  }
}

export class Tabs extends BaseComponent<TabsOptions> {
  getAllTabs: NodeListOf<Element>;
  tabsAutomatedList: TabsAutomatic[] = [];

  constructor(options: TabsOptions) {
    super(options);

    this.getAllTabs = document.querySelectorAll('[role=tablist]');
    for (const tabsContainer of this.getAllTabs) {
      const tabsAutomated = new TabsAutomatic(tabsContainer);
      this.tabsAutomatedList.push(tabsAutomated);
    }
  }

  initComponent() {
    for (const tabsAutomated of this.tabsAutomatedList) {
      tabsAutomated.initComponent();
    }
  }

  destroyComponent(): void {
    for (const tabsAutomated of this.tabsAutomatedList) {
      tabsAutomated.destroyComponent();
    }
  }
}

export const initTabs = initialiseModule({
  name: 'tabs',
  component: 'Tabs',
});
