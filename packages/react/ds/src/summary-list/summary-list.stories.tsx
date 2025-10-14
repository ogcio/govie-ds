import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { SummaryListAction } from './summary-list-action.js';
import { SummaryListHeader } from './summary-list-header.js';
import { SummaryListRow } from './summary-list-row.js';
import { SummaryListValue } from './summary-list-value.js';
import { SummaryList } from './summary-list.js';

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
        'An array of `SummaryListRow` components, each representing a row in the summary list. Each row includes `SummaryListValue`, and/or `SummaryListAction`. Also `SummaryListHeader` that represents the header with actions for the SummaryList',
    },
  },
} satisfies Meta<typeof SummaryList>;

export default meta;

export const Default: StoryObj = {
  render: () => {
    return (
      <SummaryList withBorder>
        <SummaryListHeader label="Summary card heading">
          <SummaryListAction href="/action">Action 1</SummaryListAction>
        </SummaryListHeader>
        <SummaryListRow withBorder label="Ac amet">
          <SummaryListValue>
            Id euismod risus sit phasellus sit urna tincidunt laoreet. Elit
            volutpat sit facilisi.
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow withBorder label="Felis natoque">
          <SummaryListValue>
            Est senectus nisl vestibulum ipsum. Aliquet cursus orci.
          </SummaryListValue>
          <SummaryListAction href="/action">Action 1</SummaryListAction>
          <SummaryListAction href="/action">Action 2</SummaryListAction>
        </SummaryListRow>
        <SummaryListRow label="Ac viverra">
          <SummaryListValue>
            In nulla id non sit commodo. Turpis duis netus leo sem.
          </SummaryListValue>
          <SummaryListAction href="/action">Action 1</SummaryListAction>
          <SummaryListAction href="/action">Action 2</SummaryListAction>
        </SummaryListRow>
      </SummaryList>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const heading = await canvas.findByText('Summary card heading');
    expect(heading).toBeVisible();

    const rows = canvas.getAllByRole('row');
    expect(rows.length).toBeGreaterThanOrEqual(4);

    const rowHeaders = canvas.getAllByRole('rowheader');
    expect(rowHeaders.length).toBe(3);
    expect(rowHeaders[0]).toHaveTextContent('Ac amet');
    expect(rowHeaders[1]).toHaveTextContent('Felis natoque');
    expect(rowHeaders[2]).toHaveTextContent('Ac viverra');

    const actionLinks = canvas.getAllByRole('link', { name: /Action/ });
    expect(actionLinks.length).toBeGreaterThanOrEqual(3);
    for (const link of actionLinks) {
      expect(link).toHaveAttribute('href', '/action');
    }
    const valueLabels = canvas.getAllByText('Value', { exact: true });
    expect(valueLabels.length).toBeGreaterThan(0);
  },
};

export const WithMixedActions: StoryObj = {
  render: () => {
    return (
      <SummaryList>
        <SummaryListRow withBorder label="Ac amet">
          <SummaryListValue>
            Id euismod risus sit phasellus sit urna tincidunt laoreet. Elit
            volutpat sit facilisi.
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow withBorder label="Felis natoque">
          <SummaryListValue>
            Est senectus nisl vestibulum ipsum. Aliquet cursus orci.
          </SummaryListValue>
          <SummaryListAction href="/action">Action 1</SummaryListAction>
          <SummaryListAction href="/action">Action 2</SummaryListAction>
        </SummaryListRow>
        <SummaryListRow withBorder label="Ac viverra">
          <SummaryListValue>
            In nulla id non sit commodo. Turpis duis netus leo sem.
          </SummaryListValue>
          <SummaryListAction href="/action">Action 1</SummaryListAction>
        </SummaryListRow>
      </SummaryList>
    );
  },
};

export const WithNoActions: StoryObj = {
  render: () => {
    return (
      <SummaryList>
        <SummaryListRow withBorder label="Ac amet">
          <SummaryListValue>
            Id euismod risus sit phasellus sit urna tincidunt laoreet. Elit
            volutpat sit facilisi.
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow withBorder label="Felis natoque">
          <SummaryListValue>
            Est senectus nisl vestibulum ipsum. Aliquet cursus orci.
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow withBorder label="Ac viverra">
          <SummaryListValue>
            In nulla id non sit commodo. Turpis duis netus leo sem.
          </SummaryListValue>
        </SummaryListRow>
      </SummaryList>
    );
  },
};

export const WithMixedBorders: StoryObj = {
  render: () => {
    return (
      <SummaryList>
        <SummaryListRow withBorder label="Ac amet">
          <SummaryListValue>
            Id euismod risus sit phasellus sit urna tincidunt laoreet. Elit
            volutpat sit facilisi.
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow label="Felis natoque">
          <SummaryListValue>
            Est senectus nisl vestibulum ipsum. Aliquet cursus orci.
          </SummaryListValue>
        </SummaryListRow>
        <SummaryListRow withBorder label="Ac viverra">
          <SummaryListValue>
            In nulla id non sit commodo. Turpis duis netus leo sem.
          </SummaryListValue>
        </SummaryListRow>
      </SummaryList>
    );
  },
};
