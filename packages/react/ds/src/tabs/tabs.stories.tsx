'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within, userEvent, waitFor } from 'storybook/test';
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
    appearance: {
      options: ['default', 'dark'],
      control: 'radio',
      description: 'Visual appearance of the tabs',
    },
    size: {
      options: ['sm', 'md'],
      control: 'radio',
      description: 'Size of the tabs',
    },
    labelAlignment: {
      options: ['start', 'center', 'end'],
      control: 'radio',
      description: 'Label alignment',
    },
    stretch: {
      control: 'boolean',
      description:
        'If true, all the tabs will space equally covering full available width. Default: false',
    },
    padding: {
      control: 'boolean',
      description: 'If true, tabs will have padding applied. Default: true',
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
  },
  render: (props) => (
    <Tabs {...props}>
      <TabList>
        <TabItem value="tab1" href="#">
          Tab 1
        </TabItem>
        <TabItem value="tab2">Tab 2</TabItem>
        <TabItem value="tab3">Tab 3</TabItem>
      </TabList>
      <TabPanel value="tab1">Tab 1 Content</TabPanel>
      <TabPanel value="tab2">Tab 2 Content</TabPanel>
      <TabPanel value="tab3">Tab 3 Content</TabPanel>
    </Tabs>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const computedStyle = getComputedStyle(canvasElement);
    const mutedBorderColor = computedStyle
      .getPropertyValue('--gieds-color-border-system-neutral-muted')
      .trim();

    expect(mutedBorderColor).toBe('#d8dadf');

    const tab1 = canvas.getByRole('tab', { name: 'Tab 1' });
    const tab2 = canvas.getByRole('tab', { name: 'Tab 2' });

    const itemBorder = tab1.querySelector('.gi-tab-item-border');

    await waitFor(() =>
      expect(itemBorder?.classList).toContain(
        'gi-bg-color-border-tone-primary-accent-selected',
      ),
    );

    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
    await userEvent.click(tab2);

    expect(tab1).toHaveAttribute('aria-selected', 'false');
    expect(tab2).toHaveAttribute('aria-selected', 'true');
  },
};

export const Dark: Story = {
  args: {
    ariaLabelledBy: 'tab-neutral',
    children: '',
    appearance: 'dark',
    id: 'tab-neutral',
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

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tab1 = canvas.getByRole('tab', { name: 'Tab 1' });
    const tab2 = canvas.getByRole('tab', { name: 'Tab 2' });
    const tab3 = canvas.getByRole('tab', { name: 'Tab 3' });

    await waitFor(() => expect(tab1).toHaveAttribute('aria-selected', 'true'));

    expect(tab2).toHaveAttribute('aria-selected', 'false');
    expect(tab3).toHaveAttribute('aria-selected', 'false');

    const itemBorder = tab1.querySelector('.gi-tab-item-border');

    await waitFor(() =>
      expect(itemBorder?.classList).toContain(
        'gi-bg-color-text-system-neutral-interactive-default',
      ),
    );

    await userEvent.click(tab2);

    expect(tab1).toHaveAttribute('aria-selected', 'false');
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(tab3).toHaveAttribute('aria-selected', 'false');

    await userEvent.click(tab3);

    expect(tab2).toHaveAttribute('aria-selected', 'false');
    expect(tab3).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(tab1);
  },
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

export const WithStretch: Story = {
  args: {
    id: 'tabs-with-stretch',
    ariaLabelledBy: 'tabs-with-stretch',
    children: '',
    stretch: true,
  },
  render: (props) => {
    return (
      <Tabs {...props}>
        <TabList>
          <TabItem value="tab-with-stretch1">Tab 1</TabItem>
          <TabItem value="tab-with-stretch2">Tab 2</TabItem>
        </TabList>
        <TabPanel value="tab-with-stretch1">Tab 1 Content</TabPanel>
        <TabPanel value="tab-with-stretch2">Tab 2 Content</TabPanel>
      </Tabs>
    );
  },
};

export const WithoutPadding: Story = {
  args: {
    id: 'tabs-without-padding',
    ariaLabelledBy: 'tabs-without-padding',
    children: '',
    padding: false,
    stretch: true,
  },
  render: (props) => {
    return (
      <Tabs {...props}>
        <TabList>
          <TabPanel value="tab11-no-padding">Tab 1</TabPanel>
          <TabPanel value="tab21-no-padding">Tab 2</TabPanel>
          <TabPanel value="tab31-no-padding">Tab 3</TabPanel>
        </TabList>
        <TabPanel value="tab11-no-padding">Tab 1 Content</TabPanel>
        <TabPanel value="tab21-no-padding">Tab 2 Content</TabPanel>
        <TabPanel value="tab31-no-padding">Tab 3 Content</TabPanel>
      </Tabs>
    );
  },
};

export const TestTabs: Story = {
  tags: ['skip-playwright'],
  args: {
    ariaLabelledBy: 'tabs',
    id: 'tab-1',
    children: null,
  },
  render: (props) => (
    <Tabs {...props}>
      <TabList>
        <TabItem value="tab1">Tab 1</TabItem>
        <TabItem value="tab2">Tab 2</TabItem>
      </TabList>
      <TabPanel value="tab1">Tab 1 Content</TabPanel>
      <TabPanel value="tab2">Tab 2 Content</TabPanel>
    </Tabs>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render tabs', async () => {
      expect(canvas.getByText('Tab 1 Content')).toBeTruthy();
    });

    await step('should render tabs', async () => {
      expect(canvas.getByText('Tab 2 Content')).toBeTruthy();
    });

    await step('should allow selecting a tab', async () => {
      const tablist = canvas.getByRole('tablist');
      const tabButtons = tablist.querySelectorAll('button');

      if (tabButtons) {
        await userEvent.click(tabButtons[1]);

        expect(tabButtons[1]).toHaveAttribute('aria-selected', 'true');
        expect(tabButtons[0]).toHaveAttribute('aria-selected', 'false');
        expect(canvas.getByText('Tab 2 Content')).toBeVisible();
      }
    });
  },
};

export const TestTabsWithIcon: Story = {
  tags: ['skip-playwright'],
  args: {
    ariaLabelledBy: 'tabs',
    id: 'tab-1',
    children: null,
  },
  render: (props) => (
    <Tabs {...props}>
      <TabList>
        <TabItem value="tab1" icon="placeholder">
          Tab 1
        </TabItem>
        <TabItem value="tab2" icon="accessibility_new">
          Tab 2
        </TabItem>
      </TabList>
      <TabPanel value="tab1">Tab 1 Content</TabPanel>
      <TabPanel value="tab2">Tab 2 Content</TabPanel>
    </Tabs>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('tabs rendered', async () => {
      await expect(canvas.getByText('Tab 1')).toBeInTheDocument();
      await expect(canvas.getByText('Tab 2')).toBeInTheDocument();
    });

    await step('renders two icons', async () => {
      const icons = canvasElement.querySelectorAll(
        'svg, .material-symbols-outlined, [data-testid="govie-icon"]',
      );
      expect(icons.length).toBe(2);
    });
  },
};
