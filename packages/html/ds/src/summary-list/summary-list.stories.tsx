import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createSummaryList } from '../helpers/summary-list';
import type { SummaryListProps } from './summary-list.schema';

const meta: Meta<SummaryListProps> = {
  title: 'typography/SummaryList',
  parameters: {
    docs: {
      description: {
        component:
          'Use the summary list to summarize information, for example, a user’s responses at the end of a form.',
      },
    },
  },
  argTypes: {
    header: {
      description:
        'Optional header with label and actions rendered in the table head.',
    },
    rows: {
      description:
        'Array of rows. Each row has a label, value (HTML allowed), optional actions, and optional `withBorder`.',
    },
    dataTestid: {
      description: 'Test id forwarded to the wrapper.',
    },
  },
};
export default meta;

type Story = StoryObj<SummaryListProps>;

const renderDom = (props: SummaryListProps) => {
  const node = createSummaryList(props);
  return parse(node.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  render: (props) => renderDom(props),
  args: {
    header: {
      label: 'Summary card heading',
      actions: [{ href: '/action', label: 'Action 1' }],
    },
    rows: [
      {
        label: 'Ac amet',
        value:
          'Id euismod risus sit phasellus sit urna tincidunt laoreet. Elit volutpat sit facilisi.',
        withBorder: true,
      },
      {
        label: 'Felis natoque',
        value: 'Est senectus nisl vestibulum ipsum. Aliquet cursus orci.',
        actions: [
          { href: '/action', label: 'Action 1' },
          { href: '/action', label: 'Action 2' },
        ],
        withBorder: true,
      },
      {
        label: 'Ac viverra',
        value: 'In nulla id non sit commodo. Turpis duis netus leo sem.',
        actions: [
          { href: '/action', label: 'Action 1' },
          { href: '/action', label: 'Action 2' },
        ],
      },
    ],
  },
};

export const WithMixedActions: Story = {
  render: (props) => renderDom(props),
  args: {
    rows: [
      {
        label: 'Ac amet',
        value:
          'Id euismod risus sit phasellus sit urna tincidunt laoreet. Elit volutpat sit facilisi.',
        withBorder: true,
      },
      {
        label: 'Felis natoque',
        value: 'Est senectus nisl vestibulum ipsum. Aliquet cursus orci.',
        actions: [
          { href: '/action', label: 'Action 1' },
          { href: '/action', label: 'Action 2' },
        ],
        withBorder: true,
      },
      {
        label: 'Ac viverra',
        value: 'In nulla id non sit commodo. Turpis duis netus leo sem.',
        actions: [{ href: '/action', label: 'Action 1' }],
        withBorder: true,
      },
    ],
  },
};

export const WithNoActions: Story = {
  render: (props) => renderDom(props),
  args: {
    rows: [
      {
        label: 'Ac amet',
        value:
          'Id euismod risus sit phasellus sit urna tincidunt laoreet. Elit volutpat sit facilisi.',
        withBorder: true,
      },
      {
        label: 'Felis natoque',
        value: 'Est senectus nisl vestibulum ipsum. Aliquet cursus orci.',
        withBorder: true,
      },
      {
        label: 'Ac viverra',
        value: 'In nulla id non sit commodo. Turpis duis netus leo sem.',
        withBorder: true,
      },
    ],
  },
};

export const WithMixedBorders: Story = {
  render: (props) => renderDom(props),
  args: {
    rows: [
      {
        label: 'Ac amet',
        value:
          'Id euismod risus sit phasellus sit urna tincidunt laoreet. Elit volutpat sit facilisi.',
        withBorder: true,
      },
      {
        label: 'Felis natoque',
        value: 'Est senectus nisl vestibulum ipsum. Aliquet cursus orci.',
        withBorder: false,
      },
      {
        label: 'Ac viverra',
        value: 'In nulla id non sit commodo. Turpis duis netus leo sem.',
        withBorder: true,
      },
    ],
  },
};
