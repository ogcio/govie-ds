import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { GovieParagraph as Paragraph } from './components.js';

const meta = {
  title: 'typography/Paragraph',
  component: Paragraph,
  parameters: {
    docs: {
      description: {
        component:
          'Paragraph component used for rendering body text with consistent spacing, font size, and line height.',
      },
    },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The text content of the paragraph.',
    },
    as: {
      control: 'radio',
      options: ['p', 'span'],
      type: { name: 'string', required: false },
      description: 'Specifies the HTML element to render the component as.',
    },
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm'],
      type: { name: 'string', required: false },
      description: 'Specifies the size of the paragraph.',
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'end', 'justify'],
      type: { name: 'string', required: false },
      description: 'Specifies the alignment of the paragraph.',
    },
    whitespace: {
      control: 'radio',
      options: ['normal', 'pre', 'pre-wrap', 'break-spaces'],
      type: { name: 'string', required: false },
      description: 'Specifies the whitespace property.',
    },
  },
  args: {
    dataTestid: 'paragraph',
    children: 'This is a paragraph.',
    as: 'p',
    size: 'md',
    align: 'start',
    whitespace: 'normal',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText('This is a paragraph.');
    expect(paragraph).toHaveClass('gi-paragraph-md');
    expect(paragraph).toHaveClass('gi-text-start');
    expect(paragraph).toHaveClass('gi-whitespace-normal');

    await step(
      'should render a paragraph with the correct content when props.as is "p"',
      async () => {
        const element = canvas.getByText('This is a paragraph.');
        expect(element).toBeTruthy();
        expect(element.tagName).toBe('P');
      },
    );
  },
};

export const RightAlignment: Story = {
  args: {
    dataTestid: 'paragraph',
    children: 'This is a paragraph.',
    as: 'p',
    size: 'md',
    align: 'end',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText('This is a paragraph.');
    expect(paragraph).toHaveClass('gi-paragraph-md');
    expect(paragraph).toHaveClass('gi-text-end');
    expect(paragraph).toHaveClass('gi-whitespace-normal');
  },
};

export const WhitespacePre: Story = {
  args: {
    dataTestid: 'paragraph',
    children: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: 'p',
    whitespace: 'pre',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toHaveClass('gi-whitespace-pre');
  },
};

export const WhitespacePreWrap: Story = {
  args: {
    dataTestid: 'paragraph',
    children: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: 'p',
    whitespace: 'pre-wrap',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toHaveClass('gi-whitespace-pre-wrap');
  },
};

export const WhitespaceBreakSpaces: Story = {
  args: {
    dataTestid: 'paragraph',
    children: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: 'p',
    whitespace: 'break-spaces',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toHaveClass('gi-whitespace-break-spaces');
  },
};

export const AsSpan: Story = {
  args: {
    dataTestid: 'paragraph',
    as: 'span',
    children: 'This is a paragraph',
    size: 'md',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText('This is a paragraph');
    expect(paragraph).toHaveClass('gi-span-md');

    await step(
      'should render a span with the correct content when props.as is "span"',
      async () => {
        const element = canvas.getByText('This is a paragraph');
        expect(element).toBeTruthy();
        expect(element.tagName).toBe('SPAN');
      },
    );
  },
};

export const TestSizeLg: Story = {
  tags: ['skip-playwright'],
  args: {
    as: 'p',
    children: 'Large text',
    size: 'lg',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should have correct text size classes for "lg"', async () => {
      const element = canvas.getByText('Large text');
      expect(element.classList.contains('gi-paragraph-lg')).toBe(true);
    });
  },
};

export const TestSizeMdSpan: Story = {
  tags: ['skip-playwright'],
  args: {
    as: 'span',
    children: 'Medium text',
    size: 'md',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should have correct text size classes for "md"', async () => {
      const element = canvas.getByText('Medium text');
      expect(element.classList.contains('gi-span-md')).toBe(true);
    });
  },
};

export const TestSizeSm: Story = {
  tags: ['skip-playwright'],
  args: {
    as: 'p',
    children: 'Small text',
    size: 'sm',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should have correct text size classes for "sm"', async () => {
      const element = canvas.getByText('Small text');
      expect(element.classList.contains('gi-paragraph-sm')).toBe(true);
    });
  },
};

export const TestAlignEnd: Story = {
  tags: ['skip-playwright'],
  args: {
    as: 'p',
    children: 'Small text',
    align: 'end',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should have aligned end', async () => {
      const element = canvas.getByText('Small text');
      expect(element.classList.contains('gi-text-end')).toBe(true);
    });
  },
};

export const TestRenderHtmlChildren: StoryObj = {
  tags: ['skip-playwright'],
  render: () => (
    <Paragraph as="p" size="sm">
      <a href="#">Anchor tag</a>
    </Paragraph>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should safely render HTML content', async () => {
      const element = canvas.getByText('Anchor tag');
      expect(element).toBeTruthy();
      expect(element.innerHTML).toContain('Anchor tag');
    });
  },
};
