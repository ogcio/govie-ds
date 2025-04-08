'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Paragraph } from '../paragraph/paragraph.js';
import { Stack } from '../stack/stack.js';
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
    ariaLabelledBy: 'tab-story',
  },
  render: (arguments_) => {
    return (
      <Tabs {...arguments_}>
        <TabList>
          <TabItem value="tab1">Tab 1</TabItem>
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

export const WithHandler: Story = {
  args: {
    id: 'tab-with-handler',
    children: '',
    ariaLabelledBy: 'tab-with-handler',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  render: (arguments_) => {
    const [tab, setTab] = useState('Tab 1');
    return (
      <Stack gap={6}>
        <Paragraph>Tab Selected: {tab}</Paragraph>
        <Tabs {...arguments_}>
          <TabList>
            <TabItem
              checked
              onTabSelected={() => setTab('Tab 1')}
              value="tab100"
            >
              Tab 1
            </TabItem>
            <TabItem value="tab200" onTabSelected={() => setTab('Tab 2')}>
              Tab 2
            </TabItem>
            <TabItem value="tab300" onTabSelected={() => setTab('Tab 3')}>
              Tab 3
            </TabItem>
          </TabList>
          <TabPanel value="tab100">Tab 1 Content</TabPanel>
          <TabPanel value="tab200">Tab 2 Content</TabPanel>
          <TabPanel value="tab300">Tab 3 Content</TabPanel>
        </Tabs>
      </Stack>
    );
  },
};

export const AllStates: Story = {
  args: {
    id: 'tab-story-all-states',
    children: '',
    ariaLabelledBy: 'tab-story',
  },
  render: (arguments_) => {
    return (
      <Tabs {...arguments_}>
        <TabList>
          <TabItem value="tab11" checked>
            Default
          </TabItem>
          <TabItem value="tab21">Hover</TabItem>
          <TabItem value="tab31">Focus</TabItem>
        </TabList>
        <TabPanel value="tab11">Tab 1 Content</TabPanel>
        <TabPanel value="tab21">Tab 2 Content</TabPanel>
        <TabPanel value="tab31">Tab 3 Content</TabPanel>
      </Tabs>
    );
  },
  parameters: {
    pseudo: {
      hover: '#tab-tab21',
      focus: '#tab-tab31',
    },
  },
};

export const CheckedTab: Story = {
  args: {
    id: 'tab-checked-tab',
    children: '',
    ariaLabelledBy: 'tab-checked-tab',
  },
  render: (arguments_) => {
    return (
      <Tabs {...arguments_}>
        <TabList>
          <TabItem value="tab1000">Tab 1</TabItem>
          <TabItem value="tab2000" checked>
            Tab 2
          </TabItem>
          <TabItem value="tab3000">Tab 3</TabItem>
        </TabList>
        <TabPanel value="tab1000">Tab 1 Content</TabPanel>
        <TabPanel value="tab2000">Tab 2 Content (checked)</TabPanel>
        <TabPanel value="tab3000">Tab 3 Content</TabPanel>
      </Tabs>
    );
  },
};
