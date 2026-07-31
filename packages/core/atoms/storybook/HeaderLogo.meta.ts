import pick from 'lodash/pick';
import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import { boxMeta } from './Box.meta';
import { checker } from './utilities';

export const headerLogoMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Header/HeaderLogo',
  args: {
    id: 'header-logo-id',
    dataTestId: 'header-logo',
  },
  argTypes: {
    ...pick(boxMeta.argTypes, ['className', 'id', 'dataTestId', 'styles', 'children']),
  },
  parameters: {
    docs: {
      description: {
        component: 'Container for the site logo within a header layout.',
      },
    },
  },
};

export const Default = {
  args: headerLogoMeta.args,
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('div');
    await check.attributes({ id: args.id });
    await check.children();
  },
};
