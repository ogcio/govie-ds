import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Link } from '../link/link.js';
import { List, ListTypeEnum } from './list.js';

const meta = {
  title: 'typography/List',
  parameters: {
    docs: {
      description: {
        component:
          'Use lists to make blocks of text easier to read, and to break information into manageable chunks.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      type: { name: 'string', required: true },
      description: 'List of texts to be displayed',
      defaultValue: ['Item 1', 'Item 2', 'Item 3'],
    },
    type: {
      options: [ListTypeEnum.None, ListTypeEnum.Bullet, ListTypeEnum.Number],
      control: { type: 'radio' },
      table: { defaultValue: { summary: 'normal' } },
      description:
        '`bullet`: Introduce bulleted lists with a lead-in line ending in a colon.<br>`number`: Use numbered lists instead of bulleted lists when the order of the items is relevant.',
    },
    spaced: {
      control: 'boolean',
      description:
        'If a list is hard to read because the items run across multiple lines you can add extra spacing.',
    },
  },
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dataTestid: 'list',
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render a list correctly with items', async () => {
      const listElement = canvas.getByRole('list');
      expect(listElement).toBeInTheDocument();
      expect(canvas.getByText('Item 1')).toBeInTheDocument();
      expect(canvas.getByText('Item 2')).toBeInTheDocument();
      expect(canvas.getByText('Item 3')).toBeInTheDocument();
    });

    await step(
      'should have correct className for default type "normal"',
      async () => {
        const listContainerElement = canvas.getByTestId('list');
        expect(listContainerElement.classList.contains('gi-list')).toBe(true);
      },
    );
  },
};

export const Links: Story = {
  args: {
    dataTestid: 'list',
    items: [
      <Link href="#">Link 1</Link>,
      <Link href="#">Link 2</Link>,
      <Link href="#">Link 3</Link>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render a list of links correctly', async () => {
      const listElement = canvas.getByRole('list');
      expect(listElement).toBeInTheDocument();

      const linkElements = canvas.getAllByRole('link');
      for (const linkElement of linkElements) {
        const linkHref = linkElement.getAttribute('href');
        expect(linkHref).toEqual('#');
      }
      expect(linkElements.length).toBe(3);
    });
  },
};

export const Bullet: Story = {
  args: {
    dataTestid: 'list',
    type: ListTypeEnum.Bullet,
    items: ['apple', 'orange', 'pears'],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should have correct className when type is "bullet"',
      async () => {
        const listContainerElement = canvas.getByTestId('list');
        expect(listContainerElement.classList.contains('gi-list-bullet')).toBe(
          true,
        );
      },
    );
  },
};

export const Numbered: Story = {
  args: {
    dataTestid: 'list',
    type: ListTypeEnum.Number,
    items: ['Delivery address', 'Payment', 'Confirmation'],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should have correct className when type is "number"',
      async () => {
        const listContainerElement = canvas.getByTestId('list');
        expect(listContainerElement.classList.contains('gi-list-number')).toBe(
          true,
        );
      },
    );
  },
};

export const ExtraSpace: Story = {
  args: {
    dataTestid: 'list',
    type: ListTypeEnum.Number,
    spaced: true,
    items: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
      'Curabitur ac felis arcu. Sed vehicula risus nec ligula tempor, vel euismod augue consectetur.',
      'Fusce tincidunt mi ac augue ultricies, id cursus libero dapibus. Phasellus a urna eget justo.',
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should have correct className when is "spaced"', async () => {
      const listContainerElement = canvas.getByTestId('list');
      expect(listContainerElement.classList.contains('gi-list-spaced')).toBe(
        true,
      );
    });
  },
};

export const TestTypeNone: Story = {
  tags: ['skip-playwright'],
  args: {
    dataTestid: 'list',
    type: ListTypeEnum.None,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should have correct className when type is "none"',
      async () => {
        const listContainerElement = canvas.getByTestId('list');
        expect(listContainerElement.classList.contains('gi-list')).toBe(true);
      },
    );
  },
};

export const TestSpacedBullet: Story = {
  tags: ['skip-playwright'],
  args: {
    dataTestid: 'list',
    type: ListTypeEnum.Bullet,
    spaced: true,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should have correct "spaced" class combined with the "type" class',
      async () => {
        const listContainerElement = canvas.getByTestId('list');
        expect(listContainerElement.classList.contains('gi-list-spaced')).toBe(
          true,
        );
        expect(listContainerElement.classList.contains('gi-list-bullet')).toBe(
          true,
        );
      },
    );
  },
};
