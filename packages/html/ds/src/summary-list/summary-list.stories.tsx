import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createSummaryList } from '../helpers/summary-list';
import { SummaryListProps } from './summary-list.schema';

const meta: Meta<SummaryListProps> = {
  title: 'Typography/SummaryList',
  parameters: {
    docs: {
      description: {
        component:
          'Use the summary list to summarize information, for example, a user’s responses at the end of a form.',
      },
    },
  },
  argTypes: {
    rows: {
      description:
        'An array of row objects to render. Each row contains a label, value, optional action (e.g., change link), and an optional border toggle (`withBorder`).',
    },
  },
};

export default meta;
type Story = StoryObj<SummaryListProps>;

const createElement = (arguments_: SummaryListProps) => {
  const component = createSummaryList(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
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
