import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './tabs.html?raw';
import { TabsProps } from './tabs.schema';

const macro = { name: 'govieTabs', html };

const Tabs = renderComponent<TabsProps>(macro);

const meta = {
  component: Tabs,
  title: 'navigation/Tabs',
  parameters: {
    macro,
    docs: {
      description: {
        component: 'Tabs element navigation',
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaLabelledBy: 'tab-label-id',
    items: [
      {
        label: 'Tab 1',
        checked: true,
        panel: {
          text: 'Tab 1 Content',
        },
      },
      {
        label: 'Tab 2',
        panel: {
          text: 'Tab 2 Content',
        },
      },
      {
        label: 'Tab 3',
        panel: {
          text: 'Tab 3 Content',
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
};

export const AllStates: Story = {
  args: {
    ariaLabelledBy: 'tab-label-id',
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
