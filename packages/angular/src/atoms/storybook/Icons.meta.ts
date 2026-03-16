import type { ArgTypes, StoryContext, Renderer } from '@storybook/types';
import { within, expect } from 'storybook/test';
import type { IconProps } from '../icons/types';
export const iconsMeta = {
  tags: ['autodocs'] as string[],
  title: 'Components/Icons',
  args: {
    size: 48,
    color: 'currentColor',
    label: '',
    className: ''
  },
  argTypes: {
    size: {
      control: 'number',
      description: 'Width and height of the icon in pixels.'
    },
    color: {
      control: 'color',
      description: 'Fill colour — defaults to `currentColor`.'
    },
    label: {
      control: 'text',
      description: 'Accessible label. When set, renders `role="img"` and `aria-label`. When empty, the icon is hidden from assistive technology via `aria-hidden`.'
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names.'
    }
  } satisfies ArgTypes<IconProps>,
  parameters: {
    docs: {
      description: {
        component: 'Use icons to visually reinforce actions, status, and navigation. Icons accept a `size` prop (in pixels), an optional `color`, and a `label` for accessibility.'
      }
    }
  }
};
export const Default = {
  args: iconsMeta.args,
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders Close icon', async () => {
      expect(canvas.getByText(/close/i)).toBeInTheDocument();
    });
    await step('renders Visibility icon', async () => {
      expect(canvas.getByText(/^visibility$/i)).toBeInTheDocument();
    });
    await step('renders Visibility Off icon', async () => {
      expect(canvas.getByText(/visibility[\s-]?off/i)).toBeInTheDocument();
    });
    await step('renders arrow icons', async () => {
      expect(canvas.getByText(/keyboard[\s-]?arrow[\s-]?down/i)).toBeInTheDocument();
      expect(canvas.getByText(/keyboard[\s-]?arrow[\s-]?up/i)).toBeInTheDocument();
    });
  }
}