import { within } from 'storybook/test';
import type { Props } from '../footer/Footer.lite';
import { checker } from './utilities';
import type { Meta, Story } from './types';

const FOOTER_TESTID = 'footer';

export const meta = {
  title: 'Footer',
  args: {
    ariaLabel: 'footer',
    dataTestId: FOOTER_TESTID,
    id: 'footer-id',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the `<footer>` landmark.',
      table: { type: { summary: 'string' } },
    },
    ariaLabelledBy: {
      control: { disable: true },
      description:
        'Points to the id of an element that labels the footer. Preferred over `ariaLabel` when a visible heading exists. Maps to `aria-labelledby`.',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: { disable: true },
      description: 'CSS classes to apply.',
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
    styles: {
      control: { disable: true },
      description:
        'Inline styles applied directly to the footer element. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'Record<string, string>' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A composable footer built from the `Footer` semantic wrapper, `FooterSection`, and `FooterLogo` components.',
      },
    },
  },
} satisfies Meta<Props>;

export const CompleteFooter = {
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const check = checker(FOOTER_TESTID, canvas, step);
    await check.is('footer');
    await check.attributes({ 'aria-label': args.ariaLabel, id: args.id });
  },
} satisfies Story<Props>;
