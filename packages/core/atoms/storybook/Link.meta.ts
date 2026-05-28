import type { Renderer, StoryContext } from 'storybook/internal/types';
import { within, expect, userEvent } from 'storybook/test';
import { checker } from './utilities';

export const linkMeta = {
  tags: ['autodocs'] as string[],
  title: 'Next/Navigation/Link',
  args: {
    children: 'Link',
    href: 'https://www.gov.ie',
    external: false,
    id: 'link-example',
    dataTestId: 'link-test',
  },
  argTypes: {
    children: {
      control: 'text',
      description:
        'Visible link text. Should describe the destination or purpose of the link — avoid generic text like "Click here" or "Read more".',
    },
    href: {
      control: 'text',
      description:
        'The URL the link points to. Required — an anchor without href has no implicit link role. Maps to the HTML href attribute.',
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
    inline: {
      control: 'boolean',
      description:
        'Enables styled inline link mode. When true, applies typography, colour, underline, and focus styles. When false, renders a bare anchor.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    underline: {
      control: { disable: true },
      table: { defaultValue: { summary: 'always' } },
    },
    appearance: {
      control: { disable: true },
      table: { defaultValue: { summary: 'default' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Link renders a native anchor element with a minimal, intent-revealing API. Link text should describe the destination or purpose — avoid generic labels. Use the external prop to open links in a new tab safely.',
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

export const PrimitiveAnchor = {
  args: {
    ...linkMeta.args,
    children: 'Unstyled primitive anchor',
    dataTestId: 'link-primitive',
  },
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('a');
    await check.attributes({ href: args.href });

    await step('has no inline link classes', async () => {
      const element = canvas.getByTestId(args.dataTestId);
      expect(element.className).toBe('');
    });
  },
};

export const InlineLink = {
  args: {
    ...linkMeta.args,
    children: 'Styled inline link',
    inline: true,
    dataTestId: 'link-inline',
  },
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('a');

    await step('has inline link styles', async () => {
      const element = canvas.getByTestId(args.dataTestId);
      expect(element.className).not.toBe('');
    });
  },
};

export const InteractionStates = {
  parameters: {
    pseudo: {
      hover: '.pseudo-hover',
      focus: '.pseudo-focus',
    },
  },
};
