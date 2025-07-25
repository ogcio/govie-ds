import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createTabs } from '../helpers/tabs';
import { TabsProps } from './tabs.schema';

const meta: Meta<TabsProps> = {
  title: 'navigation/Tabs',
  parameters: {
    docs: {
      description: {
        component:
          'Tabs component for navigating grouped content panels. Supports interactive selection and accessibility.',
      },
    },
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

export default meta;
type Story = StoryObj<TabsProps>;

const createElement = (arguments_: TabsProps) => {
  const component = createTabs(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  args: {
    id: 'tab-default',
    items: [
      {
        id: 'tab1',
        label: 'Tab 1',
        checked: true,
        panel: {
          content: 'Tab 1 Content',
        },
      },
      {
        id: 'tab2',
        label: 'Tab 2',
        panel: {
          content: 'Tab 2 Content',
        },
      },
      {
        id: 'tab3',
        label: 'Tab 3',
        panel: {
          content: 'Tab 3 Content',
        },
      },
    ],
  },

  render: (arguments_) => createElement(arguments_),
};

export const HoverState: Story = {
  args: { items: [] },
  render: () => `
    <div class="gi-tabs" aria-labelledby="tabs-hover" id="tabs-hover">
      <div role="tablist" class="gi--mb-[1px]">
        <button
          id="tab-tab-hover1"
          role="tab"
          aria-selected="false"
          aria-controls="tab-panel-tab-hover1"
          class="gi-tab-item"
        >
          <span class="gi-decoration-xs">Tab 1</span>
        </button>
        <button
          id="tab-tab-hover2"
          role="tab"
          aria-selected="false"
          aria-controls="tab-panel-tab-hover2"
          class="gi-tab-item pseudo-hover"
        >
          <span class="gi-decoration-xs">Hover</span>
        </button>
      </div>
      <div
        role="tabpanel"
        id="tab-panel-tab-hover1"
        aria-labelledby="tab-tab-hover1"
        class="gi-tab-panel"
      >
        Tab 1 Content
      </div>
      <div
        role="tabpanel"
        id="tab-panel-tab-hover2"
        aria-labelledby="tab-tab-hover2"
        class="gi-tab-panel"
      >
        Hover Tab Content
      </div>
    </div>
  `,
  parameters: {
    pseudo: {
      hover: '#tab-tab21',
    },
  },
};

export const FocusState: Story = {
  args: { items: [] },
  render: () => `
     <div class="gi-tabs" aria-labelledby="tabs-focus" id="tabs-focus">
      <div role="tablist" class="gi--mb-[1px]">
        <button
          id="tab-tab-focus1"
          role="tab"
          aria-selected="false"
          aria-controls="tab-panel-tab-focus1"
          class="gi-tab-item"
        >
          <span class="gi-decoration-xs">Tab 1</span>
        </button>
        <button
          id="tab-tab-focus2"
          role="tab"
          aria-selected="false"
          aria-controls="tab-panel-tab-focus2"
          class="gi-tab-item pseudo-focus"
        >
          <span class="gi-decoration-xs">Focus</span>
        </button>
      </div>
      <div
        role="tabpanel"
        id="tab-panel-tab-focus1"
        aria-labelledby="tab-tab-focus1"
        class="gi-tab-panel"
      >
        Tab 1 Content
      </div>
      <div
        role="tabpanel"
        id="tab-panel-tab-focus2"
        aria-labelledby="tab-tab-focus2"
        class="gi-tab-panel"
      >
        Focus Tab Content
      </div>
    </div>
  `,
  parameters: {
    pseudo: {
      focus: '#tab-tab31',
    },
  },
};
