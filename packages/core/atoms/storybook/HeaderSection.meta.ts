import pick from 'lodash/pick';
import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import { SurfaceVariant, SurfaceAppearance } from '../constants';
import { boxMeta } from './Box.meta';
import { containerMeta } from './Container.meta';
import { checker, enumType } from './utilities';

export const headerSectionMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Header/HeaderSection',
  args: {
    children: 'Header section content',
    variant: SurfaceVariant.PRIMARY,
    appearance: SurfaceAppearance.DEFAULT,
    dataTestId: 'header-section',
    id: 'header-section-id',
  },
  argTypes: {
    ...pick(boxMeta.argTypes, ['className', 'id', 'dataTestId', 'styles', 'children', 'ariaLabel']),
    variant: enumType(SurfaceVariant, {
      description: 'Section layout/background variant. `utility` is hidden below the `lg` breakpoint.',
      defaultValue: SurfaceVariant.PRIMARY,
    }),
    appearance: enumType(SurfaceAppearance, {
      description: 'Theme appearance for the section surface.',
      defaultValue: SurfaceAppearance.DEFAULT,
    }),
    maxWidth: containerMeta.argTypes.maxWidth,
    role: {
      control: { disable: true },
      description: 'Optional landmark role for the section wrapper. Maps to `role`.',
      table: { type: { summary: "'region' | 'group'" } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A themed band within a header. Compose with HeaderLogo, HeaderTitle, HeaderNav, and nav item atoms. Use `primary` for the main bar and `utility` for the secondary top bar.',
      },
    },
  },
};

export const Default = {
  args: headerSectionMeta.args,
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('div');
    await check.attributes({ id: args.id });
    await check.children();
  },
};

export const Utility = {
  args: {
    ...headerSectionMeta.args,
    variant: SurfaceVariant.UTILITY,
    dataTestId: 'header-section-utility',
    id: 'header-section-utility-id',
  },
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('div');
    await check.attributes({ id: args.id });
    await check.children();
  },
};
