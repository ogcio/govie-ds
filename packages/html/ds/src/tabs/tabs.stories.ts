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
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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
