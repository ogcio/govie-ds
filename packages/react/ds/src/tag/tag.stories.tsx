import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { Tag, TagTypeEnum } from './tag.js';

const meta = {
  title: 'Typography/Tag',
  parameters: {
    docs: {
      description: {
        component:
          'Tag component used to display a small label or status indicator. The type of the tag changes its color, and the text is used to display a label.',
      },
    },
  },
  component: Tag,
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    text: {
      control: 'text',
      description:
        'The text displayed inside the tag. This is the content of the tag, typically a status or label.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Completed' },
        category: 'Content',
      },
      type: { name: 'string', required: true },
    },
    type: {
      control: {
        type: 'select',
      },
      options: Object.values(TagTypeEnum),
      description:
        'Defines the visual style and color of the tag. Select from predefined options like default, grey, green, blue, etc.',
      table: {
        type: { summary: 'TagType' },
        defaultValue: { summary: 'blue' },
        category: 'Appearance',
      },
    },
  },
  args: {
    text: 'Completed',
    type: TagTypeEnum.Info,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render a tag with the correct content', async () => {
      const element = canvas.getByText('Completed');
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('STRONG');
    });
  },
};

export const Info: Story = {
  args: {
    text: 'Info Tag',
    type: TagTypeEnum.Info,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should have the correct class for Info', async () => {
      const element = canvas.getByText('Info Tag');
      expect(element.classList.contains('gi-tag-info')).toBe(true);
    });
  },
};

export const Success: Story = {
  args: {
    text: 'Success Tag',
    type: TagTypeEnum.Success,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should have the correct class for Success', async () => {
      const element = canvas.getByText('Success Tag');
      expect(element.classList.contains('gi-tag-success')).toBe(true);
    });
  },
};

export const Warning: Story = {
  args: {
    text: 'Warning Tag',
    type: TagTypeEnum.Warning,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should have the correct class for Warning', async () => {
      const element = canvas.getByText('Warning Tag');
      expect(element.classList.contains('gi-tag-warning')).toBe(true);
    });
  },
};

export const Error: Story = {
  args: {
    text: 'Error Tag',
    type: TagTypeEnum.Error,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should have the correct class for Error', async () => {
      const element = canvas.getByText('Error Tag');
      expect(element.classList.contains('gi-tag-error')).toBe(true);
    });
  },
};

export const Counter: Story = {
  args: {
    text: '13',
    type: TagTypeEnum.Counter,
  },
};

export const CounterWarning: Story = {
  args: {
    text: '13',
    type: TagTypeEnum.CounterWarning,
  },
};
