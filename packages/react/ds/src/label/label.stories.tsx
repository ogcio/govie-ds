import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Icon } from '../icon/icon.js';
import { Link } from '../link/link.js';
import { Label, LabelSize } from './label.js';

const meta = {
  title: 'Typography/Label',
  parameters: {
    docs: {
      description: {
        component:
          'A Label component to wrap label text and associate it with a form input element.',
      },
    },
  },
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    text: {
      control: 'text',
      description: 'Text content of the label',
      table: {
        category: 'Content',
        type: { summary: 'text for label' },
        defaultValue: { summary: 'Label' },
      },
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form input',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    size: {
      control: 'radio',
      options: Object.values(LabelSize),
      description: 'Label size: small, medium, or large',
      table: {
        category: 'Appearance',
        type: { summary: 'Size of label' },
        defaultValue: { summary: LabelSize.Medium },
      },
    },
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLLabelElement>' },
        defaultValue: { summary: '-' },
      },
    },
  },
  args: {
    htmlFor: 'input-id',
    size: LabelSize.Medium,
    text: 'Label',
  },
};

export const Small: Story = {
  args: {
    size: LabelSize.Small,
    text: 'This is label text',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should have the correct size class for "sm"', async () => {
      const labelElement = canvas.getByText('This is label text');
      expect(labelElement).toHaveClass('gi-text-sm');
    });
  },
};

export const Medium: Story = {
  args: {
    size: LabelSize.Medium,
    text: 'This is label text',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should have the correct size class for "md"', async () => {
      const labelElement = canvas.getByText('This is label text');
      expect(labelElement).toHaveClass('gi-text-md');
    });
  },
};

export const Large: Story = {
  args: {
    size: LabelSize.Large,
    text: 'This is label text',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should have the correct size class for "lg"', async () => {
      const labelElement = canvas.getByText('This is label text');
      expect(labelElement).toHaveClass('gi-text-lg');
    });
  },
};

export const WithRichText: Story = {
  args: {
    size: LabelSize.Medium,
    children: (
      <div className="gi-flex">
        Here is a rich label &nbsp;<Link href="#">Click here </Link>
        <Icon icon="arrow_drop_up" />
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hint = canvas.getByText('Here is a rich label');
    expect(hint).toHaveClass('gi-flex');
  },
};

export const TestCorrectContent: Story = {
  tags: ['skip-playwright'],
  args: {
    text: 'This is a label',
    size: LabelSize.Medium,
    htmlFor: 'input-id',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render a label with the correct content', async () => {
      const labelElement = canvas.getByText('This is a label');
      expect(labelElement).toBeTruthy();
      expect(labelElement.tagName).toBe('LABEL');
      expect(labelElement.getAttribute('for')).toBe('input-id');
    });

    await step(
      'should associate the label with the correct input field using "for"',
      async () => {
        const labelElement = canvas.getByText('This is a label');
        expect(labelElement.getAttribute('for')).toBe('input-id');
      },
    );
  },
};
