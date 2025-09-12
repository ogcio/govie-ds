import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { Container, ContainerInsetSizeEnum } from './container.js';

const meta = {
  title: 'Layout/Container',
  parameters: {
    docs: {
      description: {
        component:
          'Container component when you need a centralised, consistent layout wrapper for content on your webpage.',
      },
    },
  },
  component: Container,
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'text',
      description:
        'HTML content or other components to be rendered inside the container.',
    },
    insetTop: {
      control: 'select',
      options: Object.values(ContainerInsetSizeEnum),
      description:
        'Defines the top padding of the container. Options are `none`, `md`, `lg`, and `xl`.',
    },
    insetBottom: {
      control: 'select',
      options: Object.values(ContainerInsetSizeEnum),
      description:
        'Defines the bottom padding of the container. Options are `none`, `md`, `lg`, and `xl`.',
    },
  },
  args: {
    children: `Paragraph`,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should apply the correct container classes', async () => {
      const containerElement = canvas.getByTestId('govie-container');
      expect(containerElement).toBeInTheDocument();
      expect(containerElement.classList.contains('gi-layout-container')).toBe(
        true,
      );
    });
  },
};

export const WithNoneInset: Story = {
  args: {
    children: 'Paragraph',
    insetBottom: ContainerInsetSizeEnum.None,
    insetTop: ContainerInsetSizeEnum.None,
  },
};

export const WithMediumInset: Story = {
  args: {
    children: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.Medium,
    insetBottom: ContainerInsetSizeEnum.Medium,
  },
};

export const WithLargeInset: Story = {
  args: {
    children: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.Large,
    insetBottom: ContainerInsetSizeEnum.Large,
  },
};

export const WithExtraLargeInset: Story = {
  args: {
    children: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.ExtraLarge,
    insetBottom: ContainerInsetSizeEnum.ExtraLarge,
  },
};

export const TestRenderIndentedHTMLContent: Story = {
  tags: ['skip-playwright'],
  args: {
    children: <p>Indented content</p>,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should correctly handle and render indented HTML content',
      async () => {
        const containerElement = canvas.getByTestId('govie-container');
        const paragraphElement = canvas.getByText('Indented content');
        expect(containerElement).toBeInTheDocument();
        expect(paragraphElement).toBeInTheDocument();
        expect((paragraphElement as HTMLElement).tagName).toBe('P');
      },
    );
  },
};

export const TestSafelyRenderHTMLContent: Story = {
  tags: ['skip-playwright'],
  args: {
    children: (
      <p>
        <script>alert('XSS')</script>Safe content
      </p>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should safely render HTML content', async () => {
      const containerElement = canvas.getByTestId('govie-container');
      const paragraphElement = canvas.getByText('Safe content');
      expect(containerElement).toBeInTheDocument();
      expect(paragraphElement).toBeInTheDocument();
      expect((paragraphElement as HTMLElement).innerHTML).toContain(
        'Safe content',
      );
    });
  },
};

export const TestHandleEmptyContentGracefully: Story = {
  tags: ['skip-playwright'],
  args: {
    children: '',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should handle empty content gracefully', async () => {
      const containerElement = canvas.getByTestId('govie-container');
      expect(containerElement).toBeInTheDocument();
      expect(containerElement.textContent).toBe('');
    });
  },
};
