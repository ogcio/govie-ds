import type { Meta, StoryObj } from '@storybook/react';
import SummaryList, {
  SummaryListAction,
  SummaryListRow,
  SummaryListTitle,
  SummaryListValue,
} from './summary-list.js';

const meta = {
  title: 'typography/SummaryList',
  component: SummaryList,
  argTypes: {
    children: {
      description:
        'An array of `SummaryListRow` components, each representing a row in the summary list. Each row includes `SummaryListTitle`, `SummaryListValue`, and optionally `SummaryListAction`.',
      table: {
        type: {
          summary: 'SummaryListRow[]',
          detail: `
            Each SummaryListRow contains:
              - SummaryListTitle: A title for the row (string)
              - SummaryListValue: The value for the row (string | string[])
              - SummaryListAction: An action link for the row`,
        },
      },
    },
  },
} satisfies Meta<typeof SummaryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <SummaryListRow key="1" withBorder>
        <SummaryListTitle>Name</SummaryListTitle>
        <SummaryListValue>John Smith</SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="2" withBorder>
        <SummaryListTitle>Date of birth</SummaryListTitle>
        <SummaryListValue>8 November 1982</SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="3" withBorder>
        <SummaryListTitle>Address</SummaryListTitle>
        <SummaryListValue>
          {['72 Guild Street', 'London', 'SE23 6FH']}
        </SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="4" withBorder>
        <SummaryListTitle>Contact details</SummaryListTitle>
        <SummaryListValue>
          {['07700 864523', 'john.smith@example.com']}
        </SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
    ],
  },
};

export const WithMixedBorders: Story = {
  args: {
    children: [
      <SummaryListRow key="1" withBorder>
        <SummaryListTitle>Name</SummaryListTitle>
        <SummaryListValue>John Smith</SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="2">
        <SummaryListTitle>Date of birth</SummaryListTitle>
        <SummaryListValue>8 November 1982</SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="3" withBorder>
        <SummaryListTitle>Address</SummaryListTitle>
        <SummaryListValue>
          {['72 Guild Street', 'London', 'SE23 6FH']}
        </SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
    ],
  },
};

export const WithMixedActions: Story = {
  args: {
    children: [
      <SummaryListRow key="1" withBorder>
        <SummaryListTitle>Name</SummaryListTitle>
        <SummaryListValue>John Smith</SummaryListValue>
      </SummaryListRow>,
      <SummaryListRow key="2" withBorder>
        <SummaryListTitle>Date of birth</SummaryListTitle>
        <SummaryListValue>8 November 1982</SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="3" withBorder>
        <SummaryListTitle>Address</SummaryListTitle>
        <SummaryListValue>
          {['72 Guild Street', 'London', 'SE23 6FH']}
        </SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
    ],
  },
};

export const WithoutBorders: Story = {
  args: {
    children: [
      <SummaryListRow key="1">
        <SummaryListTitle>Name</SummaryListTitle>
        <SummaryListValue>John Smith</SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="2">
        <SummaryListTitle>Date of birth</SummaryListTitle>
        <SummaryListValue>8 November 1982</SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="3">
        <SummaryListTitle>Address</SummaryListTitle>
        <SummaryListValue>
          {['72 Guild Street', 'London', 'SE23 6FH']}
        </SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
    ],
  },
};
