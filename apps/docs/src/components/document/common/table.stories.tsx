import { Container, Heading, HeadingSize } from '@govie-react/ds';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, Td, Tr } from './table';
import { TokenName } from './token-name';

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

const samples = [
  {
    id: '1',
    name: 'screen/xs',
    value: 'type-scale/heading/bold/700',
    size: 'md',
  },
  {
    id: '2',
    name: 'screen/md',
    value: 'type-scale/heading/bold/800',
    size: 'lg',
  },
  {
    id: '3',
    name: 'screen/xl',
    value: 'type-scale/heading/bold/900',
    size: 'xl',
  },
];

export const WithSample: Story = {
  args: {
    headers: ['Screen', 'Value', 'Sample'],
    ids: samples.map(({ id }) => id),
    renderRow: (id) => {
      const sample = samples.find((s) => s.id === id);

      if (!sample) {
        throw new Error(`Sample not found for id '${id}'.`);
      }

      return (
        <Tr key={id}>
          <Td>
            <TokenName name={sample.name} />
          </Td>
          <Td>
            <TokenName name={sample.value} />
          </Td>
          <Td>
            <Heading size={sample.size as HeadingSize}>Heading</Heading>
          </Td>
        </Tr>
      );
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-2xl h-full">
        <div className="bg-green-700">Header</div>
        <div className="container mx-auto grow">
          <div className="flex gap-5xl">
            <div>aside</div>
            <div className="flex flex-col grow">
              <Story />
            </div>
          </div>
        </div>
        <div>Footer</div>
      </div>
    ),
  ],
};
