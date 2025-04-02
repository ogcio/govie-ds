import type { Meta, StoryObj } from '@storybook/react';
import { beautifyHtmlNode } from '../storybook/storybook';
import { TabsProps } from './tabs.schema';

const meta: Meta<TabsProps> = {
  title: 'navigation/Tabs',
};

export default meta;
type Story = StoryObj<TabsProps>;

function generateRandomId() {
  return Math.random().toString(36).slice(2, 11);
}

const createTabs = (arguments_: TabsProps) => {
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'gi-tabs';
  tabsContainer.dataset.module = 'gieds-tabs';
  tabsContainer.id = generateRandomId();

  if (arguments_.items.length > 0) {
    const tabList = document.createElement('div');
    tabList.className = 'gi--mb-[1px]';
    tabList.setAttribute('role', 'tablist');
    tabsContainer.append(tabList);

    for (let index = 0; index < arguments_.items.length; index++) {
      const tabItem = arguments_.items[index];

      const tab = document.createElement('button');
      tab.id = `tab-tab${index + 1}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-roledescription', 'tab');
      tab.setAttribute('aria-selected', tabItem.checked ? 'true' : 'false');
      tab.setAttribute('aria-controls', `tab-panel-tab${index + 1}`);
      tab.className = `gi-tab-item ${
        tabItem.checked ? 'gi-tab-item-checked' : ''
      }`;
      tabList.append(tab);

      const span = document.createElement('span');
      span.className = 'gi-decoration-xs';
      span.textContent = tabItem.label;
      tab.append(span);

      const tabPanel = document.createElement('div');
      tabPanel.setAttribute('role', 'tabpanel');
      tabPanel.setAttribute('aria-labelledby', `tab-tab${index + 1}`);
      tabPanel.id = `tab-panel-tab${index + 1}`;
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

const createElement = (arguments_: TabsProps) => {
  const component = createTabs(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Tab 1',
        checked: true,
        panel: {
          content: 'Tab 1 Content',
        },
      },
      {
        label: 'Tab 2',
        panel: {
          content: 'Tab 2 Content',
        },
      },
      {
        label: 'Tab 3',
        panel: {
          content: 'Tab 3 Content',
        },
      },
    ],
  },
  argTypes: {
    items: [
      {
        label: {
          control: { type: 'text' },
        },
        checked: {
          control: { type: 'boolean' },
        },
        panel: {
          text: { control: { type: 'text' } },
        },
      },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const AllStates: Story = {
  args: {
    items: [],
  },
  //@ts-expect-error Render function returns raw HTML string, not a React component
  render: () =>
    `<div aria-labelledby="tab-story" class="gi-tabs" id="tab-story-all-states">
        <div role="tablist" class="gi--mb-[1px]">
          <button
            id="tab-tab11"
            role="tab"
            aria-roledescription="tab"
            aria-selected="true"
            aria-controls="tab-panel-tab11"
            class="gi-tab-item gi-tab-item-checked"
          >
            <span class="gi-decoration-xs">Default</span>
          </button>
          <button
            id="tab-tab21"
            role="tab"
            aria-roledescription="tab"
            aria-selected="false"
            aria-controls="tab-panel-tab21"
            class="gi-tab-item pseudo-hover"
          >
            <span class="gi-decoration-xs">Hover</span>
          </button>
          <button
            id="tab-tab31"
            role="tab"
            aria-roledescription="tab"
            aria-selected="false"
            aria-controls="tab-panel-tab31"
            class="gi-tab-item pseudo-focus"
          >
            <span class="gi-decoration-xs">Focus</span>
          </button>
        </div>
      
        <div
          role="tabpanel"
          aria-labelledby="tab-tab11"
          id="tab-panel-tab11"
          tabindex="0"
          class="gi-tab-panel !gi-block"
        >
          Tab 1 Content
        </div>
        <div
          role="tabpanel"
          aria-labelledby="tab-tab21"
          id="tab-panel-tab21"
          tabindex="0"
          class="gi-tab-panel"
        >
          Tab 2 Content
        </div>
        <div
          role="tabpanel"
          aria-labelledby="tab-tab31"
          id="tab-panel-tab31"
          tabindex="0"
          class="gi-tab-panel"
        >
          Tab 3 Content
        </div>
      </div>
    `,
  parameters: {
    pseudo: {
      hover: '#tab-tab21',
      focus: '#tab-tab31',
    },
  },
};
