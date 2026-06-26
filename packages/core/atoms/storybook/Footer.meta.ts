import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import { FooterSectionVariant } from '../FooterSection.lite';
import { checker, enumType } from './utilities';

export const footerMeta = {
  tags: ['autodocs'] as string[],
  title: 'Footer',
  args: {
    footer: {
      ariaLabel: 'Footer',
      id: 'footer-id',
      dataTestId: 'footer',
    },
    section: {
      variant: FooterSectionVariant.PRIMARY,
      dataTestId: 'footer-section-primary',
    },
    logo: {
      dataTestId: 'footer-logo',
    },
    showUtilitySection: true,
    utilitySection: {
      dataTestId: 'footer-section-utility',
    },
  },
  argTypes: {
    // Footer
    'footer.ariaLabel': {
      control: 'text',
      description: 'Accessible name for the `<footer>` landmark.',
      table: { category: 'Footer', type: { summary: 'string' } },
    },
    'footer.id': { control: false, table: { category: 'Footer', type: { summary: 'string' } } },
    'footer.dataTestId': { control: false, table: { category: 'Footer', type: { summary: 'string' } } },
    'footer.styles': { control: false, table: { category: 'Footer', type: { summary: 'object' } } },

    // FooterSection
    'section.variant': enumType(FooterSectionVariant, {
      description: 'Section background/spacing variant.',
      defaultValue: FooterSectionVariant.PRIMARY,
      table: { category: 'FooterSection' },
    }),
    'section.dataTestId': { control: false, table: { category: 'FooterSection', type: { summary: 'string' } } },
    // FooterLogo
    'logo.dataTestId': { control: false, table: { category: 'FooterLogo', type: { summary: 'string' } } },
    showUtilitySection: {
      control: 'boolean',
      table: { category: 'Composition' },
    },
  } as const,
  parameters: {
    docs: {
      description: {
        component: 'A composable footer built from `Footer`, `FooterSection`, and `FooterLogo`.',
      },
    },
  },
};

export const Default = {
  args: footerMeta.args,
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('footer');
    await check.attributes({ 'aria-label': args.ariaLabel, id: args.id });
    await checker(args.sectionDataTestId, canvas, step).is('div');
    await checker(args.logoDataTestId, canvas, step).is('div');
  },
};
