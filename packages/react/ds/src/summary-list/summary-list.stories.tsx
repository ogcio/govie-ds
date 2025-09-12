import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import {
  SummaryList,
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
          72 Guild Street
          <br />
          London
          <br />
          SE23 6FH
        </SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="4" withBorder label="Contact details">
        <SummaryListValue>
          07700 864523
          <br />
          john.smith@example.com
        </SummaryListValue>
        <SummaryListAction href="/change">Change</SummaryListAction>
      </SummaryListRow>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render SummaryList and its rows correctly', async () => {
      expect(canvas.getByText('Name')).toBeInTheDocument();
      expect(canvas.getByText('Date of birth')).toBeInTheDocument();
      expect(canvas.getByText('Address')).toBeInTheDocument();
      expect(canvas.getByText('Contact details')).toBeInTheDocument();
    });

    await step('should render correctly with `withBorder` prop', async () => {
      const labelElement = canvas.getByText('Name');
      const containerElement = labelElement.closest('dl');
      expect(containerElement).not.toBeNull();
      if (containerElement !== null) {
        expect(containerElement).toHaveAttribute('data-border', 'true');
      }
    });
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
          72 Guild Street
          <br />
          London
          <br />
          SE23 6FH
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
          72 Guild Street
          <br />
          London
          <br />
          SE23 6FH
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
          72 Guild Street
          <br />
          London
          <br />
          SE23 6FH
        </SummaryListValue>
      </SummaryListRow>,
    ],
  },
};

export const WithCustomLinks: Story = {
  args: {
    children: [
      <SummaryListRow key="1" withBorder label="Name">
        <SummaryListValue>John Smith</SummaryListValue>
        <SummaryListAction asChild>
          <a href="/change">Change</a>
        </SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="2" label="Date of birth">
        <SummaryListValue>8 November 1982</SummaryListValue>
        <SummaryListAction asChild>
          <a href="/change">Change</a>
        </SummaryListAction>
      </SummaryListRow>,
      <SummaryListRow key="3" withBorder label="Address">
        <SummaryListValue>
          72 Guild Street
          <br />
          London
          <br />
          SE23 6FH
        </SummaryListValue>
        <SummaryListAction asChild>
          <a href="/change">Change</a>
        </SummaryListAction>
      </SummaryListRow>,
    ],
  },
};

export const TestRenderWithoutAction: Story = {
  tags: ['skip-playwright'],
  args: {
    children: [
      <SummaryListRow label="Address" key="1">
        <SummaryListValue>
          72 Guild Street
          <br />
          London
          <br />
          SE23 6FH
        </SummaryListValue>
      </SummaryListRow>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render correctly a row without an action', async () => {
      expect(canvas.getByText('Address')).toBeInTheDocument();
      expect(
        canvas.getByText('72 Guild Street', { exact: false }),
      ).toBeInTheDocument();
      expect(canvas.getByText('London', { exact: false })).toBeInTheDocument();
      expect(
        canvas.getByText('SE23 6FH', { exact: false }),
      ).toBeInTheDocument();
    });
  },
};
