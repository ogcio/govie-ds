import type { ArgTypes, Renderer, StoryContext } from 'storybook/internal/types';
import { within, expect, fn, userEvent } from 'storybook/test';
import type { Props } from '../LinkButton.lite';
import { ButtonSize } from '../Button.lite';
import { Variant, Appearance } from '../constants';
import { enumType, checker } from './utilities';

export const linkButtonMeta = {
  tags: ['autodocs'] as string[],
  title: 'Components/LinkButton',
  args: {
    children: 'LinkButton',
    href: 'https://www.gov.ie',
    variant: Variant.PRIMARY,
    appearance: Appearance.DEFAULT,
    size: ButtonSize.MD,
    disabled: false,
    dataTestId: 'link-button-test',
    id: 'link-button-example',
  },
  argTypes: {
    id: {
      control: false,
      description: 'Optional id for linking/targeting and aria references.',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: false,
      description: 'Additional CSS classes to apply to the element.',
      table: { type: { summary: 'string' } },
    },
    href: {
      control: 'text',
      description: 'The URL the link points to. Required — an anchor without href loses its implicit link role.',
      table: { type: { summary: 'string' } },
    },
    variant: enumType(Variant, {
      description: 'Visual style variant of the link button.',
      defaultValue: Variant.PRIMARY,
    }),
    appearance: enumType(Appearance, {
      description: 'Colour appearance of the link button.',
      defaultValue: Appearance.DEFAULT,
    }),
    size: enumType(ButtonSize, { description: 'Size of the link button.', defaultValue: ButtonSize.MD }),
    disabled: {
      control: false,
      description:
        'Disables the link button. Sets aria-disabled="true", prevents navigation, and removes the element from the tab order.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
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
      control: false,
      description: 'Browsing context for the link. Overrides the value set by external.',
      table: { type: { summary: "'_self' | '_blank' | '_parent' | '_top'" } },
    },
    rel: {
      control: false,
      description: 'Link relationship. Overrides the default set by external.',
      table: { type: { summary: 'string' } },
    },
    ariaCurrent: {
      control: false,
      description:
        'Indicates the current item within a navigation set or process. Use "page" for current-page links in nav, "step" for multi-step flows.',
      table: {
        type: { summary: "'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean" },
      },
    },
    ariaLabel: {
      control: false,
      description:
        'Accessible label for the link button. Use when the visible text alone does not fully describe the destination. Maps to aria-label.',
      table: { type: { summary: 'string' } },
    },
    ariaLabelledBy: {
      control: false,
      description: 'Points to element id(s) whose content labels the link button. Maps to aria-labelledby.',
      table: { type: { summary: 'string' } },
    },
    ariaDescribedBy: {
      control: false,
      description: 'Points to element id(s) whose content describes the link button. Maps to aria-describedby.',
      table: { type: { summary: 'string' } },
    },
    tabIndex: {
      control: false,
      description:
        'Controls the tab order. Automatically set to -1 when disabled. Use -1 to remove from the natural tab order in composite widgets.',
      table: { type: { summary: 'number' } },
    },
    lang: {
      control: false,
      description:
        'Language of the link text, when it differs from the surrounding content. Maps to the HTML lang attribute.',
      table: { type: { summary: 'string' } },
    },
    dataTestId: {
      control: false,
      description: 'Test id for targeting the element in automated tests.',
      table: { type: { summary: 'string' } },
    },
    children: {
      control: false,
      table: { disable: true },
    },
  } satisfies ArgTypes<Props>,
  parameters: {
    docs: {
      description: {
        component:
          'LinkButton renders a native anchor element (`<a>`) styled like a Button. Use it for button-styled navigation links. It keeps the implicit `link` role so browser link behaviours (right-click "Open in new tab", Ctrl/Cmd+click) work correctly. Keyboard activation is Enter only (not Space) — this is native anchor behaviour.',
      },
    },
  },
};

export const Default = {
  tags: ['skip-playwright'],
  args: linkButtonMeta.args,
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker('link-button-test', canvas, step);

    await check.is('a');
    await check.attributes({ href: 'https://www.gov.ie' });
    await check.children();

    await step('has implicit link role', async () => {
      const element = canvas.getByRole('link', { name: 'LinkButton' });
      expect(element).toBeInTheDocument();
    });

    await step('has accessible name from children', async () => {
      const element = canvas.getByTestId('link-button-test');
      expect(element).toHaveAccessibleName('LinkButton');
    });

    await step('omits aria-disabled and aria-current when not set', async () => {
      const element = canvas.getByTestId('link-button-test');
      expect(element).not.toHaveAttribute('aria-disabled');
      expect(element).not.toHaveAttribute('aria-current');
    });
  },
};

export const AllVariants = {
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders all link button variants', async () => {
      for (const variant of Object.values(Variant)) {
        const element = canvas.getByTestId(`link-button-variant-${variant}`);
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('A');
      }
    });
  },
};

export const AllAppearances = {
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders all link button appearances', async () => {
      for (const appearance of Object.values(Appearance)) {
        const element = canvas.getByTestId(`link-button-appearance-${appearance}`);
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('A');
      }
    });
  },
};

export const AllSizes = {
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders all link button sizes', async () => {
      for (const size of Object.values(ButtonSize)) {
        const element = canvas.getByTestId(`link-button-size-${size}`);
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('A');
      }
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

export const Disabled = {
  args: {
    onClick: fn(),
  },
  play: async ({ canvasElement, args, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders disabled link buttons with aria-disabled', async () => {
      for (const variant of Object.values(Variant)) {
        for (const appearance of Object.values(Appearance)) {
          const element = canvas.getByTestId(`link-button-disabled-${variant}-${appearance}`);
          expect(element).toBeInTheDocument();
          expect(element.tagName).toBe('A');
          expect(element).toHaveAttribute('aria-disabled', 'true');
        }
      }
    });

    await step('disabled link button is removed from tab order', async () => {
      const element = canvas.getByTestId(`link-button-disabled-${Variant.PRIMARY}-${Appearance.DEFAULT}`);
      expect(element).toHaveAttribute('tabindex', '-1');
    });

    await step('disabled link button has accessible name', async () => {
      const element = canvas.getByTestId(`link-button-disabled-${Variant.PRIMARY}-${Appearance.DEFAULT}`);
      expect(element).toHaveAccessibleName();
    });

    await step('disabled link button has no href attribute', async () => {
      const element = canvas.getByTestId(`link-button-disabled-${Variant.PRIMARY}-${Appearance.DEFAULT}`);
      expect(element).not.toHaveAttribute('href');
    });

    await step('click on disabled link button does not fire onClick', async () => {
      const element = canvas.getByTestId(`link-button-disabled-${Variant.PRIMARY}-${Appearance.DEFAULT}`);
      await userEvent.click(element, { pointerEventsCheck: 0 });
      expect(args.onClick).not.toHaveBeenCalled();
    });
  },
};
