import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import { Orientation } from '../constants';
import { checker, enumType } from './utilities';

export const dividerMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Divider',
  args: {
    orientation: Orientation.HORIZONTAL,
    inset: false,
    id: 'divider-example',
    dataTestId: 'divider-test',
  },
  argTypes: {
    orientation: enumType(Orientation, {
      description: 'Axis along which the divider draws its line.',
      defaultValue: Orientation.HORIZONTAL,
    }),
    inset: {
      control: { type: 'boolean' as const },
      description: 'When true, the divider is proportionally indented from the edges of its container.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: { disable: true },
      description: 'CSS classes to apply. Use `gi-*` Tailwind utilities.',
      table: { type: { summary: 'string' } },
    },
    styles: {
      control: { disable: true },
      description:
        'Inline styles applied directly to the element. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'Record<string, string>' } },
    },
    id: {
      control: { disable: true },
      description: 'Optional id for linking/targeting and aria references.',
      table: { type: { summary: 'string' } },
    },
    dataTestId: {
      control: { disable: true },
      description: 'Test id for targeting the element in automated tests.',
      table: { type: { summary: 'string' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Divider is a visual separator rendered as a native `<hr>`. It has no margin — spacing is controlled by the parent layout (gap, padding). Supports horizontal and vertical orientations and an optional edge inset.',
      },
    },
  },
};

export const Default = {
  args: {
    ...dividerMeta.args,
  },
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker('divider-test', canvas, step);

    await check.attributes({ id: 'divider-example' });

    await step('renders as native <hr> with separator role', async () => {
      const element = canvas.getByRole('separator');
      expect(element.tagName.toLowerCase()).toBe('hr');
    });

    await step('has no accessible name', async () => {
      const element = canvas.getByRole('separator');
      expect(element).not.toHaveAccessibleName();
    });

    await step('is not focusable', async () => {
      const element = canvas.getByRole('separator');
      expect(element).not.toHaveAttribute('tabindex');
    });

    await step('does not set aria-orientation for horizontal default', async () => {
      const element = canvas.getByRole('separator');
      expect(element).not.toHaveAttribute('aria-orientation');
    });
  },
};

export const Vertical = {
  args: {
    ...dividerMeta.args,
    orientation: Orientation.VERTICAL,
    dataTestId: 'divider-vertical-test',
  },
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker('divider-vertical-test', canvas, step);

    await check.attributes({ 'aria-orientation': Orientation.VERTICAL });

    await step('renders as native <hr> with separator role', async () => {
      const element = canvas.getByRole('separator');
      expect(element.tagName.toLowerCase()).toBe('hr');
    });

    await step('has no accessible name', async () => {
      const element = canvas.getByRole('separator');
      expect(element).not.toHaveAccessibleName();
    });

    await step('is not focusable', async () => {
      const element = canvas.getByRole('separator');
      expect(element).not.toHaveAttribute('tabindex');
    });
  },
};

export const Inset = {
  args: {
    ...dividerMeta.args,
    inset: true,
    dataTestId: 'divider-inset-test',
  },
};
