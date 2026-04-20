import type { StoryContext, Renderer } from 'storybook/internal/types';
import { createElement } from 'react';
import { within, expect } from 'storybook/test';
import { ContainerInsetSizeEnum, ContainerMaxWidthEnum } from '../Container';
export const containerMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Container',
  args: {
    children: 'Paragraph'
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'HTML content or other components to be rendered inside the container.'
    },
    insetTop: {
      control: {
        type: 'select'
      },
      options: Object.values(ContainerInsetSizeEnum),
      description: 'Defines the top padding of the container. Options are `none`, `md`, `lg`, and `xl`.'
    },
    insetBottom: {
      control: {
        type: 'select'
      },
      options: Object.values(ContainerInsetSizeEnum),
      description: 'Defines the bottom padding of the container. Options are `none`, `md`, `lg`, and `xl`.'
    },
    gutterSize: {
      control: {
        type: 'select'
      },
      options: Object.values(ContainerInsetSizeEnum),
      description: 'Defines the horizontal gutter (padding) of the container. Options are `none`, `md`, `lg`, and `xl`.'
    },
    maxWidth: {
      control: {
        type: 'select'
      },
      options: Object.values(ContainerMaxWidthEnum),
      description: 'Caps the container max width. Options are `sm`, `md`, `lg`, `xl`, or `full` (no cap).'
    }
  } as const,
  parameters: {
    docs: {
      description: {
        component: 'Container component when you need a centralised, consistent layout wrapper for content on your webpage.'
      }
    }
  }
};
export const Default = {
  args: containerMeta.args,
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('should apply the correct container classes', async () => {
      const containerElement = canvas.getByTestId('govie-container');
      expect(containerElement).toBeInTheDocument();
      expect(containerElement.className).toContain('gi-w-full');
    });
  }
};
export const WithNoneInset = {
  args: {
    children: 'Paragraph',
    insetBottom: ContainerInsetSizeEnum.None,
    insetTop: ContainerInsetSizeEnum.None
  }
};
export const WithMediumInset = {
  args: {
    children: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.Medium,
    insetBottom: ContainerInsetSizeEnum.Medium
  }
};
export const WithLargeInset = {
  args: {
    children: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.Large,
    insetBottom: ContainerInsetSizeEnum.Large
  }
};
export const WithExtraLargeInset = {
  args: {
    children: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.ExtraLarge,
    insetBottom: ContainerInsetSizeEnum.ExtraLarge
  }
};
export const TestRenderIndentedHTMLContent = {
  tags: ['skip-playwright'],
  args: {
    children: createElement('p', null, 'Indented content')
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('should correctly handle and render indented HTML content', async () => {
      const containerElement = canvas.getByTestId('govie-container');
      const paragraphElement = canvas.getByText('Indented content');
      expect(containerElement).toBeInTheDocument();
      expect(paragraphElement).toBeInTheDocument();
      expect((paragraphElement as HTMLElement).tagName).toBe('P');
    });
  }
};
export const TestSafelyRenderHTMLContent = {
  tags: ['skip-playwright'],
  args: {
    children: createElement('p', null, createElement('script', null, "alert('XSS')"), 'Safe content')
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('should safely render HTML content', async () => {
      const containerElement = canvas.getByTestId('govie-container');
      const paragraphElement = canvas.getByText('Safe content');
      expect(containerElement).toBeInTheDocument();
      expect(paragraphElement).toBeInTheDocument();
      expect((paragraphElement as HTMLElement).innerHTML).toContain('Safe content');
    });
  }
};
export const TestHandleEmptyContentGracefully = {
  tags: ['skip-playwright'],
  args: {
    children: ''
  },
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('should handle empty content gracefully', async () => {
      const containerElement = canvas.getByTestId('govie-container');
      expect(containerElement).toBeInTheDocument();
      expect(containerElement.textContent).toBe('');
    });
  }
};
export const AllGutterSizes = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders one container per gutter size', async () => {
      const elements = canvas.getAllByTestId('govie-container');
      expect(elements).toHaveLength(Object.values(ContainerInsetSizeEnum).length);
      for (const gutter of Object.values(ContainerInsetSizeEnum)) {
        const match = elements.find(el => el.getAttribute('data-gutter-size') === gutter);
        expect(match).toBeTruthy();
      }
    });
  }
};
export const AllMaxWidths = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders one container per max width', async () => {
      const elements = canvas.getAllByTestId('govie-container');
      expect(elements).toHaveLength(Object.values(ContainerMaxWidthEnum).length);
      for (const maxWidth of Object.values(ContainerMaxWidthEnum)) {
        const match = elements.find(el => el.getAttribute('data-max-width') === maxWidth);
        expect(match).toBeTruthy();
      }
    });
  }
}