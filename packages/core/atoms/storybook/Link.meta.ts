import type { Renderer, StoryContext } from 'storybook/internal/types';
import { within, expect, userEvent } from 'storybook/test';
import { checker } from './utilities';

export const linkMeta = {
  tags: ['autodocs'] as string[],
  title: 'Navigation/Link',
  args: {
    children: 'Link',
    href: 'https://www.gov.ie',
    id: 'link-example',
    dataTestId: 'link-test',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Link content — text, icons, or any HTML element.',
    },
    href: {
      control: 'text',
      description: 'The URL the link points to. Maps to the HTML href attribute.',
      table: { type: { summary: 'string' } },
    },
    external: {
      control: 'boolean',
      description:
        'Opens the link in a new tab. When true, sets target="_blank" and rel="noreferrer noopener". Explicit target/rel props override these defaults.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    target: {
      control: { disable: true },
      description: 'Browsing context for the link. Overrides the value set by external.',
      table: { type: { summary: "'_self' | '_blank' | '_parent' | '_top'" } },
    },
    rel: {
      control: { disable: true },
      description: 'Link relationship. Overrides the default set by external.',
      table: { type: { summary: 'string' } },
    },
    download: {
      control: { disable: true },
      description:
        'When present, the link triggers a file download instead of navigation. A string value suggests a filename.',
      table: { type: { summary: 'string | boolean' } },
    },
    ariaCurrent: {
      control: { disable: true },
      description:
        'Indicates the current item within a navigation set or process. Use "page" for current-page links in nav, "step" for multi-step flows.',
      table: {
        type: {
          summary: "'page' | 'step' | 'location' | 'date' | 'time' | boolean",
        },
      },
    },
    ariaLabel: {
      control: { disable: true },
      description:
        'Accessible label for the link. Use when the visible text alone does not fully describe the destination. Maps to aria-label.',
      table: { type: { summary: 'string' } },
    },
    ariaLabelledBy: {
      control: { disable: true },
      description:
        'ID of the element that labels this link. Use when a visible heading or label elsewhere in the DOM should serve as the accessible name.',
      table: { type: { summary: 'string' } },
    },
    ariaDescribedBy: {
      control: { disable: true },
      description:
        'ID of the element that describes this link. Use for supplementary information such as file type, size, or "opens in new tab".',
      table: { type: { summary: 'string' } },
    },
    ariaHidden: {
      control: { disable: true },
      description:
        'Hides the link from assistive technology. Use only for duplicate or decorative links that are not the primary interactive path.',
      table: { type: { summary: 'boolean' } },
    },
    tabIndex: {
      control: { disable: true },
      description: 'Overrides the default tab order. Use -1 to remove from tab order in composite widgets.',
      table: { type: { summary: 'number' } },
    },
    lang: {
      control: { disable: true },
      description:
        'Language of the link text, when it differs from the surrounding content. Maps to the HTML lang attribute.',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: { disable: true },
      description: 'CSS classes to apply. Use gi-* Tailwind utilities for additional styling.',
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
    variant: {
      control: 'select',
      options: ['default', 'inline'],
      description:
        'Controls the styling level. "default" renders a bare anchor with no design-system styles. "inline" applies typography, colour, underline, and focus styles.',
      table: {
        type: { summary: "'default' | 'inline'" },
        defaultValue: { summary: 'default' },
      },
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
      description:
        'Controls text decoration independently of variant. "always" shows underline, "hover" shows on hover only, "none" removes underline entirely.',
      table: {
        type: { summary: "'always' | 'hover' | 'none'" },
      },
    },
    appearance: {
      control: 'select',
      options: ['light', 'inherit'],
      description: 'Overrides the text colour. Use "light" on dark backgrounds, "inherit" to match parent text colour.',
      table: {
        type: { summary: "'light' | 'inherit'" },
      },
    },
    visited: {
      control: 'select',
      options: ['default', 'none'],
      description:
        'Controls visited link colour. "default" keeps the visited style. "none" resets visited colour to the default text colour.',
      table: {
        type: { summary: "'default' | 'none'" },
        defaultValue: { summary: 'default' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Accessible anchor element for navigating to internal or external URLs. By default it renders a bare `<a>` tag with no visual styles — set `variant="inline"` to apply typography, colour, underline, and focus styles for use inside body text.',
      },
    },
  },
};

export const Default = {
  args: {
    ...linkMeta.args,
    dataTestId: 'link-default',
  },
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('a');
    await check.attributes({ href: args.href });
    await check.children();

    await step('is keyboard focusable', async () => {
      await userEvent.tab();
      expect(canvas.getByTestId(args.dataTestId)).toHaveFocus();
    });
  },
};

export const ExternalLink = {
  args: {
    ...linkMeta.args,
    children: 'Visit GOV.IE',
    href: 'https://www.gov.ie',
    external: true,
    dataTestId: 'link-external',
  },
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('a');
    await check.attributes({
      href: args.href,
      target: '_blank',
      rel: 'noreferrer noopener',
    });
  },
};
