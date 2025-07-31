'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Paragraph } from '../paragraph/paragraph.js';
import { Stack } from '../stack/stack.js';
import { TabItem } from './tab-item.js';
import { TabList } from './tab-list.js';
import { TabPanel } from './tab-panel.js';
import { Tabs } from './tabs.js';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  decorators: [
    (Story) => (
      <div className="gi-p-8">
        <Story />
      </div>
    ),
  ],
  component: Tabs,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Tabs component for navigating grouped content panels. Supports interactive selection and accessibility.',
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'ID of the tabs container',
    },
    ariaLabelledBy: {
      control: 'text',
      description: 'ID of the element that labels the tabs (required)',
    },
    dataTestid: {
      control: 'text',
      description: 'Test ID for the tabs container',
    },
    variant: {
      options: ['primary', 'neutral'],
      control: 'radio',
      description: 'Visual variant of the tabs',
    },
    size: {
      options: ['sm', 'md'],
      control: 'radio',
      description: 'Size of the tabs',
    },
    children: {
      control: false,
      description: 'Tab items and panels as children components',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaLabelledBy: 'tab-example',
    id: 'tab-example',
    size: 'md',
    children: null,
    variant: 'neutral',
  },
  render: (props) => (
    <Tabs {...props}>
      <TabList>
        <TabItem value="tab1">Tab 1</TabItem>
        <TabItem value="tab2">Tab 2</TabItem>
        <TabItem value="tab3">Tab 3</TabItem>
      </TabList>
      <TabPanel value="tab1">Tab 1 Content</TabPanel>
      <TabPanel value="tab2">Tab 2 Content</TabPanel>
      <TabPanel value="tab3">Tab 3 Content</TabPanel>
    </Tabs>
  ),
};

export const Primary: Story = {
  args: {
    ariaLabelledBy: 'tab-primary',
    children: '',
    variant: 'primary',
    id: 'tab-primary',
  },
  render: (props) => (
    <Tabs {...props}>
      <TabList>
        <TabItem value="tab11">Tab 1</TabItem>
        <TabItem value="tab22">Tab 2</TabItem>
        <TabItem value="tab33">Tab 3</TabItem>
      </TabList>
      <TabPanel value="tab11">Tab 1 Content</TabPanel>
      <TabPanel value="tab22">Tab 2 Content</TabPanel>
      <TabPanel value="tab33">Tab 3 Content</TabPanel>
    </Tabs>
  ),
};

export const Small: Story = {
  args: {
    ariaLabelledBy: 'tab-small',
    children: '',
    id: 'tab-small',
    size: 'sm',
  },
  render: (props) => (
    <Tabs {...props}>
      <TabList>
        <TabItem value="tab111">Tab 1</TabItem>
        <TabItem value="tab222">Tab 2</TabItem>
        <TabItem value="tab333">Tab 3</TabItem>
      </TabList>
      <TabPanel value="tab111">Tab 1 Content</TabPanel>
      <TabPanel value="tab222">Tab 2 Content</TabPanel>
      <TabPanel value="tab333">Tab 3 Content</TabPanel>
    </Tabs>
  ),
};

export const Checked: Story = {
  args: {
    id: 'tabs-checked',
    ariaLabelledBy: 'tabs-checked',
    children: '',
  },
  render: (props) => (
    <Tabs {...props}>
      <TabList>
        <TabItem value="tab1-checked">Tab 1</TabItem>
        <TabItem value="tab2-checked" checked>
          Tab 2 (Checked)
        </TabItem>
        <TabItem value="tab3-checked">Tab 3</TabItem>
      </TabList>
      <TabPanel value="tab1-checked">Tab 1 Content</TabPanel>
      <TabPanel value="tab2-checked">Tab 2 Content</TabPanel>
      <TabPanel value="tab3-checked">Tab 3 Content</TabPanel>
    </Tabs>
  ),
};

export const HoverState: Story = {
  args: {
    id: 'tabs-hover',
    ariaLabelledBy: 'tabs-hover',
    children: '',
  },
  render: (props) => (
    <Tabs {...props}>
      <TabList>
        <TabItem value="tab-hover1">Tab 1</TabItem>
        <TabItem value="tab-hover2">Hover</TabItem>
      </TabList>
      <TabPanel value="tab-hover1">Tab 1 Content</TabPanel>
      <TabPanel value="tab-hover2">Hover Tab Content</TabPanel>
    </Tabs>
  ),
  parameters: {
    pseudo: {
      hover: '#tab-tab-hover2',
    },
  },
};

export const FocusState: Story = {
  args: {
    id: 'tabs-focus',
    ariaLabelledBy: 'tabs-focus',
    children: '',
  },
  render: (props) => (
    <Tabs {...props}>
      <TabList>
        <TabItem value="tab-focus1">Tab 1</TabItem>
        <TabItem value="tab-focus2">Focus</TabItem>
      </TabList>
      <TabPanel value="tab-focus1">Tab 1 Content</TabPanel>
      <TabPanel value="tab-focus2">Focus Tab Content</TabPanel>
    </Tabs>
  ),
  parameters: {
    pseudo: {
      focus: '#tab-tab-focus2',
    },
  },
};

export const WithHandler: Story = {
  args: {
    id: 'tabs-with-handler',
    ariaLabelledBy: 'tabs-with-handler',
    children: '',
  },
  render: (props) => {
    const [tab, setTab] = useState('Tab 1');
    return (
      <Stack gap={6}>
        <Paragraph>Tab Selected: {tab}</Paragraph>
        <Tabs {...props}>
          <TabList>
            <TabItem checked value="tab100" onTabClick={() => setTab('Tab 1')}>
              Tab 1
            </TabItem>
            <TabItem value="tab200" onTabClick={() => setTab('Tab 2')}>
              Tab 2
            </TabItem>
            <TabItem value="tab300" onTabClick={() => setTab('Tab 3')}>
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
