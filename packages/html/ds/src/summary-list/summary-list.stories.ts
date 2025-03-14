import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { beautifyHtmlNode } from '../storybook/storybook';
import { SummaryListProps } from './summary-list.schema';

const meta: Meta<SummaryListProps> = {
  title: 'Typography/SummaryList',
};

export default meta;
type Story = StoryObj<SummaryListProps>;

const createSummaryList = (arguments_: SummaryListProps) => {
  const container = document.createElement('div');

  const component = document.createElement('div');
  component.className = 'gi-summary-list';
  component.dataset.testid = arguments_.dataTestid ?? 'paragraph';

  for (const row of arguments_.rows) {
    const rowItem = document.createElement('dl');
    rowItem.className = 'gi-summary-list-row';
    if (row.withBorder) {
      rowItem.dataset.border = 'true';
    }

    const dt = document.createElement('dt');
    dt.textContent = row.label;
    rowItem.append(dt);

    if (row.value) {
      const dd = document.createElement('dd');
      dd.innerHTML = row.value;
      dd.className = 'gi-summary-list-value';

      rowItem.append(dd);
    }

    if (row.action) {
      const dd = document.createElement('dd');
      dd.innerHTML =
        '<a href="' +
        row.action.href +
        '" class="gi-link">' +
        row.action.label +
        '</a>';
      dd.className = 'gi-summary-list-actions';

      rowItem.append(dd);
    }

    component.append(rowItem);
  }

  container.append(component);

  return beautifyHtmlNode(container);
};

export const Default: Story = {
  render: (arguments_) => createSummaryList(arguments_),
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
        value: '72 Guild Street <br/> London <br/> SE23 6FH',
        action: { href: '/change', label: 'Change' },
        withBorder: true,
      },
      {
        label: 'Contact details',
        value: '07700 864523 <br/> john.smith@example.com',
        action: { href: '/change', label: 'Change' },
        withBorder: true,
      },
    ],
  },
};

export const WithMixedBorders: Story = {
  render: (arguments_) => createSummaryList(arguments_),
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
        value: '72 Guild Street <br/> London <br/> SE23 6FH',
        action: { href: '/change', label: 'Change' },
        withBorder: true,
      },
    ],
  },
};

export const WithMixedActions: Story = {
  render: (arguments_) => createSummaryList(arguments_),
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
        value: '72 Guild Street <br/> London <br/> SE23 6FH',
        action: { href: '/change', label: 'Change' },
        withBorder: true,
      },
    ],
  },
};

export const WithoutBorders: Story = {
  render: (arguments_) => createSummaryList(arguments_),
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
        value: '72 Guild Street <br/> London <br/> SE23 6FH',
      },
    ],
  },
};
