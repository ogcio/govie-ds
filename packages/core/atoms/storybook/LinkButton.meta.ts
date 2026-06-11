import type { Renderer, StoryContext } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import _ from 'lodash';
import { ButtonSize, Variant, Appearance } from '../Button.lite';
import { checker } from './utilities';
import { linkMeta } from './Link.meta';
import { buttonMeta } from './Button.meta';

export const linkButtonMeta = {
  tags: ['autodocs'] as string[],
  title: 'Navigation/LinkButton',
  args: {
    children: 'LinkButton',
    href: 'https://ds.services.gov.ie/',
    variant: Variant.PRIMARY,
    appearance: Appearance.DEFAULT,
    size: ButtonSize.MD,
    dataTestId: 'link-button-test',
    id: 'link-button-example',
  },
  argTypes: {
    ..._.omit(linkMeta.argTypes, ['variant', 'appearance', 'underline', 'visited']),
    ..._.pick(buttonMeta.argTypes, ['variant', 'appearance', 'size']),
    children: {
      control: false,
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'LinkButton renders a native anchor element (`<a>`) styled like a Button. Use it for button-styled navigation links. It keeps the implicit `link` role so browser link behaviours (right-click "Open in new tab", Ctrl/Cmd+click) work correctly. Keyboard activation is Enter only (not Space) — this is native anchor behaviour.\n\nVisual variants, appearances, and sizes are identical to [Button](/docs/components-button--docs).',
      },
    },
  },
};

export const Default = {
  args: linkButtonMeta.args,
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker('link-button-test', canvas, step);

    await check.is('a');
    await check.attributes({ href: 'https://ds.services.gov.ie/' });
    await check.children();

    await step('has implicit link role', async () => {
      const element = canvas.getByRole('link', { name: 'LinkButton' });
      expect(element).toBeInTheDocument();
    });

    await step('has accessible name from children', async () => {
      const element = canvas.getByTestId('link-button-test');
      expect(element).toHaveAccessibleName('LinkButton');
    });

    await step('omits aria-current when not set', async () => {
      const element = canvas.getByTestId('link-button-test');
      expect(element).not.toHaveAttribute('aria-current');
    });
  },
};
