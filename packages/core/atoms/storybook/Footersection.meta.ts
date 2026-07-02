import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import { FooterSectionVariant } from '../FooterSection.lite';
import { checker, enumType } from './utilities';

export const footerSectionMeta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/FooterSection',
  args: {
    variant: FooterSectionVariant.PRIMARY,
    dataTestId: 'footer-section',
    id: 'footer-section-id',
  },
  argTypes: {
    variant: enumType(FooterSectionVariant, {
      description: 'Section background/spacing variant.',
      defaultValue: FooterSectionVariant.PRIMARY,
    }),
    className: {
      control: { disable: true },
      description: 'CSS classes to apply. Use `gi-*` Tailwind utilities.',
      table: { type: { summary: 'string' } },
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
    children: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A themed section within a footer, with primary or utility background variants.',
      },
    },
  },
};

export const Default = {
  args: footerSectionMeta.args,
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await checker(args.dataTestId, canvas, step).is('div');
    await checker(args.dataTestId, canvas, step).attributes({ id: args.id });
  },
};
