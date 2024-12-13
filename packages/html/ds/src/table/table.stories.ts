import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './table.html?raw';
import { TableProps } from './table.schema';

const macro = { name: 'govieTable', html };
const Table = renderComponent<TableProps>(macro);

const meta = {
  component: Table,
  title: 'components/Table',
  parameters: {
    macro,
    docs: {
      description: {
        component: `A flexible table component that supports dynamic rows, headers, and custom captions.
          Each cell can include various interactive elements like checkboxes, buttons, and tags.`,
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    captionText: 'Default Table Example',
    headers: ['Name', 'Email', 'Role'],
    rows: [
      ['John Doe', 'john.doe@example.com', 'Admin'],
      ['Jane Smith', 'jane.smith@example.com', 'User'],
      ['Sam Lee', 'sam.lee@example.com', 'Editor'],
    ],
  },
};

export const WithInteractiveElements: Story = {
  args: {
    captionText: 'Table with Interactive Elements',
    headers: ['Item', 'Quantity', 'Action'],
    rows: [
      [
        'Apple',
        '5',
        '<button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">Edit</button>',
      ],
      [
        'Banana',
        '10',
        '<button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">Edit</button>',
      ],
      [
        'Cherry',
        '20',
        '<button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">Edit</button>',
      ],
    ],
  },
};

export const NoHeaders: Story = {
  args: {
    captionText: 'Table Without Headers',
    rows: [
      ['Row 1, Cell 1', 'Row 1, Cell 2', 'Row 1, Cell 3'],
      ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
      ['Row 3, Cell 1', 'Row 3, Cell 2', 'Row 3, Cell 3'],
    ],
  },
};

export const EmptyTable: Story = {
  args: {
    captionText: 'Empty Table Example',
    headers: ['Item', 'Quantity', 'Action'],
    rows: [],
  },
};
