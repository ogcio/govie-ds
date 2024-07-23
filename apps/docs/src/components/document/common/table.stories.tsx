import type { Meta, StoryObj } from '@storybook/react';
import { Table, Td, Tr } from './table';

const meta = {
  title: 'Common/Table',
  component: Table<string>,
} satisfies Meta<typeof Table<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headers: ['Name', 'Value'],
    ids: ['1', '2', '3'],
    renderRow: (id) => (
      <Tr key={id}>
        <Td>Name {id}</Td>
        <Td>Value {id}</Td>
      </Tr>
    ),
  },
};
