import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './summary-list.html?raw';
import { SummaryListProps } from './summary-list.schema';

const path = import.meta.url.split('/summary-list')[0];
const macro = { name: 'govieSummaryList', html, path };
const SummaryList = renderComponent<SummaryListProps>(macro);

const meta = {
  component: SummaryList,
  title: 'typography/SummaryList',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'The Summary List component presents data concisely in labeled rows, optionally with actions for each row.',
      },
    },
  },
} satisfies Meta<typeof SummaryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: [
      {
        label: 'Name',
        value: 'John Smith',
        action: { href: '/change', label: 'Change' },
        withBorder: true,
      },
      {
        label: 'Date of birth',
        value: '8 November 1982',
        action: { href: '/change', label: 'Change' },
        withBorder: true,
      },
      {
        label: 'Address',
        value: ['72 Guild Street', 'London', 'SE23 6FH'],
        action: { href: '/change', label: 'Change' },
        withBorder: true,
      },
      {
        label: 'Contact details',
        value: ['07700 864523', 'john.smith@example.com'],
        action: { href: '/change', label: 'Change' },
        withBorder: true,
      },
    ],
  },
};

export const WithMixedBorders: Story = {
  args: {
    rows: [
      {
        label: 'Name',
        value: 'John Smith',
        action: { href: '/change', label: 'Change' },
        withBorder: true,
      },
      {
        label: 'Date of birth',
        value: '8 November 1982',
        action: { href: '/change', label: 'Change' },
        withBorder: false,
      },
      {
        label: 'Address',
        value: ['72 Guild Street', 'London', 'SE23 6FH'],
        action: { href: '/change', label: 'Change' },
        withBorder: true,
      },
    ],
  },
};

export const WithMixedActions: Story = {
  args: {
    rows: [
      {
        label: 'Name',
        value: 'John Smith',
        withBorder: true,
      },
      {
        label: 'Date of birth',
        value: '8 November 1982',
        action: { href: '/change', label: 'Change' },
        withBorder: true,
      },
      {
        label: 'Address',
        value: ['72 Guild Street', 'London', 'SE23 6FH'],
        action: { href: '/change', label: 'Change' },
        withBorder: true,
      },
    ],
  },
};

export const WithoutBorders: Story = {
  args: {
    rows: [
      {
        label: 'Name',
        value: 'John Smith',
      },
      {
        label: 'Date of birth',
        value: '8 November 1982',
      },
      {
        label: 'Address',
        value: ['72 Guild Street', 'London', 'SE23 6FH'],
      },
    ],
  },
};
