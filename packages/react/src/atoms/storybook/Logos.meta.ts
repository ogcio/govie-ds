import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import type { BaseSVGProps } from '../icons/types';
export const logosMeta = {
  tags: ['autodocs'] as string[],
  title: 'Foundation/Logos',
  args: {
    label: ''
  },
  argTypes: {
    size: {
      control: 'number',
      description: 'Size of the Logo in pixels.'
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names.'
    },
    label: {
      control: 'text',
      description: 'Accessible label. When set, renders `role="img"` and `aria-label`. When empty, the icon is hidden from assistive technology via `aria-hidden`.'
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
    await step('renders Logo Black', async () => {
      expect(canvas.getByTestId('logo-black')).toBeInTheDocument();
    });
    await step('renders Logo Gold Green', async () => {
      expect(canvas.getByTestId('logo-gold-green')).toBeInTheDocument();
    });
    await step('renders Logo White', async () => {
      expect(canvas.getByTestId('logo-white')).toBeInTheDocument();
    });
    await step('renders Logo Harp Black', async () => {
      expect(canvas.getByTestId('logo-harp-black')).toBeInTheDocument();
    });
    await step('renders Logo Harp White', async () => {
      expect(canvas.getByTestId('logo-harp-white')).toBeInTheDocument();
    });
    await step('renders Logo Gold White', async () => {
      expect(canvas.getByTestId('logo-gold-white')).toBeInTheDocument();
    });
  }
}