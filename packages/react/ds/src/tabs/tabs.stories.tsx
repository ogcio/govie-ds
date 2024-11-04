import type { Meta, StoryObj } from '@storybook/react';
import { TabItem } from './tab-item.js';
import { TabList } from './tab-list.js';
import { TabPanel } from './tab-panel.js';
import { Tabs } from './tabs.js';

const meta = {
  title: 'Navigation/Tabs',
  parameters: {
    docs: {
      description: {
        component: 'Tabs element navigation',
      },
    },
  },
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'tab-story',
    children: '',
    ariaLabelledBy: 'tab-story'
  },
  render: (arguments_) => {
    return (
      <Tabs {...arguments_}>
        <TabList>
          <TabItem value="tab1" checked>
            Tab 1
          </TabItem>
          <TabItem value="tab2">Tab 2</TabItem>
          <TabItem value="tab3">Tab 3</TabItem>
        </TabList>
        <TabPanel value="tab1">Tab 1 Content</TabPanel>
        <TabPanel value="tab2">Tab 2 Content</TabPanel>
        <TabPanel value="tab3">Tab 3 Content</TabPanel>
      </Tabs>
    );
  },
};
