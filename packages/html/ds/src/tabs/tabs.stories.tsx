import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, within, userEvent, waitFor } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const computedStyle = getComputedStyle(canvasElement);
    const mutedBorderColor = computedStyle
      .getPropertyValue('--gieds-color-border-system-neutral-muted')
      .trim();

    expect(mutedBorderColor).toBe('#d8dadf');

    const tab1 = canvas.getByRole('tab', { name: 'Tab 1' });
    const tab2 = canvas.getByRole('tab', { name: 'Tab 2' });

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
    appearance: 'dark',
    id: 'tab-neutral',
    items: [
      {
        id: 'tab61',
        label: 'Tab 1',
        checked: true,
        panel: {
          content: 'Tab 1 Content',
        },
      },
      {
        id: 'tab62',
        label: 'Tab 2',
        panel: {
          content: 'Tab 2 Content',
        },
      },
      {
        id: 'tab63',
        label: 'Tab 3',
        panel: {
          content: 'Tab 3 Content',
        },
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tab1 = canvas.getByRole('tab', { name: 'Tab 1' });
    const tab2 = canvas.getByRole('tab', { name: 'Tab 2' });
    const tab3 = canvas.getByRole('tab', { name: 'Tab 3' });

    expect(tab1).toHaveAttribute('aria-selected', 'true');
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

  render: (arguments_) => createElement(arguments_),
};

export const Small: Story = {
  args: {
    ariaLabelledBy: 'tab-small',
    id: 'tab-small',
    size: 'sm',
    items: [
      {
        id: 'tab21',
        label: 'Tab 1',
        checked: true,
        panel: {
          content: 'Tab 1 Content',
        },
      },
      {
        id: 'tab22',
        label: 'Tab 2',
        panel: {
          content: 'Tab 2 Content',
        },
      },
      {
        id: 'tab23',
        label: 'Tab 3',
        panel: {
          content: 'Tab 3 Content',
        },
      },
    ],
  },

  render: (arguments_) => createElement(arguments_),
};

export const Checked: Story = {
  args: {
    id: 'tabs-checked',
    ariaLabelledBy: 'tabs-checked',
    items: [
      {
        id: 'tab31',
        label: 'Tab 1',
        panel: {
          content: 'Tab 1 Content',
        },
      },
      {
        id: 'tab32',
        label: 'Tab 2 (Checked)',
        checked: true,
        panel: {
          content: 'Tab 2 Content',
        },
      },
      {
        id: 'tab33',
        label: 'Tab 3',
        panel: {
          content: 'Tab 3 Content',
        },
      },
    ],
  },

  render: (arguments_) => createElement(arguments_),
};

export const WithStretch: Story = {
  args: {
    id: 'tabs-with-stretch',
    ariaLabelledBy: 'tabs-with-stretch',
    stretch: true,
    items: [
      {
        id: 'tab41',
        label: 'Tab 1',
        checked: true,
        panel: {
          content: 'Tab 1 Content',
        },
      },
      {
        id: 'tab42',
        label: 'Tab 2',
        panel: {
          content: 'Tab 2 Content',
        },
      },
      {
        id: 'tab43',
        label: 'Tab 3',
        panel: {
          content: 'Tab 3 Content',
        },
      },
    ],
  },

  render: (arguments_) => createElement(arguments_),
};

export const WithoutPadding: Story = {
  args: {
    id: 'tabs-without-padding',
    ariaLabelledBy: 'tabs-without-padding',
    padding: false,
    stretch: true,
    items: [
      {
        id: 'tab51',
        label: 'Tab 1',
        checked: true,
        panel: {
          content: 'Tab 1 Content',
        },
      },
      {
        id: 'tab52',
        label: 'Tab 2',
        panel: {
          content: 'Tab 2 Content',
        },
      },
      {
        id: 'tab53',
        label: 'Tab 3',
        panel: {
          content: 'Tab 3 Content',
        },
      },
    ],
  },

  render: (arguments_) => createElement(arguments_),
};
