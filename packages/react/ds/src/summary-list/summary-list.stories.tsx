import type { Meta, StoryObj } from '@storybook/react';
import SummaryList from './summary-list.js';

const meta = {
  title: 'typography/SummaryList',
  component: SummaryList,
} satisfies Meta<typeof SummaryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        key: 'Name',
        value: 'John Smith',
        actionText: 'Change',
        actionHref: '#',
      },
      {
        key: 'Date of birth',
        value: '8 November 1982',
        actionText: 'Change',
        actionHref: '#',
      },
      {
        key: 'Address',
        value: ['72 Guild Street', 'London', 'SE23 6FH'],
        actionText: 'Change',
        actionHref: '#',
      },
      {
        key: 'Contact details',
        value: ['07700 864523', 'john.smith@example.com'],
        actionText: 'Change',
        actionHref: '#',
      },
    ],
  },
};

export const WithoutActions: Story = {
  args: {
    items: [
      {
        key: 'Name',
        value: 'John Smith',
      },
      {
        key: 'Date of birth',
        value: '8 November 1982',
      },
      {
        key: 'Address',
        value: ['72 Guild Street', 'London', 'SE23 6FH'],
      },
      {
        key: 'Contact details',
        value: ['07700 864523', 'john.smith@example.com'],
      },
    ],
  },
};

export const CustomStyles: Story = {
  args: {
    items: [
      {
        key: 'Name',
        value: 'John Smith',
        actionText: 'Edit',
        actionHref: '#',
      },
      {
        key: 'Date of birth',
        value: '8 November 1982',
        actionText: 'Edit',
        actionHref: '#',
      },
      {
        key: 'Address',
        value: ['72 Guild Street', 'London', 'SE23 6FH'],
        actionText: 'Edit',
        actionHref: '#',
      },
      {
        key: 'Contact details',
        value: ['07700 864523', 'john.smith@example.com'],
        actionText: 'Edit',
        actionHref: '#',
      },
    ],
  },
};
