import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import { MaxWidth } from '../Container.lite';
import { checker, enumType } from './utilities';
import { boxMeta } from './Box.meta';

export const containerMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Container',
  args: {
    children: 'Paragraph',
    gutters: true,
    inset: false,
    maxWidth: MaxWidth.full,
    dataTestId: 'container',
  },
  argTypes: {
    ...boxMeta.argTypes,
    inset: {
      control: 'boolean',
      description: 'When `true`, applies default vertical inset padding (responsive `py` scale). Default is `false`.',
      table: { type: { summary: 'boolean' } },
    },
    gutters: {
      control: 'boolean',
      description: 'When `true`, applies horizontal gutter padding (responsive `px` scale). Default is `true`.',
      table: { type: { summary: 'boolean' } },
    },
    maxWidth: enumType(MaxWidth, {
      description: 'Caps the container max width: `sm`, `md`, `lg`, `xl`, `2xl`,`full`, or `default`.',
      defaultValue: MaxWidth.default,
      table: { type: { summary: 'string' } },
    }),
  } as const,
  parameters: {
    docs: {
      description: {
        component:
          'Container component, with responsive vertical inset padding and horizontal gutter padding, and configurable max width.',
      },
    },
    controls: {
      exclude: ['insetTop', 'insetBottom', 'gutterSize', 'gutterSizes', 'fullWidth'],
    },
  },
};

export const Default = {
  args: {
    ...containerMeta.args,
    role: 'region' as const,
    ariaLabel: 'Main content',
    id: 'container-id',
  },
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.attributes({ 'aria-label': args.ariaLabel, role: args.role, id: args.id });
    await check.children();
  },
};

export const WithInset = {
  args: {
    children: 'Paragraph',
    inset: true,
  },
};

export const GuttersOnAndOff = {};

export const AllMaxWidths = {};
