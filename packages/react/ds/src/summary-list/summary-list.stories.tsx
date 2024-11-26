import type { Meta, StoryObj } from '@storybook/react';
import SummaryList, {
  SummaryListAction,
  SummaryListRow,
  SummaryListValue,
} from './summary-list.js';

const meta = {
  title: 'typography/SummaryList',
  component: SummaryList,
  parameters: {
    docs: {
      description: {
        component:
          'Use the summary list to summarize information, for example, a user’s responses at the end of a form.',
      },
    },
  },
  argTypes: {
    children: {
      description:
        'An array of `SummaryListRow` components, each representing a row in the summary list. Each row includes `SummaryListValue`, and/or `SummaryListAction`.',
      table: {
        type: {
          summary: 'SummaryListRow[]',
          detail: `
            Each SummaryListRow contains:
              - SummaryListValue: The value for the row cell (string | string[])
              - SummaryListAction: An action link for the row cell`,
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
      <SummaryListRow key="1" withBorder label="Name">
        <SummaryListValue>John Smith</SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="2" withBorder label="Date of birth">
        <SummaryListValue>8 November 1982</SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="3" withBorder label="Address">
        <SummaryListValue>
          {['72 Guild Street', 'London', 'SE23 6FH']}
        </SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="4" withBorder label="Contact details">
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
      <SummaryListRow key="1" withBorder label="Name">
        <SummaryListValue>John Smith</SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="2" label="Date of birth">
        <SummaryListValue>8 November 1982</SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="3" withBorder label="Address">
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
      <SummaryListRow key="1" withBorder label="Name">
        <SummaryListValue>John Smith</SummaryListValue>
      </SummaryListRow>,
      <SummaryListRow key="2" withBorder label="Date of birth">
        <SummaryListValue>8 November 1982</SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="3" withBorder label="Address">
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
      <SummaryListRow key="1" label="Name">
        <SummaryListValue>John Smith</SummaryListValue>
      </SummaryListRow>,
      <SummaryListRow key="2" label="Date of birth">
        <SummaryListValue>8 November 1982</SummaryListValue>
      </SummaryListRow>,
      <SummaryListRow key="3" label="Address">
        <SummaryListValue>
          {['72 Guild Street', 'London', 'SE23 6FH']}
        </SummaryListValue>
      </SummaryListRow>,
    ],
  },
};
