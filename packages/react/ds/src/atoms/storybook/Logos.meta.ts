import type { ArgTypes, StoryContext, Renderer } from '@storybook/types';
import { within, expect } from 'storybook/test';
import type { BaseSVGProps } from '../icons/types';
export const logosMeta = {
  tags: ['autodocs'] as string[],
  title: 'Components/Logos',
  args: {
    label: ''
  },
  argTypes: {
    size: {
      table: {
        disable: true
      }
    },
    className: {
      table: {
        disable: true
      }
    },
    label: {
      control: 'text',
      description: 'Accessible label rendered as `aria-label`. When set, `role="img"` is applied. When empty, the logo is decorative and hidden from assistive technology.'
    }
  } satisfies ArgTypes<BaseSVGProps>,
  parameters: {
    docs: {
      description: {
        component: 'Use the logo component to display the Government of Ireland brand mark.'
      }
    }
  }
};
export const Default = {
  args: logosMeta.args,
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders standard logos', async () => {
      expect(canvas.getByText(/logo[\s-]?black/i)).toBeInTheDocument();
      expect(canvas.getByText(/logo[\s-]?gold[\s-]?green/i)).toBeInTheDocument();
      expect(canvas.getByText(/logo[\s-]?white/i)).toBeInTheDocument();
    });
    await step('renders harp logos', async () => {
      expect(canvas.getByText(/logo[\s-]?harp[\s-]?black/i)).toBeInTheDocument();
      expect(canvas.getByText(/logo[\s-]?harp[\s-]?white/i)).toBeInTheDocument();
    });
    await step('renders gold white logo', async () => {
      expect(canvas.getByText(/logo[\s-]?gold[\s-]?white/i)).toBeInTheDocument();
    });
  }
}